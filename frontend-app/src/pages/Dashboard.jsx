import "../App.css";
import { useEffect, useState } from "react";
function Dashboard({ onLogout, onEnterData, onAnalysis, onRoadmap, onCareerRecommendation }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const student = JSON.parse(
                    localStorage.getItem("student")
                );

                if (!student?.email) return;

                const response = await fetch(
                    `https://ai-student-analyzer-9hms.onrender.com/api/profile/${student.email}`
                );

                const data = await response.json();

                if (response.ok && data.academicProfile) {
                    setProfile(data.academicProfile);

                    // Keep existing features working
                    localStorage.setItem(
                        "academicProfile",
                        JSON.stringify(data.academicProfile)
                    );
                }
            } catch (error) {
                console.error("Profile fetch error:", error);
            }
        };

        loadProfile();
    }, []);
    const student = JSON.parse(
        localStorage.getItem("student")
    );

    let performance = 0;
    let skillScore = 0;
    let career = "Complete your profile";
    let careerMatch = 0;

    const calculateCareerMatch = (profile) => {

        const interests = profile.interests.toLowerCase();
        const skills = profile.skills.toLowerCase();

        const careers = {
            "AI / ML Engineer": 0,
            "Data Scientist": 0,
            "Full Stack Developer": 0,
            "Cybersecurity Engineer": 0,
            "Software Developer": 0
        };

        // AI / ML
        if (
            interests.includes("ai") ||
            interests.includes("machine learning") ||
            interests.includes("ml")
        ) {
            careers["AI / ML Engineer"] += 40;
        }

        if (
            skills.includes("python") ||
            skills.includes("tensorflow") ||
            skills.includes("pytorch")
        ) {
            careers["AI / ML Engineer"] += 25;
        }

        // Data Science
        if (
            interests.includes("data") ||
            interests.includes("analytics")
        ) {
            careers["Data Scientist"] += 40;
        }

        if (
            skills.includes("python") ||
            skills.includes("sql") ||
            skills.includes("pandas")
        ) {
            careers["Data Scientist"] += 25;
        }

        // Full Stack
        if (
            interests.includes("web") ||
            interests.includes("frontend") ||
            interests.includes("backend")
        ) {
            careers["Full Stack Developer"] += 40;
        }

        if (
            skills.includes("html") ||
            skills.includes("css") ||
            skills.includes("javascript") ||
            skills.includes("react")
        ) {
            careers["Full Stack Developer"] += 25;
        }

        // Cybersecurity
        if (
            interests.includes("cyber") ||
            interests.includes("security")
        ) {
            careers["Cybersecurity Engineer"] += 40;
        }

        if (
            skills.includes("linux") ||
            skills.includes("networking")
        ) {
            careers["Cybersecurity Engineer"] += 25;
        }

        // General software development
        if (
            skills.includes("c++") ||
            skills.includes("java") ||
            skills.includes("python")
        ) {
            careers["Software Developer"] += 25;
        }

        // Academic performance contributes to every career
        const academicBonus =
            Math.round((performance / 100) * 25);

        Object.keys(careers).forEach((name) => {
            careers[name] += academicBonus;
            careers[name] = Math.min(100, careers[name]);
        });

        const bestCareer = Object.entries(careers)
            .sort((a, b) => b[1] - a[1])[0];

        return {
            name: bestCareer[0],
            score: bestCareer[1]
        };
    };

    if (profile) {

        const cgpa = Number(profile.cgpa);
        const attendance = Number(profile.attendance);

        performance = Math.min(
            100,
            Math.round(
                (cgpa / 10) * 60 +
                attendance * 0.4
            )
        );

        const skills = profile.skills
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);

        skillScore = Math.min(
            100,
            50 + skills.length * 10
        );

        const careerResult = calculateCareerMatch(profile);

        career = careerResult.name;
        careerMatch = careerResult.score;
    }

    return (
        <div className="dashboard-page">

            <nav className="dashboard-navbar">

                <div className="logo">
                    <div className="logo-icon">AI</div>

                    <span>
                        Student
                        <span className="logo-highlight">
                            Analyzer
                        </span>
                    </span>
                </div>

                <button
                    className="logout-btn"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </nav>


            <main className="dashboard-container">

                <div className="dashboard-welcome">

                    <div>
                        <span className="dashboard-label">
                            STUDENT DASHBOARD
                        </span>

                        <h1>
                            Welcome,{" "}
                            {student?.name || "Student"} 👋
                        </h1>

                        <p>
                            Let's understand your potential
                            and shape your future.
                        </p>
                    </div>

                    <div className="dashboard-profile">
                        {student?.name
                            ?.charAt(0)
                            .toUpperCase() || "S"}
                    </div>

                </div>


                {/* STATS */}

                <div className="dashboard-stats">

                    <div className="dashboard-stat-card">
                        <span className="stat-icon">📊</span>

                        <small>
                            Academic Performance
                        </small>

                        <strong>
                            {profile ? `${performance}%` : "--"}
                        </strong>

                        <span className="stat-good">
                            {profile
                                ? "Based on your profile"
                                : "Add academic data"}
                        </span>
                    </div>


                    <div className="dashboard-stat-card">

                        <span className="stat-icon">
                            📚
                        </span>

                        <small>Attendance</small>

                        <strong>
                            {profile
                                ? `${profile.attendance}%`
                                : "--"}
                        </strong>

                        <span className="stat-good">
                            {profile
                                ? "Current attendance"
                                : "Not available"}
                        </span>

                    </div>


                    <div className="dashboard-stat-card">

                        <span className="stat-icon">
                            🧠
                        </span>

                        <small>Skill Score</small>

                        <strong>
                            {profile
                                ? `${skillScore}%`
                                : "--"}
                        </strong>

                        <span className="stat-good">
                            {profile
                                ? "Based on skills"
                                : "Add your skills"}
                        </span>

                    </div>


                    <div className="dashboard-stat-card">

                        <span className="stat-icon">
                            🎯
                        </span>

                        <small>Career Match</small>

                        <strong>
                            {profile
                                ? `${careerMatch}%`
                                : "--"}
                        </strong>

                        <span className="stat-good">
                            {profile
                                ? "AI recommended"
                                : "Complete profile"}
                        </span>

                    </div>

                </div>


                {/* MAIN CARDS */}

                <div className="dashboard-grid">

                    <div className="dashboard-main-card">

                        <div className="card-heading">

                            <div>
                                <span className="dashboard-label">
                                    AI INSIGHT
                                </span>

                                <h2>
                                    Your Potential
                                </h2>
                            </div>

                            <span className="big-emoji">
                                🤖
                            </span>

                        </div>

                        <p>
                            {profile
                                ? `Your current performance is ${performance}%.
                                   Keep improving your skills and practical
                                   experience to strengthen your profile.`
                                : "Enter your academic information to receive personalized AI insights."
                            }
                        </p>

                        <button
                            className="dashboard-action-btn"
                            onClick={onAnalysis}
                        >
                            Start AI Analysis →
                        </button>

                    </div>


                    <div className="dashboard-main-card career-match-card">

                        <span className="dashboard-label">
                            TOP CAREER MATCH
                        </span>

                        <h2>
                            {career}
                        </h2>

                        <div className="career-score">

                            <strong>
                                {profile
                                    ? `${careerMatch}%`
                                    : "--"}
                            </strong>

                            <span>
                                Match
                            </span>

                        </div>

                        <p>
                            {profile
                                ? "Your interests and academic profile match this career path."
                                : "Complete your academic profile to discover your career match."
                            }
                        </p>

                    </div>

                </div>


                {/* ACTIONS */}

                <section className="dashboard-actions">

                    <div className="section-heading dashboard-heading">

                        <span>
                            YOUR JOURNEY
                        </span>

                        <h2>
                            What would you like to do?
                        </h2>

                    </div>


                    <div className="action-grid">

                        <div className="action-card">

                            <div className="action-icon">
                                📝
                            </div>

                            <h3>
                                Academic Profile
                            </h3>

                            <p>
                                Add your academic information,
                                skills and interests.
                            </p>

                            <button
                                className="primary-btn"
                                onClick={onEnterData}
                            >
                                {profile
                                    ? "Update Data →"
                                    : "Enter Data →"}
                            </button>

                        </div>


                        <div className="action-card">

                            <div className="action-icon">
                                🤖
                            </div>

                            <h3>
                                AI Analysis
                            </h3>

                            <p>
                                Get personalized insights
                                about your strengths.
                            </p>

                            <button
                                onClick={onAnalysis}
                            >
                                Analyze Me →
                            </button>

                        </div>


                        <div className="action-card">

                            <div className="action-icon">
                                🎯
                            </div>

                            <h3>
                                Career Recommendation
                            </h3>

                            <p>
                                Discover careers that match
                                your skills and interests.
                            </p>

                            <button
                                onClick={onCareerRecommendation}
                            >
                                Explore Careers →
                            </button>

                        </div>


                        <div className="action-card">

                            <div className="action-icon">
                                🗺️
                            </div>

                            <h3>
                                Learning Roadmap
                            </h3>

                            <p>
                                Get a personalized roadmap
                                for your career goal.
                            </p>

                            <button
                                onClick={onRoadmap}
                            >
                                View Roadmap →
                            </button>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;