# Nodemailer Setup Guide

ResolveX sends emails for:
- Complaint submission confirmation
- Staff assignment notification
- SLA breach alert (to all admins)
- Complaint resolution notification

All templates are in `backend/services/emailService.js`.

---

## Option A — Gmail (Development / Testing)

> Gmail requires an **App Password** if 2FA is enabled on your account. Do NOT use your regular Gmail password.

1. Go to [https://myaccount.google.com/security](https://myaccount.google.com/security).
2. Under *Signing in to Google* → **App passwords** → select **Mail** → device **Other** → generate.
3. Copy the 16-character App Password.

```bash
# backend/.env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=youraddress@gmail.com
EMAIL_PASS=your_16char_app_password
EMAIL_FROM="ResolveX <youraddress@gmail.com>"
```

---

## Option B — Mailtrap (Safe staging, catches all outgoing mail)

1. Sign up at [https://mailtrap.io](https://mailtrap.io) (free tier available).
2. Go to **Email Testing → Inboxes → SMTP Settings** → copy credentials.

```bash
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_pass
EMAIL_FROM="ResolveX <noreply@resolvex.campus>"
```

---

## Option C — Outlook / Office 365

```bash
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=youraddress@yourdomain.com
EMAIL_PASS=your_password
EMAIL_FROM="ResolveX <youraddress@yourdomain.com>"
```

---

## Option D — SendGrid (Production)

1. Create an account at [https://sendgrid.com](https://sendgrid.com).
2. Create an API Key with **Mail Send** permission.

```bash
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey              # literal string "apikey"
EMAIL_PASS=your_sendgrid_api_key
EMAIL_FROM="ResolveX <noreply@yourdomain.com>"
```

---

## Verify

```bash
cd backend && node -e "
require('dotenv').config();
const { sendEmail } = require('./services/emailService');
sendEmail('your@email.com', 'Test', '<b>It works!</b>')
  .then(() => console.log('Email sent!'))
  .catch(console.error);
"
```

> If `EMAIL_HOST` is not set, `emailService.js` silently skips sending. Nodemailer is optional for MVP.
