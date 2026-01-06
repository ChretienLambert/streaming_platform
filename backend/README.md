# Streaming-backend (local-first scaffold)

This directory is a minimal scaffold for the backend service used by the streaming platform frontend.

Quick start (macOS / Linux):

Install dependencies:

```bash
cd backend
npm install
```

Initialize DB and start dev server:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

The server listens on `http://localhost:4000` and provides:

- `GET /health` - healthcheck
- `POST /api/auth/signup` - register { email, password }
- `POST /api/auth/login` - authenticate { email, password }
- `GET /api/contents` - list content
- `GET /api/contents/:id` - fetch content metadata
- `GET /media/:fileName` - stream file (supports Range)

Storage folder: `storage/` (files served from `/storage/*` and `/media/:fileName` for streaming)
