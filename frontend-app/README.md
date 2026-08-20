# AI Student Analyzer

AI Student Analyzer is a web-based student analysis system that helps analyze student academic information and provides meaningful recommendations based on the entered data.

## 🚀 Live Demo

[AI Student Analyzer](https://ai-student-analyzer-1-1mxk.onrender.com)

## 📌 Project Overview

AI Student Analyzer is designed to provide students with an easy-to-use platform for analyzing their academic performance and getting useful insights and recommendations.

The project combines a modern frontend, Node.js backend, MongoDB database, and an ML-based analysis component.

## ✨ Features

* Student registration and login
* Student profile management
* Academic information management
* Student performance analysis
* AI/ML-based analysis and recommendations
* MongoDB database integration
* Responsive web interface
* Live deployment

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* Mongoose
* JWT
* bcrypt/bcryptjs
* CORS

### Database

* MongoDB Atlas

### Machine Learning

* ML model integrated with the student analysis system

### Deployment

* Render
* GitHub

## 📂 Project Structure

```text
AI-STUDENT-ANALYZER/
│
├── backend/
│   ├── models/
│   │   └── Student.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend-app/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── ml-model/
│
├── .gitignore
└── README.md
```

> Note: `.env` contains private configuration values and is not uploaded to GitHub.

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Ishika2406/AI-Student-Analyzer.git
cd AI-Student-Analyzer
```

### 2. Start the Backend

```bash
cd backend
npm install
npm start
```

The backend runs locally on the configured port.

### 3. Start the Frontend

Open a new terminal:

```bash
cd frontend-app
npm install
npm run dev
```

Open the local frontend URL shown by Vite in your browser.

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder and add the required environment variables.

Do not upload `.env` to GitHub.

## 🌐 Deployment

The project is deployed using Render.

* Frontend: Render Static Site
* Backend: Render Web Service
* Database: MongoDB Atlas

## 🔄 Application Flow

```text
Student
   ↓
Frontend
   ↓
Backend API
   ↓
MongoDB / ML Model
   ↓
Analysis & Recommendations
   ↓
Frontend Result
```

## 🔮 Future Scope

* More advanced AI-based recommendations
* Detailed performance dashboards
* Student progress tracking
* More personalized career recommendations
* Improved ML prediction accuracy
* Additional analytics and visualizations

## 👩‍💻 Project Status

The project is currently deployed and available online.

**Live Demo:**
https://ai-student-analyzer-1-1mxk.onrender.com
