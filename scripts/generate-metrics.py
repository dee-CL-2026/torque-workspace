#!/usr/bin/env python3
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path("/home/dieterwerwath/torque-workspace")
TASKS_FILE = ROOT / "tasks.md"
DONE_FILE = ROOT / "tasks-done.md"
BACKLOG_FILE = ROOT / "backlog.md"
OUTPUT_FILE = ROOT / "data" / "dash-metrics.json"


def parse_table_rows(path, prefix, expected_cols):
    rows = []
    if not path.exists():
        return rows
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.startswith(prefix):
            continue
        parts = [p.strip() for p in line.strip().split("|")]
        parts = [p for p in parts if p != ""]
        if len(parts) < expected_cols:
            continue
        rows.append(parts[:expected_cols])
    return rows


def normalize_status(value):
    status = (value or "").strip().lower()
    if status == "in progress":
        return "in-progress"
    return status


def build_metrics():
    task_rows = parse_table_rows(TASKS_FILE, "| T", 7)
    done_rows = parse_table_rows(DONE_FILE, "| D", 6)

    tasks = []
    for row in task_rows:
        task = {
            "id": row[0],
            "title": row[1],
            "project": row[2],
            "assigned": row[3],
            "status": normalize_status(row[4]),
            "added": row[5],
            "notes": row[6],
        }
        tasks.append(task)

    tasks_done = []
    for row in done_rows:
        task = {
            "id": row[0],
            "title": row[1],
            "project": row[2],
            "assigned": row[3],
            "completed": row[4],
            "notes": row[5],
        }
        tasks_done.append(task)

    backlog_count = 0
    if BACKLOG_FILE.exists():
        for line in BACKLOG_FILE.read_text(encoding="utf-8").splitlines():
            if line.startswith("- "):
                backlog_count += 1

    status_counts = {"pending": 0, "in-progress": 0, "blocked": 0, "done": 0, "backlog": backlog_count}
    for task in tasks:
        status = normalize_status(task.get("status"))
        if status in status_counts:
            status_counts[status] += 1

    summary = {
        "pending": status_counts["pending"],
        "in-progress": status_counts["in-progress"],
        "blocked": status_counts["blocked"],
        "done": len(tasks_done),
        "backlog": backlog_count,
    }

    by_assignee = {}
    for task in tasks:
        status = normalize_status(task.get("status"))
        if status not in ("pending", "in-progress", "blocked"):
            continue
        assignee = (task.get("assigned") or "Unassigned").strip() or "Unassigned"
        if assignee not in by_assignee:
            by_assignee[assignee] = {"pending": 0, "in-progress": 0, "blocked": 0, "total": 0}
        by_assignee[assignee][status] += 1
        by_assignee[assignee]["total"] += 1

    by_status = {
        "pending": summary["pending"],
        "in-progress": summary["in-progress"],
        "blocked": summary["blocked"],
        "done": summary["done"],
        "backlog": summary["backlog"],
    }

    metrics = {
        "summary": summary,
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "tasks": tasks,
        "tasksDone": tasks_done,
        "byAssignee": by_assignee,
        "byStatus": by_status,
        "backlog": backlog_count,
    }
    return metrics


def main():
    metrics = build_metrics()
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(metrics, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
