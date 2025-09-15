# Portfolio CMS (HTML/CSS/JS + Node/Express + MongoDB)

## Overview
Starter project for a personal portfolio website with a simple CMS dashboard (HTML/CSS/JS frontend).
Backend is Node.js + Express with MongoDB (Mongoose). Authentication uses JWT.

## Features
- Public pages: Home, Projects, Blog, Contact
- CMS Dashboard: Login, Create/Edit/Delete Projects and Blog posts
- Contact form (stores submissions in backend logs / prints)

## Quick setup (local)
1. Install Node.js (v16+ recommended) and MongoDB (or use MongoDB Atlas).
2. Clone/unzip project and `cd` into `backend`.
3. Create `.env` from `.env.example` and fill values.
4. Install dependencies:
   ```
   cd backend
   npm install
   ```
5. Start the backend:
   ```
   npm run dev
   ```
   Backend will run on http://localhost:5000 by default.
6. Open frontend:
   - Serve the `frontend` folder using any static server (or open `frontend/index.html` directly).
   - For full API usage open the files via a simple static server (e.g., `npx http-server frontend`).

## Notes
- This is a starter template. For production, secure JWT secret, use HTTPS, add input validation, sanitize inputs, and configure CORS properly.
- Deployment suggestions: Frontend → Vercel/Netlify; Backend → Render/Railway/Heroku; DB → MongoDB Atlas.
