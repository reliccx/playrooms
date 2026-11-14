# Playroom — Vercel project

This project is a Vite + React multiplayer party game (Category Clash), prepared for Vercel hosting.

## What is included
- The complete game UI and room/game actions.
- Vercel serverless API at `api/[...path].ts`.
- Shared room storage using Upstash Redis REST, so players on different devices see the same rooms.
- The background music file at `public/resources/playroom-background-music.mp3`, with visible player controls on the landing page and inside rooms.
- A temporary host connection interruption shows the pink warning; it does not delete the room. A room is deleted only when the host explicitly selects Leave.

## Deploy to Vercel
1. Create a free database at Upstash Redis: https://console.upstash.com/ and copy its REST URL and REST token.
2. Push this folder to a GitHub repository.
3. In Vercel, choose **Add New → Project**, import the repository, and deploy with the detected Vite settings.
4. In **Project → Settings → Environment Variables**, add:
   - `UPSTASH_REDIS_REST_URL` = your Upstash Redis REST URL
   - `UPSTASH_REDIS_REST_TOKEN` = your Upstash Redis REST token
5. Redeploy after adding the variables.

The app cannot create or join multiplayer rooms until both Redis environment variables are configured. Keep these values private; do not put them in frontend code or commit them to GitHub.

## Local development
```bash
npm install
npm run dev
```
The frontend can run locally, but multiplayer API requests require the two Upstash environment variables and a Vercel-compatible function runtime. For local API testing, use `vercel dev` after installing the Vercel CLI.

## Build
```bash
npm install
npm run build
```
