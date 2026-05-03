# Render Deployment Guide (Free/Hobby)

This project is configured for a split deployment:
- Django API as a Render Web Service
- React frontend as a Render Static Site

A ready blueprint is included in [render.yaml](render.yaml).

## 1) Push your latest code

Render deploys from your GitHub repo, so commit and push first.

## 2) Deploy from Blueprint

1. In Render dashboard, click **New** -> **Blueprint**.
2. Select your repository.
3. Render reads [render.yaml](render.yaml) and creates:
   - `civic-connect-backend` (Web Service)
   - `civic-connect-frontend` (Static Site)

## 3) Set required environment variables

### Backend service

Set these in backend environment settings:

- `DATABASE_URL` = your Postgres connection string
- `CORS_ALLOWED_ORIGINS` = `https://<your-frontend>.onrender.com`
- `CSRF_TRUSTED_ORIGINS` = `https://<your-frontend>.onrender.com`

Optional overrides:

- `ALLOWED_HOSTS` = comma-separated hosts (usually optional on Render because `RENDER_EXTERNAL_HOSTNAME` is auto-handled)
- `SECURE_SSL_REDIRECT` = `True` (default in production flow)

### Frontend service

Set these in frontend environment settings:

- `VITE_API_URL` = `https://<your-backend>.onrender.com/api`
- `VITE_GOOGLE_CLIENT_ID` = Google OAuth client id (optional if not testing Google sign-in)

## 4) Database notes on free tier

Use a Postgres URL for production persistence. If Render Postgres free is unavailable in your account region/plan, use an external free Postgres provider and paste its URL into `DATABASE_URL`.

## 5) First-run commands

The backend build command already runs migrations and collectstatic.
After first deploy, open backend shell and run:

```bash
python manage.py createsuperuser
# optional
python manage.py populate_sample_data
```

## 6) Verify deployment

- Backend health: `https://<your-backend>.onrender.com/healthz/`
- API list check: `https://<your-backend>.onrender.com/api/users/`
- Frontend app: `https://<your-frontend>.onrender.com`

## 7) Common issues

- 401 or login loops: check token flow and API URL in frontend env.
- CORS errors: verify `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` exactly match frontend URL.
- Disappearing data: ensure `DATABASE_URL` points to Postgres, not local SQLite.
- Slow first request: expected on free tier due to cold starts.
