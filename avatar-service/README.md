# Avatar Service

This directory now contains the first runnable version of the portfolio avatar backend.

## What is implemented

- FastAPI service in `main.py`
- static loader assets for embedding the widget on the portfolio site
- widget shell with a mock chat loop for portfolio Q&A
- mock session APIs:
  - `GET /health`
  - `POST /api/wake`
  - `POST /api/token`
  - `GET /api/keepalive`
  - `GET /api/config`
  - `POST /api/chat`

This is a local development and testing environment. It is intentionally mock-first:
- no LiveKit yet
- no realtime voice yet
- no talking video synthesis yet

The goal is to validate the UX, embed pattern, session lifecycle, and recruiter-facing conversation flow before adding realtime infrastructure.

## Local setup

1. Create a virtual environment:

   `python3 -m venv .venv`

2. Activate it:

   `source .venv/bin/activate`

3. Install dependencies:

   `pip install -r requirements.txt`

4. Copy environment variables if needed:

   `cp .env.example .env`

5. Run the service:

   `uvicorn main:app --reload --host 127.0.0.1 --port 8001`

## Local site integration

From the repo root:

`npm run dev:site:avatar`

This runs the portfolio site with:

`NEXT_PUBLIC_AVATAR_LOADER_URL=http://127.0.0.1:8001/loader/avatar-loader.js`

Then open:

- `http://127.0.0.1:3000/`
- `http://127.0.0.1:3000/avatar-lab/`

## Smoke test

Once both services are running:

`./scripts/test_avatar_stack.sh`

## Next upgrades

- replace mock `/api/token` with realtime session provisioning
- connect LiveKit
- add speech-to-text and text-to-speech
- replace the mock text widget with voice and talking-avatar video
- add portfolio-specific grounding from structured project data and resume artifacts
