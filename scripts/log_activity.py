#!/usr/bin/env python3
import json, datetime, os, sys, fcntl
from pathlib import Path

path = Path(os.path.join(os.path.dirname(__file__), '..', 'data', 'activity-log.json')).resolve()
path.parent.mkdir(parents=True, exist_ok=True)
if not path.exists():
    path.write_text("[]")

if len(sys.argv) < 5:
    print(f"Usage: {sys.argv[0]} TASK_ID STATUS AGENT_ID OUTPUT")
    sys.exit(1)

task, status, agent, output = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
with path.open("r+") as f:
    fcntl.flock(f, fcntl.LOCK_EX)
    try:
        log = json.load(f)
    except json.JSONDecodeError:
        log = []
    log.append({
        "task": task, "status": status, "agent": agent,
        "timestamp": datetime.datetime.now().isoformat(),
        "output": output
    })
    f.seek(0)
    f.truncate()
    json.dump(log, f, indent=2)
    fcntl.flock(f, fcntl.LOCK_UN)

print(f"Logged: {task} ({status}) by {agent}")
