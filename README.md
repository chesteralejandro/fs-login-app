# Login Application ![Status](https://img.shields.io/badge/status-active-brightgreen)

A full-stack authentication system built using Node.js, Express, and MySQL.

This project implements a secure login and registration flow following the MVC (Model–View–Controller) architecture. It focuses on backend fundamentals, clean structure, and secure session-based authentication.

## 📌 Overview

This application allows users to:

- Register with validated credentials.
- Log in using secure password verification.
- Access a protected dashboard after authentication.
- View their name and registration year on the dashboard.
- Log out securely.

Rather than focusing on production-level complexity, this project emphasizes clean structure, maintainability, and proper security practices — making it a solid learning exercise and a portfolio-ready demonstration of fundamental full-stack concepts.

## 🛠️ Tech Stack

### Backend

`Node.js`, `Express.js`, `MySQL`, `mysql2`, `bcrypt`, `express-session`, `express-validator`, `connect-flash`, `dotenv`

### Frontend

`EJS`, `HTML`, `CSS`

## 📽️ Preview

![App Demo](./assets/images/demo.gif)

## ✨ Features

- MVC architecture (Models, Views, Controllers).
- Modular route organization.
- Server-side validation using express-validator.
- Login verification uses bcrypt’s secure comparison method.
- Password hashing using bcrypt before storage.
- Session-based authentication using express-session.
- Flash messaging for user feedback.
- Protected routes via custom middleware by requiring an active authenticated session.
- Confirm password validation during registration.
- MySQL integration with parameterized queries (mysql2) to prevent SQL injection.

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
    DATABASE_USER=<your_mysql_user>
    DATABASE_PASSWORD=<your_mysql_password>
    DATABASE_NAME=fs_login_app

    SESSION_SECRET=<your_secret_key>
    ```

4.  Create a `.gitignore` file in the root directory:

    ```text
    node_modules/
    .env
    ```

5.  Set up the database.

    Create MySQL database

    ```mysql
    CREATE DATABASE fs_login_app;
    ```

    Create users table

    ```mysql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        created_at DATETIME,
        updated_at DATETIME
    );
    ```

6.  Start the Application

    ```bash
    npm run dev
    ```

7.  Open in your web browser: [http://localhost:3000](http://localhost:3000)

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

## 🚀 Possible Enhancements

- CSRF protection
- Login attempt limit
- Password reset
