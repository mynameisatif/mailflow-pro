# MailFlow Pro

MailFlow Pro is a premium Gmail-powered email sending web app with Google OAuth authentication and a modern SaaS-style UI. The frontend is built with React, Vite, and Tailwind CSS, while the backend uses Express, Passport Google OAuth, and Gmail APIs for email sending.

## What was done

- Redesigned the existing app into a modern, premium SaaS-style UI.
- Implemented a landing page with a branded hero, Google login button, and responsive layout.
- Ensured frontend API requests use the deployed backend URL: `https://mailflow-api-w8kx.onrender.com`.
- Added `withCredentials: true` for secure session-based authentication.
- Built automatic auth detection and dashboard rendering for logged-in users.
- Preserved the existing backend email-sending functionality.
- Removed unused frontend starter files and organized components clearly.
- Verified production build and GitHub Pages deployment.

## Features

- Google OAuth login flow via Render backend.
- Authenticated dashboard showing user profile photo, name, and Gmail address.
- Modern email composer with recipient chips and multi-email paste support.
- Responsive mobile-first design with glassmorphism, soft shadows, and smooth spacing.
- Production-ready GitHub Pages frontend deployment.

## Project structure

- `backend/`: Express API, Google auth, email sending controller.
- `frontend/`: React app, landing page, dashboard, email composer, deployment config.

## Technologies used

- Frontend: React, Vite, Tailwind CSS, Axios, GitHub Pages.
- Backend: Node.js, Express, Passport Google OAuth, express-session, CORS.
- Deployment: GitHub Pages for frontend, Render for backend.

## Local setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mynameisatif/mailflow-pro.git
   cd mailflow-pro
   ```

2. Setup backend:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in `backend/` with:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=https://mailflow-api-w8kx.onrender.com/auth/google/callback
   SESSION_SECRET=some_secure_secret
   ```

4. Start the backend:
   ```bash
   npm run dev
   ```

5. Setup frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

6. Open the app in the browser at `http://localhost:5173`.

## Deployment

- Frontend is configured for GitHub Pages using `homepage` and `vite.base`.
- Deploy frontend from `frontend/` with:
  ```bash
  npm run deploy
  ```
- Backend should be deployed to Render with CORS and session support enabled.
- Live frontend URL: `https://mynameisatif.github.io/mailflow-pro/`
- API base URL: `https://mailflow-api-w8kx.onrender.com`

## How it runs

1. User visits the landing page.
2. If not authenticated, the app shows the login hero and a Google login button.
3. Clicking the button redirects to the backend `/auth/google` route.
4. Upon successful login, the backend redirects back to the frontend.
5. The frontend calls `/auth/me` to detect the authenticated user.
6. If authenticated, the dashboard and email form are displayed.
7. The user composes an email, and the app sends it to the backend via `/api/send-email`.
8. The backend uses the authenticated user session to send Gmail messages.

## Notes for interview

- I maintained functionality while upgrading the UI, focusing on both appearance and usability.
- The login flow was made reliable for GitHub Pages by hardcoding the Render API endpoint and using `withCredentials`.
- I simplified the app structure by removing unused starter files and using a centralized API utility.
- I also added auth session handling and CORS improvements in the backend to support deployed frontend requests.
