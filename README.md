# Personal Portfolio (React + Express + MySQL)

## Run locally
1. MySQL: `mysql -u root -p < server/schema.sql`
2. API: `cd server && cp .env.example .env` (add your DB password), then `npm install && npm run dev`
3. Site: `cd client && cp .env.example .env && npm install && npm run dev` → http://localhost:5173

Edit the three seeded rows in `projects` (descriptions, tech, links) with your resume details.
Save your resume as `client/public/Full_Stack.pdf` (the Download button links to it).

## Deploy
Vercel and Netlify host the frontend only; the Express API and MySQL need a separate host.
1. Database: create a managed MySQL (Aiven or Railway), then run `schema.sql` on it.
2. API: deploy `server/` to Render or Railway (build `npm install`, start `npm start`). Env vars: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_SSL=true if required, CLIENT_ORIGIN=https://your-site.vercel.app
3. Frontend: deploy `client/` to Vercel or Netlify (Vite, build `npm run build`, output `dist`). Set VITE_API_URL to your API URL.
