# CI/CD Pipeline Explained

ResolveX uses GitHub Actions for automated integration and deployment.

## Pipelines

| File | Trigger | Purpose |
|---|---|---|
| `.github/workflows/ci.yml` | Push to `main` or `develop`; any PR to `main` | Runs backend tests + frontend Vite build |
| `.github/workflows/deploy.yml` | Push to `main` only | Deploys backend (Render) and frontend (Vercel) |

---

## CI Pipeline (`ci.yml`)

```
Push / PR
    │
    ├── Job: backend
    │       ├── Checkout code
    │       ├── Setup Node 20
    │       ├── npm ci (cached)
    │       └── npm test
    │
    └── Job: frontend
            ├── Checkout code
            ├── Setup Node 20
            ├── npm ci (cached)
            └── npm run build (Vite)
```

Both jobs run in parallel. A build failure blocks the merge.

---

## Deploy Pipeline (`deploy.yml`)

```
Push to main (merge)
    │
    ├── Job: deploy-backend
    │       └── POST to Render deploy hook
    │           (Render pulls latest main and restarts the Node server)
    │
    └── Job: deploy-frontend
            ├── npm ci
            ├── npm run build
            └── vercel --prod
                (Vercel deploys the /dist folder to the CDN edge)
```

---

## Required GitHub Secrets

Set these in **GitHub repo → Settings → Secrets and variables → Actions**:

| Secret | Used by |
|---|---|
| `MONGODB_URI` | CI backend tests |
| `JWT_SECRET` | CI backend tests |
| `VITE_API_URL` | CI + Deploy frontend build |
| `VITE_FIREBASE_*` (6 vars) | CI + Deploy frontend build |
| `RENDER_DEPLOY_HOOK_BACKEND` | Deploy backend job |
| `VERCEL_TOKEN` | Deploy frontend job |
| `VERCEL_ORG_ID` | Deploy frontend job |
| `VERCEL_PROJECT_ID` | Deploy frontend job |

---

## Adding a New Secret

1. Go to your Render service → **Settings → Deploy hook** → copy the URL.
2. In GitHub → **Settings → Secrets → New repository secret** → paste.

---

## Local CI Simulation

```bash
# Simulate backend job
cd backend && npm ci && npm test

# Simulate frontend job
cd frontend && npm ci && npm run build
```
