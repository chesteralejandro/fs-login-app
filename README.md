# Login Application ![Status](https://img.shields.io/badge/status-active-brightgreen)

A full-stack authentication system built using Node.js, Express, and PostgreSQL (Supabase).

This project implements a secure login and registration flow following the MVC (Model–View–Controller) architecture. It focuses on backend fundamentals, clean structure, and secure session-based authentication.

## 📌 Overview

This application allows users to:

- Register with validated credentials.
- Log in using secure password verification.
- Access a protected dashboard after authentication.
- View their name and registration year on the dashboard.
- Log out securely.

While intentionally simple, the project demonstrates core backend authentication concepts and clean application architecture. The project was initially developed using MySQL and later migrated to PostgreSQL to simplify cloud deployment and improve portability.

## 🌐 Live Demo

[https://fs-login-app.onrender.com](https://fs-login-app.onrender.com)

## 🏗️ Architecture

### Backend

- Node.js
- Express.js
- PostgreSQL
- pg
- bcrypt
- express-session
- express-validator

### Frontend

- EJS
- HTML
- CSS

### Deployment

- Render — Node.js server hosting
- Supabase — PostgreSQL database hosting

## 📽️ Preview

![App Demo](./assets/images/demo.gif)

## ✨ Features

- MVC architecture (Models, Views, Controllers).
- Modular route organization.
- Server-side validation using express-validator.
- Secure password hashing and verification using bcrypt
- Session-based authentication using express-session.
- Flash messaging for user feedback.
- Protected routes via custom middleware by requiring an active authenticated session.
- Confirm password validation during registration.
- PostgreSQL integration with parameterized queries to prevent SQL injection.
- PostgreSQL connection pooling using pg.Pool

## 🔐 Security Considerations

- Passwords are hashed using bcrypt before storage.
- SQL queries use parameterized statements to prevent SQL injection.
- User sessions are stored using express-session.
- Protected routes require an authenticated session.

## ⚙️ Installation & Setup

1.  Clone the Repository

    ```bash
    git clone https://github.com/chesteralejandro/fs-login-app.git
    cd fs-login-app
    ```

2.  Install Dependencies

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory and initialize Environment Variables:

    ```env
    PORT=3000

    DATABASE_HOST=localhost
    DATABASE_USER=postgres
    DATABASE_PASSWORD=<your_mysql_password>
    DATABASE_PORT=5432
    DATABASE_NAME=fs_login_app

    SESSION_SECRET=<your_secret_key>
    ```

4.  Set up the database.

    Create the PostgreSQL database

    ```sql
    CREATE DATABASE fs_login_app;
    ```

    Create users table

    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(50) UNIQUE,
        password VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

5.  Start the Application

    ```bash
    npm run dev
    ```

6.  Open in your web browser: [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```bash
root/
│
├── assets/
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── public/
│   ├── routes/
│   ├── utils/
│   ├── views/
│   └── app.js
│
├── .env
├── package.json
└── README.md
```

The application follows a structured MVC separation to maintain scalability and code clarity.
