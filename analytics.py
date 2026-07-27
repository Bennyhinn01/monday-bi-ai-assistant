from utils import parse_monday_data


def generate_kpis(raw_data):
    """
    Generate business KPIs from Monday.com data.
    """

    items = parse_monday_data(raw_data)

    total_work_orders = 0
    total_deals = 0

    completed = 0
    ongoing = 0
    high_priority = 0

    status_summary = {}
    owner_summary = {}
    priority_summary = {}

    for item in items:

        board = (item.get("Board") or "").lower()

        if board == "work orders":
            total_work_orders += 1

        elif board == "deals":
            total_deals += 1

        # -----------------------------
        # Safe Status
        # -----------------------------
        status = (item.get("Status") or "").strip()

        if status:

            status_summary[status] = status_summary.get(status, 0) + 1

            s = status.lower()

            if "done" in s or "complete" in s:
                completed += 1

            elif "working" in s or "progress" in s:
                ongoing += 1

        # -----------------------------
        # Safe Priority
        # -----------------------------
        priority = (item.get("Priority") or "").strip()

        if priority:

            priority_summary[priority] = priority_summary.get(priority, 0) + 1

            if priority.lower() == "high":
                high_priority += 1

        # -----------------------------
        # Safe Owner
        # -----------------------------
        owner = (item.get("Owner") or "").strip()

        if owner:
            owner_summary[owner] = owner_summary.get(owner, 0) + 1

    completion_rate = 0

    if total_work_orders > 0:
        completion_rate = round(
            (completed / total_work_orders) * 100,
            2
        )

    return {
        "Total Work Orders": total_work_orders,
        "Total Deals": total_deals,
        "Completed": completed,
        "Ongoing": ongoing,
        "High Priority": high_priority,
        "Completion Rate": completion_rate,
        "Status Summary": status_summary,
        "Priority Summary": priority_summary,
        "Owner Summary": owner_summary
    }