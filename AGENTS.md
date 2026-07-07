# AGENTS.md — Tělo

The build/test/release contract for this repo. An agent should be able to read only this file
and ship correctly. Keep every command copy-pasteable and current.

> One-liner: Pavol's body scoreboard for fixing an S-curved back + forward shoulders — wall
> test, wall angels, hollow hold, daily energy, monthly posture photos. Goal deadline 2026-09-30.
> Stack: Vite + React 19 + TypeScript, plain CSS, no router, no PWA (v1) · Track: personal

## Build
```bash
npm install
npm run build   # tsc -b && vite build
```

## Test (TDD required)
```bash
npm run typecheck   # tsc -b --noEmit
npm test            # vitest run — domain logic + App shell journeys
```
Gate: typecheck · test · build must all pass before committing.

## Run / verify a change in the real app
```bash
npm run dev       # http://localhost:5173
npm run preview   # serve the production build
```
Journeys to eyeball:
1. "Dnes" — log today's wall-test gap, wall angels, hollow hold, energy; steppers default to
   the last logged value; save button sits in the thumb zone.
2. "Trendy" — per metric: current value, baseline, goal, sparkline with a goal line.
3. "Fotky" — capture a posture photo, stored per month (IndexedDB); pick two months to compare
   side by side.

## Data
Everything is local: entries in `localStorage` (`telo:v1`, versioned + tolerant parse), photos
in IndexedDB. No backend, no accounts, no network calls.

## Legacy
`legacy/gLocHistory.py` — 2014 Python 2 script, superseded, kept for reference only.
