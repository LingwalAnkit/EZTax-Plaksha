import os
from dotenv import load_dotenv
import openai
import streamlit as st
import json
import re
from datetime import datetime

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

if not openai.api_key:
    raise ValueError("OpenAI API key not found. Make sure it's set in your .env file.")

class InsuranceAdvisorAI:
    def __init__(self):
        self.system_prompt = """
You are an expert Indian term insurance advisor. You provide personalized recommendations based on user profiles.

GUIDELINES:
- Always ask for age, monthly income, and dependents first
- Calculate coverage as 10-15x annual income
- Recommend popular Indian insurers: HDFC Life, LIC, ICICI Pru, SBI Life
- Use Indian currency (₹) and format numbers with commas
- Be conversational and helpful
- Provide specific premium estimates
- Ask follow-up questions to understand needs better

CALCULATION RULES:
- Coverage: 10-15x annual income
- Premium rates (per lakh coverage/year):
  - Age 20-25: ₹450
  - Age 26-30: ₹520
  - Age 31-35: ₹650
  - Age 36-40: ₹850
  - Age 40+: ₹1200

Always format responses with emojis and clear structure.
"""

    def get_ai_response(self, user_message, conversation_history):
        try:
            messages = [{"role": "system", "content": self.system_prompt}]
            messages.extend(conversation_history)
            messages.append({"role": "user", "content": user_message})

            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            return response.choices[0].message.content

        except Exception as e:
            return f"I'm having technical difficulties. Please try again. Error: {str(e)}"

# Streamlit UI
def main():
    st.set_page_config(page_title="AI Insurance Advisor", page_icon="🛡️", layout="wide")

    # CSS Styling
    st.markdown("""
    <style>
    .main-header {
        text-align: center;
        color: #2E86AB;
        font-size: 2.5em;
        margin-bottom: 0.5em;
    }
    .chat-container {
        max-height: 500px;
        overflow-y: auto;
        padding: 1em;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        background-color: #f9f9f9;
    }
    .user-message {
        background-color: #DCF8C6;
        padding: 10px;
        border-radius: 10px;
        margin: 5px 0;
        text-align: right;
    }
    .bot-message {
        background-color: #F1F0F0;
        padding: 10px;
        border-radius: 10px;
        margin: 5px 0;
    }
    </style>
    """, unsafe_allow_html=True)

    if 'conversation_history' not in st.session_state:
        st.session_state.conversation_history = []
    if 'advisor_ai' not in st.session_state:
        st.session_state.advisor_ai = InsuranceAdvisorAI()

    st.markdown('<h1 class="main-header">🛡️ AI Insurance Advisor</h1>', unsafe_allow_html=True)
    st.markdown('<p style="text-align: center; color: #666;">Get personalized term insurance recommendations powered by AI</p>', unsafe_allow_html=True)

    with st.sidebar:
        st.header("🚀 Features")
        st.write("✅ Instant premium calculation")
        st.write("✅ Personalized coverage recommendations")
        st.write("✅ Top insurer comparisons")
        st.write("✅ AI-powered advice")
        st.header("📊 Quick Stats")
        if st.session_state.conversation_history:
            st.write(f"Messages: {len(st.session_state.conversation_history)}")
        if st.button("🔄 Reset Chat"):
            st.session_state.conversation_history = []
            st.rerun()

    col1, col2 = st.columns([3, 1])
    with col1:
        chat_container = st.container()
        with chat_container:
            st.markdown('<div class="chat-container">', unsafe_allow_html=True)

            if not st.session_state.conversation_history:
                st.markdown("""
                <div class="bot-message">
                    <strong>🤖 AI Advisor:</strong><br>
                    Hello! I'm your personal AI insurance advisor. Let me understand your profile first to recommend the best term insurance for you.<br><br>
                    Could you please share:
                    <ul>
                        <li>Your age</li>
                        <li>Monthly income</li>
                        <li>Number of dependents</li>
                    </ul>
                    For example: "I'm 28, earning ₹60,000/month, have 2 dependents"
                </div>
                """, unsafe_allow_html=True)

            for msg in st.session_state.conversation_history:
                if msg["role"] == "user":
                    st.markdown(f'<div class="user-message"><strong>You:</strong> {msg["content"]}</div>', unsafe_allow_html=True)
                else:
                    st.markdown(f'<div class="bot-message"><strong>🤖 AI Advisor:</strong><br>{msg["content"]}</div>', unsafe_allow_html=True)

            st.markdown('</div>', unsafe_allow_html=True)

        user_input = st.text_input("Type your message here...", key="user_input")
        col_send, col_example = st.columns([1, 2])

        with col_send:
            send_button = st.button("Send 📤", use_container_width=True)
        with col_example:
            example_button = st.button("Try Example: 28 years, ₹60K income, 2 dependents", use_container_width=True)

        if example_button:
            user_input = "I'm 28 years old, earning ₹60,000 per month, and have 2 dependents"
            send_button = True

        if send_button and user_input:
            st.session_state.conversation_history.append({"role": "user", "content": user_input})
            with st.spinner("AI is thinking..."):
                ai_response = st.session_state.advisor_ai.get_ai_response(
                    user_input,
                    st.session_state.conversation_history[:-1]
                )
            st.session_state.conversation_history.append({"role": "assistant", "content": ai_response})
            st.rerun()

    with col2:
        st.header("🎯 Quick Actions")

        if st.button("💰 Calculate Premium", use_container_width=True):
            st.session_state.conversation_history.append({
                "role": "user",
                "content": "Can you help me calculate premium for ₹1 crore coverage?"
            })
            ai_response = st.session_state.advisor_ai.get_ai_response(
                "Can you help me calculate premium for ₹1 crore coverage?",
                st.session_state.conversation_history[:-1]
            )
            st.session_state.conversation_history.append({"role": "assistant", "content": ai_response})
            st.rerun()

        if st.button("🏆 Compare Policies", use_container_width=True):
            st.session_state.conversation_history.append({
                "role": "user",
                "content": "Show me comparison of top 3 term insurance policies"
            })
            ai_response = st.session_state.advisor_ai.get_ai_response(
                "Show me comparison of top 3 term insurance policies",
                st.session_state.conversation_history[:-1]
            )
            st.session_state.conversation_history.append({"role": "assistant", "content": ai_response})
            st.rerun()

        if st.button("📋 Required Documents", use_container_width=True):
            st.session_state.conversation_history.append({
                "role": "user",
                "content": "What documents do I need for term insurance application?"
            })
            ai_response = st.session_state.advisor_ai.get_ai_response(
                "What documents do I need for term insurance application?",
                st.session_state.conversation_history[:-1]
            )
            st.session_state.conversation_history.append({"role": "assistant", "content": ai_response})
            st.rerun()

        st.header("🧮 Quick Calculator")
        calc_age = st.number_input("Age", min_value=18, max_value=65, value=30)
        calc_income = st.number_input("Monthly Income (₹)", min_value=10000, value=50000, step=5000)

        if st.button("Calculate Coverage", use_container_width=True):
            annual_income = calc_income * 12
            coverage = annual_income * 12

            if calc_age <= 25:
                rate = 450
            elif calc_age <= 30:
                rate = 520
            elif calc_age <= 35:
                rate = 650
            elif calc_age <= 40:
                rate = 850
            else:
                rate = 1200

            premium = (coverage / 100000) * rate

            st.success(f"""
            **Recommended Coverage:** ₹{coverage:,}
            **Estimated Premium:** ₹{premium:,.0f}/year
            """)

if __name__ == "__main__":
    main()
