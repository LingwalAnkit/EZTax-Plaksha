import sys
import cv2
import numpy as np
import easyocr
import google.generativeai as genai
import json
import time
from PIL import Image
import os

# Lazy-init EasyOCR reader (forcing CPU to prevent GPU errors)
reader = None

def get_reader():
    global reader
    if reader is None:
        reader = easyocr.Reader(['en'], gpu=False)
    return reader

def image_with_bb(image_to_edit, results):
    """Draw bounding boxes around detected text."""
    for detection in results:
        # detection[0] is a list of 4 points [(x1,y1),(x2,y2),(x3,y3),(x4,y4)]
        pts = detection[0]
        xs = [int(p[0]) for p in pts]
        ys = [int(p[1]) for p in pts]
        top_left = (min(xs), min(ys))
        bottom_right = (max(xs), max(ys))
        cv2.rectangle(image_to_edit, top_left, bottom_right, (0, 255, 0), 2)
    return image_to_edit

def process_image(image_data):
    """Process image, apply OCR, and return extracted text & annotated image."""
    try:
        np_arr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # If image decode failed
        if image is None:
            raise ValueError("Image data could not be decoded")

        # Resize to improve OCR accuracy (upscale small images, downscale huge ones)
        h, w = image.shape[:2]
        scale = 1.0
        if max(w, h) < 1000:
            scale = 2.0
        elif max(w, h) > 2500:
            scale = 0.8
        if scale != 1.0:
            image = cv2.resize(image, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_CUBIC)

        # Convert image to grayscale
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Improve contrast with CLAHE
        try:
            clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
            gray = clahe.apply(gray_image)
        except Exception:
            gray = gray_image

        # Denoise while keeping edges
        denoised = cv2.bilateralFilter(gray, 9, 75, 75)

        # Slight blur then Otsu threshold (works well for many scanned docs)
        blur = cv2.GaussianBlur(denoised, (5, 5), 0)
        _, thresh_image = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Morphological opening to remove small noise
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
        thresh_image = cv2.morphologyEx(thresh_image, cv2.MORPH_OPEN, kernel, iterations=1)

        # Run OCR with improved parameters
        rdr = get_reader()
        # detail=1 to get bounding boxes, paragraph=True to join lines into paragraphs
        result = rdr.readtext(thresh_image, detail=1, paragraph=True)

        # Build extracted text
        extracted_text = " ".join([detection[1] for detection in result]) if result else ""

        # Draw bounding boxes on original (resized) image
        annotated_image = image.copy()
        annotated_image = image_with_bb(annotated_image, result)

        # Optionally save debug image when env var set
        try:
            if os.environ.get("DEBUG_SALARY") == "1":
                debug_path = os.path.join(os.getcwd(), "salary_debug_annotated.png")
                cv2.imwrite(debug_path, annotated_image)
                print(f"Saved debug annotated image to {debug_path}")
        except Exception:
            pass

        return extracted_text, annotated_image

    except Exception as e:
        return "", f"❌ Error processing image: {str(e)}"

def load_image(image):
    """Convert OpenCV BGR image to PIL format."""
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return Image.fromarray(image_rgb)

def generate_salary_prompt(ocr_text):
    """Generate structured prompt for salary extraction."""
    return f"""
    You are a salary document parser. You are given:
    OCR Extracted Text -> {ocr_text}
    Use it to extract the following fields:
    - Salary Income
    - Date (ISO format)
    - Concerned Organization
    - Document Number
    - Payment Method (Bank Transfer, Cash, Cheque, UPI, etc.)
    - HRA Exemption
    - ITA Exemption
    - TDS Deducted
    Return as JSON.
    """

def generate_response_with_retry(model, prompt, image, max_retries=3, delay=5):
    """Retry API call if it fails due to timeout or errors."""
    for attempt in range(max_retries):
        try:
            response = model.generate_content([prompt, image])
            return response.text
        except Exception as e:
            print(f"⚠️ Gemini API error: {e} (Retry {attempt + 1}/{max_retries})")
            time.sleep(delay)

    return json.dumps({"error": "Gemini API failed after retries"})

def master_function():
    """Main function to run OCR and salary extraction."""
    try:
        # Read image from CLI arg if provided, otherwise read from stdin
        if len(sys.argv) > 1 and sys.argv[1].strip():
            image_path = sys.argv[1]
            with open(image_path, "rb") as f:
                image_data = f.read()
        else:
            # used when piping from API or other binary input
            image_data = sys.stdin.buffer.read()
        extracted_text, annotated_image = process_image(image_data)

        if not extracted_text:
            return json.dumps({"error": "No text extracted from image."})

        # Generate prompt for AI model
        prompt = generate_salary_prompt(extracted_text)
        image_final = load_image(annotated_image)

        # Configure Google Gemini API
        genai.configure(api_key="")  # 🔴 REPLACE WITH YOUR ACTUAL API KEY
        model = genai.GenerativeModel("gemini-2.5-flash")

        # Generate structured JSON response using AI
        response = generate_response_with_retry(model, prompt, image_final)

        return response

    except Exception as e:
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    print(master_function())
