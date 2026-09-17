# ResolveX — Where Every Concern Finds a Resolution

ResolveX is a full-stack campus complaint and maintenance management platform that helps students report issues digitally, track their resolution in real time, and gives staff and administrators the tools to prioritize, assign, escalate, and resolve complaints efficiently.

## 🎥 Product Demo


https://github.com/user-attachments/assets/9f250191-5dd7-4787-be69-a4613c60ddd1


## ✨ What ResolveX Does

- **Role-based authentication** for students, staff, and administrators using JWT + bcrypt
- **Complaint submission** with title, description, category, location, priority, and optional image upload
- **AI-assisted complaint classification** for category and urgency
- **Smart auto-assignment** based on department and staff workload
- **SLA escalation** for complaints that exceed configured resolution limits
- **Analytics dashboard** for category, priority, trend, and department insights
- **Real-time notifications** using Firebase Firestore
- **Email notifications** using Nodemailer
- **Cloud image uploads** through Cloudinary
- **Security hardening** with Helmet, sanitization, rate limiting, validation, and encrypted passwords
- **Automated testing and CI/CD** with Jest, Supertest, and GitHub Actions

## 🧠 AI / NLP

ResolveX includes an NLP classification service that can use the OpenAI SDK to help classify complaints by category and urgency. The backend also includes the `natural` package for text-processing workflows.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Radix UI, Recharts, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| AI / NLP | OpenAI SDK, Natural |
| Real-time | Firebase Firestore, Socket.IO |
| Media | Cloudinary, Multer |
| Email | Nodemailer |
| Testing | Jest, Supertest, MongoDB Memory Server |
| CI/CD | GitHub Actions |

## 🏗️ Project Structure

```text
ResolveX/
├── .github/workflows/          # CI/CD workflows
├── backend/
│   ├── config/                 # Database, Firebase, SLA config
│   ├── models/                 # Mongoose models
│   ├── routes/                 # REST API endpoints
│   ├── middleware/             # Auth, validation, security
│   ├── services/               # NLP, email, notifications, assignment
│   ├── jobs/                   # SLA escalation jobs
│   ├── __tests__/              # Jest test suites
│   └── server.js               # Express application
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── brag-output/                # Generated product demo assets
├── DATABASE_SCHEMA.md
├── CICD_EXPLAINED.md
├── FIREBASE_SETUP.md
├── README.md
└── LICENSE
```

## 📋 Prerequisites

Before running ResolveX locally, install or configure:

- Node.js 20+
- npm
- MongoDB Atlas or another MongoDB instance
- Firebase project *(optional — used for real-time notifications)*
- Cloudinary account *(optional — used for image uploads)*
- Email provider credentials *(optional — used by Nodemailer)*
- OpenAI API key *(optional — required for OpenAI-powered classification)*

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Kartik2004sharma/ResolveX.git
cd ResolveX
```

### 2. Start the backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

At minimum, configure:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/resolvex
JWT_SECRET=replace_with_a_strong_random_secret
```

Optional integrations may require additional values such as `OPENAI_API_KEY`, Firebase credentials, Cloudinary credentials, and email configuration. See the included setup documentation for details.

### 3. Start the frontend

Open another terminal:

```bash
cd ResolveX/frontend
npm install
```

Create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api

# Optional Firebase configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Then start Vite:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

### 4. Seed demo data *(optional)*

```bash
cd backend
npm run seed
```

Sample credentials created by the seed script include:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@campusconnect.edu` | `admin123` |
| Staff | `Kritikarupesh1234@gmail.com` | `staff123` |
| Staff | `staff.plumbing@campusconnect.edu` | `staff123` |
| Student | `student@campusconnect.edu` | `student123` |

> These credentials are for local/demo use only. Do not use them in production.

## 🔐 Security

ResolveX includes multiple backend security controls:

- JWT authentication with expiry
- bcrypt password hashing
- Helmet security headers
- MongoDB query sanitization
- Express input validation
- Rate limiting
- CORS configuration
- Environment-based secret management
- TLS support for hosted MongoDB connections

See [`backend/DATABASE_SECURITY.md`](backend/DATABASE_SECURITY.md) for implementation details.

## 🧪 Testing

Run the backend test suite:

```bash
cd backend
npm test
```

Other test commands:

```bash
npm run test:watch
npm run test:coverage
```

The test stack uses Jest, Supertest, and MongoDB Memory Server for isolated backend testing.

See [`backend/TESTING_GUIDE.md`](backend/TESTING_GUIDE.md) for more information.

## 🔄 CI/CD

ResolveX uses GitHub Actions for automated integration and deployment workflows.

The CI workflow can validate backend tests and frontend builds on pushes and pull requests, while deployment workflows can be configured for production environments.

See [`CICD_EXPLAINED.md`](CICD_EXPLAINED.md) for the pipeline documentation.

## 📊 API Overview

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/me` | Get the current user |
| GET | `/api/complaints` | List role-filtered complaints |
| POST | `/api/complaints` | Submit a complaint |
| GET | `/api/complaints/:id` | Get complaint details |
| PATCH | `/api/complaints/:id` | Update complaint status or assignment |
| POST | `/api/complaints/classify` | Classify complaint text |
| GET | `/api/notifications` | Get user notifications |
| GET | `/api/analytics/*` | Retrieve dashboard analytics |
| GET | `/api/users/staff` | List staff members |

## ☁️ Integrations

### Cloudinary
Used for cloud-based complaint image uploads and delivery.

### Firebase Firestore
Used for real-time notification synchronization.

### Nodemailer
Used for email notifications such as complaint submission, assignment, resolution, and SLA events.

### OpenAI
Used by the NLP classification service when an API key is configured.

## 📚 Documentation

- [`DATABASE_SCHEMA.md`](DATABASE_SCHEMA.md) — database design
- [`backend/DATABASE_SECURITY.md`](backend/DATABASE_SECURITY.md) — database and API security
- [`backend/TESTING_GUIDE.md`](backend/TESTING_GUIDE.md) — testing guide
- [`backend/NODEMAILER_SETUP.md`](backend/NODEMAILER_SETUP.md) — email setup
- [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md) — Firebase configuration
- [`CICD_EXPLAINED.md`](CICD_EXPLAINED.md) — CI/CD documentation

## 🚢 Production Checklist

Before deploying ResolveX:

- Set `NODE_ENV=production`
- Use a production MongoDB database
- Generate a strong `JWT_SECRET`
- Configure production CORS origins
- Configure email credentials if email notifications are enabled
- Configure Firebase and Firestore security rules if real-time notifications are enabled
- Configure Cloudinary if image uploads are enabled
- Configure `OPENAI_API_KEY` if OpenAI classification is enabled
- Store all secrets in your deployment platform's environment-variable manager

## 🤝 Contributing

1. Create a feature branch.
2. Make and test your changes.
3. Commit with a clear message.
4. Push the branch.
5. Open a pull request.
6. Verify CI before merging.

## 📄 License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

<p align="center">
  Built as <strong>ResolveX</strong> — a smarter way to report, route, and resolve campus issues.
</p>
