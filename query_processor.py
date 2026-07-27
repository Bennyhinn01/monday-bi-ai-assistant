from utils import parse_monday_data
from analytics import generate_kpis


def process_query(question, raw_data):
    """
    Process simple BI questions without using Gemini.
    Returns:
        dict -> {
            "handled": True/False,
            "answer": "...",
            "context": "..."
        }
    """

    items = parse_monday_data(raw_data)
    q = question.lower()

    # -----------------------------
    # Total Work Orders
    # -----------------------------
    if "how many work order" in q or "count work order" in q:

        count = sum(
            1
            for item in items
            if (item.get("Board") or "").lower() == "work orders"
        )

        return {
            "handled": True,
            "answer": f"There are {count} work orders.",
            "context": ""
        }

    # -----------------------------
    # Total Deals
    # -----------------------------
    if "how many deal" in q or "count deal" in q:

        count = sum(
            1
            for item in items
            if (item.get("Board") or "").lower() == "deals"
        )

        return {
            "handled": True,
            "answer": f"There are {count} deals.",
            "context": ""
        }

    # -----------------------------
    # High Priority Projects
    # -----------------------------
    if "high priority" in q:

        results = []

        for item in items:

            priority = (item.get("Priority") or "").lower()

            if priority == "high":
                results.append(item)

        if not results:
            return {
                "handled": True,
                "answer": "No high priority projects found.",
                "context": ""
            }

        context = ""

        for r in results:
            context += f"""
Project : {r.get("Item Name")}
Board : {r.get("Board")}
Status : {r.get("Status")}
Owner : {r.get("Owner")}
Priority : {r.get("Priority")}

"""

        return {
            "handled": False,
            "answer": "",
            "context": context
        }

    # -----------------------------
    # Completed Projects
    # -----------------------------
    if "completed" in q:

        completed = []

        for item in items:

            status = (item.get("Status") or "").lower()

            if "done" in status or "complete" in status:
                completed.append(item)

        return {
            "handled": True,
            "answer": f"There are {len(completed)} completed projects.",
            "context": ""
        }

    # -----------------------------
    # Ongoing Projects
    # -----------------------------
    if "ongoing" in q or "working" in q or "in progress" in q:

        ongoing = []

        for item in items:

            status = (item.get("Status") or "").lower()

            if any(word in status for word in [
                "working",
                "progress",
                "ongoing",
                "open",
                "not started",
                "pending",
                "partial",
                "on hold",
            ]):
                ongoing.append(item)

        return {
            "handled": True,
            "answer": f"There are {len(ongoing)} ongoing projects.",
            "context": ""
        }

    # -----------------------------
    # Business Summary
    # -----------------------------
    if (
        "summary" in q
        or "dashboard" in q
        or "business" in q
        or "health" in q
    ):

        kpis = generate_kpis(raw_data)

        context = f"""
Business KPIs

Total Work Orders : {kpis['Total Work Orders']}
Total Deals : {kpis['Total Deals']}
Completed : {kpis['Completed']}
Ongoing : {kpis['Ongoing']}
Completion Rate : {kpis['Completion Rate']}%

High Priority : {kpis['High Priority']}

Status Summary

{kpis['Status Summary']}

Priority Summary

{kpis['Priority Summary']}

Owner Summary

{kpis['Owner Summary']}
"""

        return {
            "handled": False,
            "answer": "",
            "context": context
        }

    # -----------------------------
    # Search by Project Name
    # -----------------------------
    for item in items:

        project_name = (item.get("Item Name") or "").lower()

        if project_name and project_name in q:
            return {
                "handled": False,
                "answer": "",
                "context": str(item)
            }

    # -----------------------------
    # Default (Complex Question)
    # -----------------------------
    sample = "\n".join(str(item) for item in items[:10])

    context = f"""
Total Records : {len(items)}

Sample Records

{sample}
"""

    return {
        "handled": False,
        "answer": "",
        "context": context
    }