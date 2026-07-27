from fastapi import FastAPI
from pydantic import BaseModel

from cache import get_cached_data
from query_processor import process_query
from agent import ask_gemini
from fastapi.middleware.cors import CORSMiddleware
from analytics import generate_kpis
from cache import get_cached_data


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/dashboard")
def dashboard():

    data = get_cached_data()
    
    kpis = generate_kpis(data)

    return {
        "work_orders": kpis["Total Work Orders"],
        "deals": kpis["Total Deals"],
        "completed": kpis["Completed"],
        "completion_rate": kpis["Completion Rate"],
    }


class Query(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "🚀 Monday BI AI Agent Running!"
    }


@app.post("/ask")
def ask(query: Query):

    # Get cached Monday data
    raw_data = get_cached_data()

    # Let Python analyze the question first
    result = process_query(query.question, raw_data)

    # If Python already knows the answer
    if result["handled"]:
        return {
            "source": "Python",
            "answer": result["answer"]
        }

    # Otherwise ask Gemini using only filtered context
    answer = ask_gemini(
        query.question,
        result["context"]
    )

    return {
        "source": "Gemini",
        "answer": answer
    }