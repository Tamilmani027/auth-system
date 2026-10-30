# Auth System

A full-stack authentication app built with Node.js, Express, MongoDB, and React. It includes user registration, login, password reset via email, JWT-based session handling, and a simple frontend interface for the auth flow.

## Features

- User registration with validation
- Secure login using bcrypt password hashing
- JWT-based authentication flow
- Forgot password flow with reset email link
- Password reset using secure tokens
- MongoDB storage for user records
- Email sending via Brevo (Sendinblue)
- React frontend with Vite

## Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: React, Vite, React Router, Formik, Yup
- Security: bcryptjs, JWT
- Email: Brevo API

## Project Structure

```text
auth-system/
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── components/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .gitignore
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed (version 18+ recommended)
- npm or yarn
- MongoDB running locally or a MongoDB Atlas connection URI
- A Brevo account for sending password reset emails

## Environment Variables

Create a `.env` file inside the `backend` folder with the following values:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth-system
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
BREVO_API_KEY=your_brevo_api_key
EMAIL_USER=your_verified_sender_email
```

Notes:

- `MONGODB_URI` should point to your MongoDB database.
- `CLIENT_URL` is used to generate password reset links in the frontend app.
- `BREVO_API_KEY` and `EMAIL_USER` are required for email delivery.

## Installation

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the Project

### Start the backend

```bash
cd backend
npm start
```

The backend server will run on the configured port, typically:

```text
http://localhost:3000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will run through Vite, typically at:

```text
http://localhost:5173
```

## API Endpoints

Base URL: `/api/auth`

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/forgot-password` - Send a reset link to the user's email
- `POST /api/auth/reset-password/:token` - Reset the user's password using the token

Example request bodies:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

```json
{
  "email": "john@example.com"
}
```

```json
{
  "password": "newpassword123"
}
```

## Authentication Flow

1. A user registers or logs in.
2. The backend validates credentials and checks the password hash.
3. A JWT token is generated for authorized access.
4. For password reset, the backend creates a short-lived reset token and emails a link to the frontend reset page.
5. The frontend submits the new password to the reset endpoint.

## Notes

- The project uses MongoDB for persistence and Express for the backend API.
- Passwords are hashed with `bcryptjs` before being stored.
- Reset tokens expire after 15 minutes.
- The frontend and backend must both be running for the full app experience.

## License

This project is currently for educational and development use.
