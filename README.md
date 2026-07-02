# 💼 MERN Stack Job Portal

A full-stack Job Portal web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform allows users to register, login, browse jobs, apply for jobs, and manage job listings.

---

## 🚀 Features

- 👤 User Authentication (Register / Login / Logout)
- 🔐 JWT Authentication with Cookies
- 🧑‍💼 Separate roles (User / Admin)
- 💼 Post & Manage Jobs
- 📄 Apply for Jobs
- 📁 Upload Resume
- 🖼️ Profile Image Upload (Cloudinary)
- 🔎 Search & Filter Jobs
- 📊 Dashboard for Users & Admin

---

## 🛠️ Tech Stack

### Frontend:
- React.js (Vite)
- Redux Toolkit
- Axios
- Tailwind CSS / CSS

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image Upload)

---

## 📁 Project Structure

Mern-stack-job-portal/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── components/
│ └── pages/
│
└── README.md


##BACKEND SETUP

cd backend
npm install

#### CREATE .env FILE


PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret

#### RUN BACKEND
npm start


###FRONTEND SETUP

cd frontend
npm install
npm run dev  


🌐 ENVIRONMENT  VARIABLES

Make sure to configure:

->  MongoDB Atlas
->  Cloudinary
->  Frontend API URL



