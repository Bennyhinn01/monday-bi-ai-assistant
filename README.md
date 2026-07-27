# Monday BI AI Assistant

An AI-powered Business Intelligence Assistant for Monday.com that enables managers and teams to analyze work orders, deals, project status, and KPIs using natural language.

## Features

- AI Chat Assistant powered by Google Gemini
- Monday.com API Integration
- Business KPI Dashboard
- Executive Insights
- Real-time Work Order Analytics
- Deal Tracking
- Completion Rate Analysis
- FastAPI Backend
- React + Vite Frontend

## Tech Stack

### Frontend
- React
- Vite
- Axios
- Lucide React

### Backend
- FastAPI
- Python
- Google Gemini API
- Monday.com API

## Architecture

```
React Frontend
      │
      ▼
 FastAPI Backend
      │
 ├── Monday API
 ├── KPI Generator
 ├── Query Processor
 └── Gemini AI
```

## Example Questions

- How many work orders are there?
- Show ongoing projects.
- Which deals are completed?
- Give an executive summary.
- What is the completion rate?

## Installation

### Backend

```bash
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Future Improvements

- Authentication
- Charts & Visualizations
- Docker Support
- Role-Based Access
- Export Reports (PDF/Excel)

## Author

Praveen Kumar J
