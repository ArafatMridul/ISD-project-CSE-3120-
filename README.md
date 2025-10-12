# 🏨 Hotel Management System

## 📘 Overview

The **Hotel Management System** is a full-featured web application that provides a complete hotel booking experience for visitors and users.  
It allows users to browse available rooms, view pricing, and book accommodations while offering an admin prototype panel for managing bookings and users.

---

## ✨ Features

### 🌐 Public Website (Landing Pages)

Visitors can access multiple pages to explore hotel offerings:

-   **Room Types:** View all room categories and their details.
-   **Pricing:** Check prices and compare room options.
-   **Facilities:** Learn about hotel services and amenities.
-   **Contact:** Submit inquiries or requests.

These pages are open to all users without requiring login.

---

### 👤 User Authentication System

To access the dashboard, visitors must create an account.  
The authentication system includes:

-   **Register:** Create a new user account.
-   **Login:** Access the dashboard using credentials.
-   **Change Password:** Update password securely.
-   **Logout:** Sign out from the dashboard.

---

### 🛏️ Booking System & User Dashboard

Registered users can:

-   **Book Rooms:** Fill out the booking form to reserve rooms based on availability.
-   **View Bookings:** Check both **previous** and **upcoming** bookings in the dashboard.
-   **Booking Status:** All new bookings start as **Pending** by default.

---

### 🛠️ Admin Panel (Prototype)

A minimal admin panel is available for demonstration purposes, secured with hardcoded credentials in the `.env` file.  
Admin capabilities include:

-   **Login:** Access with environment-defined credentials.
-   **View Users:** List all registered users.
-   **View Bookings:** Access all bookings across the system.
-   **Change Booking Status:** Update bookings from **Pending → Confirmed**.

> ⚙️ _Note:_ This admin panel is a **prototype** and not intended for production use.

---

### 🗄️ Database Design

The system uses two main tables:

1. **`users`** – Stores user authentication and profile details.
2. **`bookings`** – Records booking information linked to users.

---

## 🧱 Tech Stack

| Layer                | Technologies Used             |
| -------------------- | ----------------------------- |
| **Frontend**         | HTML, TailwindCSS, JavaScript |
| **Backend**          | Node.js, Express.js           |
| **ORM**              | Drizzle ORM                   |
| **Database**         | PostgreSQL                    |
| **Containerization** | Docker                        |

---

## 👥 Contributors

-   **[Pritom Banik](https://github.com/pritom-banik)** – Project Manager & Frontend Designer
-   **[A. K. M Samioul Islam](https://github.com/Samioul51)** – Frontend Developer
-   **[Arafat Mridul](https://github.com/ArafatMridul)** – Backend Developer

---

## 🏁 Getting Started

### 🔧 Prerequisites

Ensure the following are installed:

-   Node.js (v18+)
-   PostgreSQL
-   Docker (optional for containerized setup)

### ⚙️ Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ArafatMridul/ISD-project-CSE-3120-.git
    cd ISD-project-CSE-3120-
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**
   Create a `.env` file and define the following:

    ```env
    ADMIN_USERNAME=your_admin_username
    ADMIN_PASSWORD=your_admin_password
    DATABASE_URL=your_postgres_connection_string
    ```

4. **Run migrations (Drizzle ORM):**

    ```bash
    npm run migrate
    ```

5. **Start the server:**

    ```bash
    npm run dev
    ```

6. **Access the application:**
    - Visit `http://localhost:3000` in your browser.

---

## 📦 Folder Structure

```
Backend/
    ├── controller/         # Contains route
    ├── db/                 # Database connection
    ├── drizzle/            # Drizzle ORM schema
    ├── middlewares/        # Express middlewares
    ├── node_modules/       # Installed npm
    ├── routes/             # API route definitions
    ├── services/           # Business logic
    ├── utils/              # Utility/helper
    ├── validations/        # Request validation
    ├── .env                # Environment
    ├── .gitignore          # Git ignore configuration
    ├── drizzle.config.js   # Drizzle ORM configuration
    ├── index.js            # Entry point for the backend server
    ├── package-lock.json   # NPM lock file
    └── package.json        # Project dependencies and scripts

Frontend/
    ├── assets/             # Images, icons, and static resources
    ├── css/                # Tailwind and custom CSS files
    ├── html/               # HTML templates and pages
    ├── js/                 # JavaScript for interactivity and API calls
    ├── package.json        # Frontend dependencies
    ├── README.md           # Frontend-specific documentation
    └── tailwind.config.js  # TailwindCSS configuration

docker-compose.yml
README.md               # Root documentation for the whole project
```

---

## 🚀 Future Enhancements

-   Integrate payment gateway (Stripe/PayPal)
-   Real-time room availability
-   Email/SMS notifications for bookings
-   Role-based access control for admins

---

## 🪪 License

This project is licensed under the **KUET CSE 3120**.  
Feel free to use and modify for learning or development purposes.
