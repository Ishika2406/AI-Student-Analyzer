import "./App.css";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AcademicProfile from "./pages/AcademicProfile";
import Analysis from "./pages/Analysis";
import CareerRoadmap from "./pages/CareerRoadmap";
import CareerRecommendation from "./pages/CareerRecommendation";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAcademicProfile, setShowAcademicProfile] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showCareerRecommendation, setShowCareerRecommendation] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState("AI/ML Engineer");
  if (showCareerRecommendation) {
    return (
      <CareerRecommendation
        onBack={() => {
          setShowCareerRecommendation(false);
          setShowDashboard(true);
        }}
        onRoadmap={(career) => {
          setSelectedCareer(career);
          setShowCareerRecommendation(false);
          setShowRoadmap(true);
        }}
      />
    );
  }
  if (showRoadmap) {
    return (
      <CareerRoadmap
        career={selectedCareer}
        onBack={() => {
          setShowRoadmap(false);
          setShowDashboard(true);
        }}
      />
    );
  }
  if (showAnalysis) {
    return (
      <Analysis
        onBack={() => {
          setShowAnalysis(false);
          setShowDashboard(true);
        }}
      />
    );
  }
  if (showAcademicProfile) {
    return (
      <AcademicProfile
        onBack={() => setShowAcademicProfile(false)}
        onSave={() => {
          setShowAcademicProfile(false)
          setShowAnalysis(true);
        }}
      />

    );
  }
  if (showDashboard) {
    return (
      <Dashboard
        onLogout={() => setShowDashboard(false)}
        onEnterData={() => setShowAcademicProfile(true)}
        onAnalysis={() => {
          if (localStorage.getItem("academicProfile")) {
            setShowDashboard(false);
            setShowAnalysis(true);
          } else {
            alert("Please complete your Academic Profile first.");
            setShowAcademicProfile(true);
          }
        }}
        onRoadmap={() => {
          setShowDashboard(false);
          setShowRoadmap(true);
        }}
        onCareerRecommendation={() => {
          setShowDashboard(false);
          setShowCareerRecommendation(true);

        }}
      />
    );
  }
  if (showRegister) {
    return (
      <Register
        onBack={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
        onRegister={() => {
          setShowRegister(false);
          setShowDashboard(true);
        }}
      />
    );
  }

  if (showLogin) {
    return (
      <Login
        onBack={() => { setShowLogin(false) }}
        onRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onLogin={() => {
          setShowLogin(false);
          setShowRegister(false);
          setShowAcademicProfile(false);
          setShowDashboard(true);
        }}
      />
    );
  }

  return (
    <div className="app">



      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">AI</div>
          <span>Student<span className="logo-highlight">Analyzer</span></span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <button className="login-btn"
            onClick={() => setShowLogin(true)}>Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero">

        <div className="hero-content">

          <div className="badge">
            ✨ AI-Powered Student Intelligence
          </div>

          <h1>
            Understand Your
            <span> Potential.</span>
            <br />
            Shape Your Future.
          </h1>

          <p>
            Analyze your academic performance, discover your strengths,
            identify skill gaps and get AI-powered career recommendations
            — all in one intelligent platform.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => alert("Welcome to StudentAnalyzer! Let's build your profile.")}
            >
              Get Started →
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document.getElementById("features").scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Features
            </button>
          </div>

          <div className="stats">
            <div>
              <strong>95%</strong>
              <small>Prediction Accuracy</small>
            </div>

            <div>
              <strong>50+</strong>
              <small>Career Paths</small>
            </div>

            <div>
              <strong>24/7</strong>
              <small>AI Assistance</small>
            </div>
          </div>

        </div>

        {/* Dashboard Preview */}
        <div className="dashboard-preview">

          <div className="dashboard-header">
            <div>
              <small>STUDENT DASHBOARD</small>
              <h3>Performance Overview</h3>
            </div>

            <div className="profile-circle">IA</div>
          </div>

          <div className="score-card">
            <div>
              <small>Predicted Performance</small>
              <h2>82%</h2>
              <span className="good">↑ 8.4% from last semester</span>
            </div>

            <div className="score-ring">
              82
            </div>
          </div>

          <div className="mini-cards">

            <div className="mini-card">
              <span>📚</span>
              <small>Attendance</small>
              <strong>88%</strong>
            </div>

            <div className="mini-card">
              <span>🎯</span>
              <small>Skill Score</small>
              <strong>76%</strong>
            </div>

            <div className="mini-card">
              <span>🚀</span>
              <small>Career Match</small>
              <strong>87%</strong>
            </div>

          </div>

          <div className="career-card">
            <div>
              <small>TOP CAREER MATCH</small>
              <h3>AI / ML Engineer</h3>
            </div>

            <div className="match">87%</div>
          </div>

        </div>

      </main>

      {/* Features */}
      <section className="features" id="features">

        <div className="section-heading">
          <span>POWERFUL FEATURES</span>
          <h2>Everything you need to grow</h2>
          <p>
            One intelligent platform to understand your performance
            and plan your career.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Performance Prediction</h3>
            <p>
              Predict your academic performance using intelligent
              machine learning models.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>AI Analysis</h3>
            <p>
              Get personalized insights about your academic strengths
              and weaknesses.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Career Recommendation</h3>
            <p>
              Discover career paths that match your skills,
              interests and performance.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Learning Roadmap</h3>
            <p>
              Follow a personalized roadmap to close your skill gaps
              and reach your career goals.
            </p>
          </div>

        </div>

      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">

        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>Your journey starts here</h2>
        </div>

        <div className="steps">

          <div className="step">
            <div className="step-number">01</div>
            <h3>Build Your Profile</h3>
            <p>Enter your academic information, skills and interests.</p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>AI Analyzes You</h3>
            <p>Our ML and AI models analyze your profile and performance.</p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Get Your Roadmap</h3>
            <p>Receive career recommendations and a personalized learning plan.</p>
          </div>

        </div>

      </section>

      <footer>
        <div className="logo">
          <div className="logo-icon">AI</div>
          <span>Student<span className="logo-highlight">Analyzer</span></span>
        </div>

        <p>AI-powered insights for a smarter student journey.</p>
      </footer>

    </div>
  );
}

export default App;