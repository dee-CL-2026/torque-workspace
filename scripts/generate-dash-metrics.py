import json
import re
from datetime import datetime

def parse_markdown_table(content):
    lines = content.strip().split('\n')
    if not lines or len(lines) < 2:
        return []

    header_line_index = -1
    for i, line in enumerate(lines):
        if line.strip().startswith('| ID |'):
            header_line_index = i
            break
    
    if header_line_index == -1: return []

    data_start_index = header_line_index + 2 # Skip header and separator

    headers = [h.strip().lower().replace(' ', '_') for h in lines[header_line_index].split('|') if h.strip()]
    
    # Manually map headers for consistency
    header_map = {
        "id": "id", "task": "title", "project": "project", "assigned": "assigned",
        "status": "status", "added": "added", "notes": "notes"
    }
    final_headers = [header_map.get(h, h) for h in headers]

    rows = []
    for line in lines[data_start_index:]:
        line = line.strip()
        if not line or line.startswith('#') or line.startswith('---'):
            continue
        
        values = [v.strip() for v in line.split('|') if v.strip()]
        if len(values) == len(final_headers):
            row_dict = dict(zip(final_headers, values))
            rows.append(row_dict)
    return rows

def parse_done_tasks(content):
    lines = content.strip().split('\n')
    done_tasks = []
    for line in lines:
        line = line.strip()
        if not line or line.startswith('#') or line.startswith('---'):
            continue
        
        # Try parsing the bracketed format first
        match = re.match(r'^(T\\d+) (.+?) \\[\s*assignee:(.+?)\\s*\\] \\[\s*project:(.+?)\\s*\\] \\[\s*status:(.+?)\\s*\\] \\[\s*completed:(.+?)\\s*\\]', line)
        if match:
            task_id, title, assignee, project, status, completed_date = match.groups()
            done_tasks.append({
                "id": task_id.strip(),
                "title": title.strip(),
                "project": project.strip(),
                "assigned": assignee.strip(),
                "status": status.strip(),
                "completed": completed_date.strip()
            })
        else:
            # Fallback to pipe-separated format (new style added manually)
            values = [v.strip() for v in line.split('|') if v.strip()]
            if len(values) >= 6: # ID, Task, Project, Assigned, Status, Added/Completed
                done_tasks.append({
                    "id": values[0],
                    "title": values[1],
                    "project": values[2],
                    "assigned": values[3],
                    "status": values[4],
                    "completed": values[5] # Assuming 6th value is completed date
                })
    return done_tasks

def generate_dash_metrics():
    # Read files
    try:
        with open('tasks.md', 'r') as f:
            tasks_content = f.read()
    except FileNotFoundError:
        tasks_content = ""

    try:
        with open('tasks-done.md', 'r') as f:
            tasks_done_content = f.read()
    except FileNotFoundError:
        tasks_done_content = ""

    try:
        with open('backlog.md', 'r') as f:
            backlog_content = f.read()
    except FileNotFoundError:
        backlog_content = ""

    # Parse tasks
    active_tasks = parse_markdown_table(tasks_content)
    done_tasks = parse_done_tasks(tasks_done_content) # Use dedicated parser for done tasks
    backlog_items = parse_markdown_table(backlog_content) # backlog.md should be markdown table

    # Calculate summary
    summary = {
        "pending": 0,
        "in-progress": 0,
        "blocked": 0,
        "done": 0,
        "backlog": len(backlog_items)
    }

    assignee_counts = {}
    all_tasks = []

    for task in active_tasks:
        status = task.get("status", "pending").lower()
        if status == "pending":
            summary["pending"] += 1
        elif status == "in-progress":
            summary["in-progress"] += 1
        elif status == "blocked":
            summary["blocked"] += 1
        
        assignee = task.get("assigned", "unassigned")
        assignee_counts[assignee] = assignee_counts.get(assignee, 0) + 1
        all_tasks.append(task)

    for task in done_tasks:
        summary["done"] += 1
        assignee = task.get("assigned", "unassigned")
        assignee_counts[assignee] = assignee_counts.get(assignee, 0) + 1
        all_tasks.append(task)

    # Final structure
    dashboard_data = {
        "summary": summary,
        "lastUpdated": datetime.now().isoformat(),
        "tasks": all_tasks, # This will be the combined list of active and done tasks
        "assignee_counts": assignee_counts,
        "backlog_items": backlog_items
    }

    # Write to JSON file
    with open('data/dash-metrics.json', 'w') as f:
        json.dump(dashboard_data, f, indent=2)

if __name__ == "__main__":
    generate_dash_metrics()
