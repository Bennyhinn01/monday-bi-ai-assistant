import os
from pathlib import Path

from dotenv import load_dotenv
import google.generativeai as genai

# Load .env
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_gemini(question, context):
    """
    Gemini receives ONLY filtered context instead of the full Monday dataset.
    """

    prompt = f"""
You are an expert Business Intelligence Analyst.

You are helping a company analyze Monday.com CRM and Work Order data.

Rules:
- Answer ONLY using the provided context.
- Never make up data.
- If context is insufficient, clearly say so.
- Use professional language.
- Use markdown.
- Give useful business insights.
- If appropriate, suggest actions management should take.

Context:

{context}

User Question:

{question}
"""

    response = model.generate_content(prompt)

    return response.text