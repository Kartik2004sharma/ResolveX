# Testing Guide

## Stack

The backend uses **Jest** as the test runner. Tests live in `backend/__tests__/` (create this directory).

---

## Running Tests

```bash
cd backend
npm test             # run all tests
npm test -- --watch  # watch mode
npm test -- --coverage  # coverage report
```

---

## Writing Tests

### Unit test example — `nlpClassifier`

```js
// backend/__tests__/nlpClassifier.test.js
const { classifyComplaint } = require('../services/nlpClassifier');

describe('NLP Classifier', () => {
  test('detects ELECTRICAL category', () => {
    const result = classifyComplaint('Light not working', 'The bulb in room 201 is broken');
    expect(result.category).toBe('ELECTRICAL');
  });

  test('detects HIGH priority for urgent keywords', () => {
    const result = classifyComplaint('Fire hazard', 'Short circuit spotted near hostel block');
    expect(result.priority).not.toBe('LOW');
  });
});
```

### Integration test example — auth route

```js
// backend/__tests__/auth.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // export app from server.js

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);
});
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe('POST /api/auth/register', () => {
  it('creates a student account', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test Student',
      email: 'test@campus.edu',
      password: 'password123',
      role: 'student',
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.role).toBe('student');
  });
});
```

---

## Test Environment

Add a test MongoDB URI to `.env.test`:

```bash
MONGODB_URI=mongodb://localhost:27017/resolvex_test
JWT_SECRET=test_secret_key_123
NODE_ENV=test
```

---

## Coverage Goals

| Module | Target |
|---|---|
| `services/nlpClassifier.js` | 90%+ |
| `services/autoAssignment.js` | 80%+ |
| `routes/auth.js` | 80%+ |
| `routes/complaints.js` | 70%+ |
| `jobs/slaEscalation.js` | 70%+ |

---

## CI Integration

The GitHub Actions CI pipeline (`/.github/workflows/ci.yml`) runs `npm test` automatically on every push and pull request to `main`.
