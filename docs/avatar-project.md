# AI Avatar Project Blueprint

This site can host the entry point for a talking AI avatar, while the realtime conversation service runs on a separate backend.

## Target Architecture

- GitHub Pages / static Next.js site:
  - loads an external avatar widget loader script
  - displays the floating avatar launcher on the portfolio site
- Avatar service:
  - hosted separately from GitHub Pages
  - serves `loader/avatar-loader.js`, widget assets, and API endpoints
  - manages realtime voice/video sessions
- Realtime media:
  - LiveKit for browser audio/video transport
- Agent backend:
  - FastAPI or Node service
  - issues session tokens
  - starts or wakes the avatar agent
  - integrates LLM, speech, and avatar rendering

## Recommended Phase Plan

### Phase 1: Site Integration

- Add optional loader support to the portfolio site.
- Add a visible project section explaining the AI avatar initiative.
- Keep the site deployable even when the avatar backend is not configured.

### Phase 2: Avatar Backend

- Stand up a dedicated service on Cloud Run or another container host.
- Expose:
  - `POST /api/wake`
  - `POST /api/token`
  - `GET /api/keepalive`
  - `GET /health`
- Serve:
  - `loader/avatar-loader.js`
  - `widget.html`
  - `widget.js`
  - `widget.css`
  - avatar photo / assets

### Phase 3: Realtime Agent

- Connect browser clients with LiveKit.
- Join an agent participant that handles:
  - speech-to-text
  - LLM response generation
  - text-to-speech
  - talking avatar video output
- Add session limits, mute/disconnect controls, and silence timeouts.

### Phase 4: Portfolio-Specific Intelligence

- Give the avatar access to structured knowledge about:
  - resume
  - work history
  - featured projects
  - skills
  - contact details
- Add guardrails for unsupported claims and off-topic prompts.

## Current Site Hook

The portfolio site now supports an optional public environment variable:

`NEXT_PUBLIC_AVATAR_LOADER_URL`

Example:

`NEXT_PUBLIC_AVATAR_LOADER_URL=https://avatar.your-domain.com/loader/avatar-loader.js`

If this variable is unset, the site still builds normally and shows the avatar project as an in-progress capability.
