import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Load API key from environment
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    # Insurance calculation parameters
    COVERAGE_MULTIPLIER = {
        'min': 10,
        'max': 15,
        'recommended': 12
    }

    # Premium rates per lakh per year
    PREMIUM_RATES = {
        '18-25': 450,
        '26-30': 520,
        '31-35': 650,
        '36-40': 850,
        '41-50': 1200,
        '51+': 1800
    }

    # Top insurers in India
    TOP_INSURERS = [
        'HDFC Life Click 2 Protect Plus',
        'LIC Tech Term',
        'ICICI Prudential iProtect Smart',
        'SBI Life eShield',
        'Max Life Smart Term Plus'
    ]
