# React Application with Login and Dashboard

A responsive React application featuring a **login system** and a **dashboard** built using **Ant Design**. This project demonstrates best practices for building modern, user-friendly, and responsive web applications using React and Ant Design components.

---

## Features

- **Login Page:**
  - A clean and elegant login form using Ant Design components.
  - Input validation for username and password.
  - Redirects to the dashboard upon successful login.
  - Logout functionality that clears the user's session and redirects to the login page.

- **Dashboard Page:**
  - Displays data fetched from an API endpoint using `axios`.
  - Uses Ant Design components like  `Card`, and `List` for data presentation.
  - Shows an Ant Design `Spin` component as a loader while fetching data.

- **Navigation:**
  - Access to the dashboard is restricted to logged-in users.

- **Responsive Design:**
  - Fully optimized for desktop and mobile devices using Ant Design's grid system (`Row`, `Col`).

- **State Management:**
  - Utilizes React's Context API to manage application state effectively.

---

## Prerequisites

- Node.js 
- npm
- nodemon

---



## Getting Started

### Backend Setup

```bash
cd Server
npm install
nodemon index.js
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```
