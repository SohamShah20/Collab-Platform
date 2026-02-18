# 🚀 Real-Time Collaboration Platform

A full-stack real-time collaboration platform where multiple users can create, edit, and manage shared documents simultaneously — similar to Google Docs (Lite version).

---

## 🌟 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication (httpOnly cookies)
- Protected routes

### 📄 Document Management
- Create new documents
- View all user documents
- Delete documents
- Auto-save functionality

### ⚡ Real-Time Editing
- Live multi-user editing using Socket.IO
- Instant updates across connected clients
- Join document rooms

### 🗂 Version Control (Bonus)
- Snapshot-based version storage
- Ability to track previous document states

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Socket.IO Client
- React Quill (Rich Text Editor)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.IO
- JWT Authentication
- bcrypt

### Database
- MongoDB Atlas

---


## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone (https://github.com/SohamShah20/Collab-Platform)
cd Collab-Platfor

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173


Run backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173




## 🎥 Live Demo

[View Live Demo](https://your-live-demo-url.com)

