# Database Security Guide (MongoDB)

## Connection

Always use `MONGODB_URI` with SSL enabled. MongoDB Atlas connections are TLS-encrypted by default.

```bash
# backend/.env — never commit this
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/campusconnect?retryWrites=true&w=majority
```

### Atlas Network Access
1. In Atlas → **Network Access** → restrict IPs to your server's static IP (not `0.0.0.0/0`).
2. For development: add your local IP only.

---

## Indexes

ResolveX creates the following indexes in `backend/models/Complaint.js`:

| Index | Purpose |
|---|---|
| `{ status, category, priority }` | Dashboard filter queries |
| `{ submittedBy }` | Student's own complaints |
| `{ assignedTo }` | Staff queue queries |
| `{ createdAt }` | Trend analytics date range scans |

`Notification.js` indexes:
| Index | Purpose |
|---|---|
| `{ userId, isRead }` | Per-user unread count |

---

## Authentication

- Passwords are hashed with **bcrypt** at cost factor 12 (`backend/models/User.js`).
- JWT tokens expire in 7 days by default (`JWT_EXPIRE=7d`). Rotate `JWT_SECRET` to force all sessions to expire.
- Tokens are verified on every request in `backend/middleware/auth.js`.

---

## Rate Limiting

`backend/server.js` applies:
- Global: 100 requests / 15 minutes per IP.
- Auth routes: stricter limit (configured via `express-rate-limit`).

Adjust via environment:
```bash
RATE_LIMIT_WINDOW_MS=900000  # 15 min
RATE_LIMIT_MAX=100
```

---

## Helmet.js

All HTTP headers are hardened with `helmet` in `server.js`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (HSTS)
- Content Security Policy

---

## Input Sanitization

- All API inputs validated with `express-validator`.
- Mongoose schemas enforce enum whitelists on `role`, `category`, `status`, `priority`.
- Image uploads processed through Multer with file-type validation before Cloudinary upload.

---

## Secrets Rotation Checklist

| Secret | When to rotate |
|---|---|
| `JWT_SECRET` | Annually or after any breach. Causes all sessions to expire. |
| MongoDB credentials | Quarterly. Use Atlas user rotation. |
| `CLOUDINARY_API_SECRET` | Annually. |
| Firebase service account key | Annually via Firebase Console. |
| Email credentials | When staff changes. |
