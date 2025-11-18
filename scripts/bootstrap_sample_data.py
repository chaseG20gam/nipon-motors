#!/usr/bin/env python3
"""
 - at least once per change to load_sample_data.py, rebuild the backend image so the command is available: docker compose build backend
 - make sure the Postgres container is running (from docker compose up)
 - run the management command in a one-off backend container: docker compose run --rm backend python manage.py load_sample_data --force
 - when it prints “sample data loaded successfully.” the database is ready; just refresh the frontend (or call /api/cars/)—no container restart needed
"""

from __future__ import annotations

import subprocess
import sys
import time
from typing import Iterable, List


def _find_compose_command() -> List[str]:
    """Return the docker compose command available on the host."""
    candidates: Iterable[List[str]] = (
        ["docker", "compose"],
        ["docker-compose"],
    )

    for candidate in candidates:
        try:
            subprocess.run(
                candidate + ["version"],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
        except (FileNotFoundError, subprocess.CalledProcessError):
            continue
        return candidate

    print(
        "Docker Compose is not available. Please install Docker Desktop "
        "or the Compose plugin and try again.",
        file=sys.stderr,
    )
    sys.exit(1)


def _run_compose(compose_cmd: List[str], args: Iterable[str]) -> int:
    cmd = compose_cmd + list(args)
    print(f"$ {' '.join(cmd)}")
    result = subprocess.run(cmd)
    if result.returncode != 0:
        sys.exit(result.returncode)
    return result.returncode


def _compose_exec(
    compose_cmd: List[str],
    service: str,
    command: Iterable[str],
    *,
    retries: int = 6,
    delay: int = 5,
) -> None:
    base = compose_cmd + ["exec", "-T", service]
    full = base + list(command)

    for attempt in range(1, retries + 1):
        print(f"$ {' '.join(full)} (attempt {attempt}/{retries})")
        result = subprocess.run(full)
        if result.returncode == 0:
            return

        if attempt == retries:
            sys.exit(result.returncode)

        print("Container not ready yet, retrying...", file=sys.stderr)
        time.sleep(delay)


def main() -> None:
    compose_cmd = _find_compose_command()

    print("Ensuring Docker services are available...")
    _run_compose(compose_cmd, ["up", "-d", "db"])
    _run_compose(compose_cmd, ["up", "-d", "backend"])

    print("Running database migrations inside the backend container...")
    _compose_exec(compose_cmd, "backend", ["python", "manage.py", "migrate"])

    print("Loading curated demo data (features, cars, demo users)...")
    _compose_exec(
        compose_cmd,
        "backend",
        ["python", "manage.py", "load_sample_data"],
    )

    print("Making sure the frontend container is up as well...")
    _run_compose(compose_cmd, ["up", "-d", "frontend"])

    print()
    print("✅ Demo data ready! Browsing available at: http://localhost")
    print("   Admin account → user: medjet / pass: medjet123")
    print("   Demo buyer account → user: demo / pass: demo123")
    print()
    print("Use 'docker compose ps' to confirm all services are healthy.")


if __name__ == "__main__":
    main()
