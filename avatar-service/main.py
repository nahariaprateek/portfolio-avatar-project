from __future__ import annotations

import os
import uuid
from pathlib import Path
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

AVATAR_HOST = os.environ.get("AVATAR_HOST", "http://127.0.0.1:8001")
AVATAR_PARENT_ORIGIN = os.environ.get("AVATAR_PARENT_ORIGIN", "http://127.0.0.1:3000")
AVATAR_NAME = os.environ.get("AVATAR_NAME", "Prateek Naharia")
AVATAR_ROLE = os.environ.get("AVATAR_ROLE", "AI portfolio copilot")

PORTFOLIO_FACTS = [
    "Prateek Naharia is a data science and analytics professional focused on decision systems, data products, dashboards, and ML applications.",
    "He is a Senior Consultant at EXL, following experience as a Data Scientist at OpiAID and a Software Engineer at LTIMindtree.",
    "His graduate degree is a Master's in Business Analytics from Boston University.",
    "He also studied Computer and Information Technology at SRM University and completed an internship at IIT Kharagpur.",
    "His skills include SQL, dbt, Airflow, ETL pipelines, data modeling, Power BI, Tableau, Python, machine learning, GCP, AWS, BigQuery, and Snowflake.",
    "The portfolio is being upgraded with a GenAI avatar that can walk recruiters through projects, experience, skills, and contact details.",
]

PROJECT_FACTS = [
    "One project area is healthcare analytics, including SDOH-driven risk stratification, intervention planning, and campaign design.",
    "Another focus area is building business-facing dashboards and cloud-backed analytics products.",
    "The portfolio emphasizes analytics engineering, BI systems, machine learning, and data product delivery.",
]


class ChatRequest(BaseModel):
    message: str
    history: List[dict] | None = None


class ChatResponse(BaseModel):
    answer: str
    suggestions: List[str]


def build_answer(message: str) -> ChatResponse:
    text = (message or "").strip().lower()

    if not text:
        return ChatResponse(
            answer=(
                f"I am {AVATAR_NAME}'s {AVATAR_ROLE}. Ask me about experience, skills, projects, "
                "or how this portfolio avatar is being built."
            ),
            suggestions=["Tell me about Prateek", "What projects are featured?", "What skills does he bring?"],
        )

    if any(token in text for token in ["experience", "work", "career", "exl", "opiaid", "ltimindtree"]):
        return ChatResponse(
            answer=(
                f"{AVATAR_NAME} has experience across consulting, data science, and software engineering. "
                "The current portfolio highlights his role as Senior Consultant at EXL, prior work as "
                "a Data Scientist at OpiAID, and earlier engineering experience at LTIMindtree."
            ),
            suggestions=["What did he do at EXL?", "What is his analytics background?", "Summarize his profile"],
        )

    if any(token in text for token in ["project", "portfolio", "dashboard", "healthcare", "sdoh"]):
        return ChatResponse(
            answer=(
                "The portfolio is geared toward decision systems, cloud data products, dashboards, and ML work. "
                "A strong example is the healthcare analytics work around SDOH-based risk, intervention planning, "
                "and cohort generation for outreach."
            ),
            suggestions=["Tell me about healthcare analytics", "What kind of dashboards has he built?", "How is GenAI used here?"],
        )

    if any(token in text for token in ["skill", "stack", "python", "sql", "cloud", "bi", "ml"]):
        return ChatResponse(
            answer=(
                "Core strengths include SQL, Python, ETL, dbt, Airflow, BI tooling, machine learning, and cloud platforms "
                "such as GCP, AWS, BigQuery, and Snowflake. The profile sits at the intersection of analytics engineering "
                "and business-facing decision support."
            ),
            suggestions=["What BI tools does he use?", "What cloud platforms does he know?", "How strong is his ML background?"],
        )

    if any(token in text for token in ["avatar", "copilot", "genai", "ai"]):
        return ChatResponse(
            answer=(
                "This avatar project uses a split architecture: the portfolio site remains a static GitHub Pages deployment, "
                "while the avatar service runs separately and injects a floating widget into the site. The current local build "
                "is a mock-first environment so the UX and integration can be tested before adding realtime voice and video."
            ),
            suggestions=["How does the architecture work?", "What is mocked today?", "What comes next for realtime?"],
        )

    if any(token in text for token in ["contact", "email", "linkedin", "github", "resume"]):
        return ChatResponse(
            answer=(
                "You can contact Prateek at nahariap@bu.edu, find him on LinkedIn at linkedin.com/in/prateeknaharia, "
                "and review code on github.com/nahariaprateek. The portfolio also links directly to his resume."
            ),
            suggestions=["Open the resume", "Summarize his profile", "What should a recruiter ask next?"],
        )

    return ChatResponse(
        answer=" ".join(PORTFOLIO_FACTS[:3]) + " " + PROJECT_FACTS[0],
        suggestions=["Tell me about experience", "Tell me about skills", "How is the avatar built?"],
    )


app = FastAPI(title="Prateek Portfolio Avatar API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[AVATAR_PARENT_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/loader", StaticFiles(directory=STATIC_DIR / "loader"), name="loader")
app.mount("/assets", StaticFiles(directory=STATIC_DIR / "assets"), name="assets")


@app.get("/")
def root() -> FileResponse:
    return FileResponse(STATIC_DIR / "widget.html")


@app.get("/widget.html")
def widget_html() -> FileResponse:
    return FileResponse(STATIC_DIR / "widget.html")


@app.get("/widget.js")
def widget_js() -> FileResponse:
    return FileResponse(STATIC_DIR / "widget.js", media_type="text/javascript")


@app.get("/widget.css")
def widget_css() -> FileResponse:
    return FileResponse(STATIC_DIR / "widget.css", media_type="text/css")


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "agent_ready": True, "mode": "mock", "host": AVATAR_HOST}


@app.post("/api/wake")
def wake_agent() -> dict:
    return {"ready": True, "mode": "mock"}


@app.post("/api/token")
def token() -> dict:
    session_id = f"session-{uuid.uuid4().hex[:8]}"
    return {
        "token": f"mock-{uuid.uuid4().hex}",
        "url": AVATAR_HOST,
        "room_name": "local-avatar-room",
        "session_id": session_id,
        "mode": "mock",
    }


@app.get("/api/keepalive")
def keepalive() -> dict:
    return {"ok": True}


@app.get("/api/config")
def config() -> dict:
    return {
        "avatar_name": AVATAR_NAME,
        "avatar_role": AVATAR_ROLE,
        "parent_origin": AVATAR_PARENT_ORIGIN,
        "mode": "mock",
    }


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    return build_answer(payload.message)
