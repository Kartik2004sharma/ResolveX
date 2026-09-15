# Firebase Setup Guide

ResolveX uses Firebase for **real-time push notifications** via Firestore.
The backend writes new notifications to the `notifications` Firestore collection.
The frontend (`NotificationBell.jsx`) listens via `onSnapshot` for instant UI updates.

---

## 1. Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com).
2. Click **Add project** → give it a name (e.g. `resolvex`) → click through the setup.
3. On the project overview, click the **`</>`** web icon to register a web app.
4. Copy the `firebaseConfig` object you receive — you'll need it for the frontend env.

---

## 2. Enable Firestore

1. In Firebase Console → **Build → Firestore Database** → **Create database**.
2. Choose **Start in production mode** (we'll set proper rules next).
3. Pick your closest region and click **Done**.

---

## 3. Set Firestore Security Rules

In Firestore → **Rules**, paste:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read their own notifications
    match /notifications/{docId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      // Only server-side writes via Admin SDK (no client writes)
      allow write: if false;
    }
  }
}
```

> **Note:** The backend uses the Admin SDK to write; clients cannot write directly.

---

## 4. Generate a Service Account (Backend)

1. Firebase Console → **Project Settings** → **Service Accounts**.
2. Click **Generate new private key** → download the JSON file.
3. **DO NOT commit this file.** Copy its contents and set:

```bash
# backend/.env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
```

> If `FIREBASE_PRIVATE_KEY` is not set, the backend skips Firestore writes gracefully and the frontend falls back to API polling every 30 seconds.

---

## 5. Frontend Environment

Create `frontend/.env.local`:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> If these variables are missing, `NotificationBell.jsx` gracefully falls back to polling `/api/notifications` every 30 seconds. Firebase is optional for a working MVP.

---

## 6. Verify

```bash
# Start backend
cd backend && npm run dev

# Watch backend logs — should say:
# ✅  Firebase Admin SDK initialized
# (or "⚠️  Firebase Admin SDK not configured" if env vars are missing — this is OK)

# In the browser DevTools, submit a complaint as student A.
# Login as admin in another tab. Watch NotificationBell update in real-time.
```
