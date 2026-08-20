import { useEffect, useState } from "react";
import "../App.css";
import CareerRoadmap from "./CareerRoadmap";
function Analysis({ onBack }) {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const student = JSON.parse(
                    localStorage.getItem("student")
                );

                if (!student?.email) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `http://localhost:5000/api/profile/${student.email}`
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

                console.error(
                    "Analysis profile fetch error:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        loadProfile();

    }, []);

    if (loading) {
        return (
            <div className="profile-page">
                <h2>Loading your AI analysis... 🤖</h2>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="profile-page">
                <h2>No academic profile found.</h2>

                <button className="primary-btn" onClick={onBack}>
                    ← Back
                </button>
            </div>
        );
    }

    const cgpa = Number(profile.cgpa);
    const attendance = Number(profile.attendance);

    // ---------------- PERFORMANCE SCORE ----------------

    const academicScore = (cgpa / 10) * 60;
    const attendanceScore = attendance * 0.4;

    const performanceScore = Math.min(
        100,
        Math.round(academicScore + attendanceScore)
    );

    // ---------------- SKILLS SCORE ----------------

    const skills = profile.skills
        .toLowerCase()
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

    const skillsScore = Math.min(
        100,
        50 + skills.length * 10
    );

    // ---------------- PROJECT SCORE ----------------

    const projectScore =
        profile.projects.trim() !== "" ? 85 : 50;

    // ---------------- ACADEMIC SCORE ----------------

    const academicPercentage = Math.min(
        100,
        Math.round((cgpa / 10) * 100)
    );
    // ---------------- CAREER RECOMMENDATION ----------------

    const interests = profile.interests.toLowerCase();
    const skillText = profile.skills.toLowerCase();

    let career = "Software Developer";

    if (
        interests.includes("ai") ||
        interests.includes("machine learning") ||
        interests.includes("ml")
    ) {
        career = "AI / ML Engineer";
    }
    else if (
        interests.includes("data") ||
        interests.includes("analytics")
    ) {
        career = "Data Scientist";
    }
    else if (
        interests.includes("web") ||
        interests.includes("frontend") ||
        interests.includes("backend")
    ) {
        career = "Full Stack Developer";
    }
    else if (
        interests.includes("cyber") ||
        interests.includes("security")
    ) {
        career = "Cybersecurity Engineer";
    }

    // ---------------- SKILL GAP ----------------

    let requiredSkills = [];

    if (career === "AI / ML Engineer") {
        requiredSkills = [
            "Python",
            "NumPy",
            "Pandas",
            "Machine Learning",
            "Deep Learning",
            "TensorFlow / PyTorch"
        ];
    }
    else if (career === "Data Scientist") {
        requiredSkills = [
            "Python",
            "SQL",
            "Pandas",
            "Statistics",
            "Data Visualization",
            "Machine Learning"
        ];
    }
    else if (career === "Full Stack Developer") {
        requiredSkills = [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Database / SQL"
        ];
    }
    else if (career === "Cybersecurity Engineer") {
        requiredSkills = [
            "Networking",
            "Linux",
            "Python",
            "Cybersecurity",
            "Ethical Hacking",
            "Security Tools"
        ];
    }
    else {
        requiredSkills = [
            "C++",
            "Java",
            "Python",
            "Data Structures",
            "Algorithms",
            "Git / GitHub"
        ];
    }

    const skillGaps = requiredSkills.filter(
        (skill) => !skillText.includes(skill.toLowerCase())
    );

    // ---------------- STRENGTHS ----------------

    const strengths = [];

    if (cgpa >= 8) {
        strengths.push("Strong academic performance");
    }

    if (attendance >= 85) {
        strengths.push("Good attendance and consistency");
    }

    if (skills.length >= 3) {
        strengths.push("Good technical skill diversity");
    }

    if (profile.projects.trim() !== "") {
        strengths.push("Practical project experience");
    }

    if (strengths.length === 0) {
        strengths.push("Good potential for improvement");
    }

    // ---------------- IMPROVEMENTS ----------------

    const improvements = [];

    if (cgpa < 7.5) {
        improvements.push("Improve academic performance");
    }

    if (attendance < 75) {
        improvements.push("Improve attendance");
    }

    if (skills.length < 3) {
        improvements.push("Learn more technical skills");
    }

    if (!profile.projects.trim()) {
        improvements.push("Build more practical projects");
    }

    if (improvements.length === 0) {
        improvements.push("Continue building advanced skills");
    }

    // ---------------- CAREER RECOMMENDATION ----------------



    if (
        interests.includes("ai") ||
        interests.includes("machine learning") ||
        interests.includes("ml")
    ) {
        career = "AI / ML Engineer";
    } else if (
        interests.includes("data") ||
        interests.includes("analytics")
    ) {
        career = "Data Scientist";
    } else if (
        interests.includes("web") ||
        interests.includes("frontend") ||
        interests.includes("backend")
    ) {
        career = "Full Stack Developer";
    } else if (
        interests.includes("cyber") ||
        interests.includes("security")
    ) {
        career = "Cybersecurity Engineer";
    }

    // ---------------- AI INSIGHT ----------------

    let insight = "";

    if (performanceScore >= 85) {
        insight =
            "Excellent performance! You are showing strong academic consistency and good potential for a technology career.";
    } else if (performanceScore >= 70) {
        insight =
            "You are performing well. With consistent skill development and practical projects, you can significantly strengthen your career profile.";
    } else {
        insight =
            "You have good potential, but improving your academics, attendance and practical skills will help you become more career-ready.";
    }

    // ---------------- PERFORMANCE BAR ----------------

    const PerformanceBar = ({ label, icon, score }) => {
        return (
            <div className="performance-item">

                <div className="performance-header">
                    <span>
                        {icon} {label}
                    </span>

                    <strong>{score}%</strong>
                </div>

                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{ width: `${score}%` }}
                    ></div>
                </div>

            </div>
        );
    };

    return (
        <div className="profile-page">

            <button
                className="back-btn"
                onClick={onBack}
            >
                ← Back to Dashboard
            </button>

            <div className="profile-card">

                <span className="dashboard-label">
                    🤖 AI ANALYSIS
                </span>

                <h1>Your Performance Analysis</h1>

                <p className="profile-subtitle">
                    Here's what our system found from your academic profile.
                </p>

                {/* OVERALL SCORE */}

                <div className="score-card">
                    <div>
                        <small>OVERALL PERFORMANCE</small>

                        <h2>
                            {performanceScore}%
                        </h2>

                        <p>
                            Based on your academic performance and
                            attendance.
                        </p>
                    </div>
                </div>

                {/* PERFORMANCE BREAKDOWN */}

                <h3>📊 Performance Breakdown</h3>

                <div className="performance-breakdown">

                    <PerformanceBar
                        icon="📚"
                        label="Academic Performance"
                        score={academicPercentage}
                    />

                    <PerformanceBar
                        icon="📅"
                        label="Attendance"
                        score={attendance}
                    />

                    <PerformanceBar
                        icon="🧠"
                        label="Technical Skills"
                        score={skillsScore}
                    />

                    <PerformanceBar
                        icon="🚀"
                        label="Project Experience"
                        score={projectScore}
                    />

                </div>

                {/* AI INSIGHT */}

                <div className="career-card">

                    <div>

                        <small>
                            🤖 AI INSIGHT
                        </small>

                        <p>
                            {insight}
                        </p>

                    </div>

                </div>

                {/* PROFILE SUMMARY */}

                <div className="analysis-grid">

                    <div className="analysis-info-card">
                        <h3>📚 Academic Performance</h3>

                        <p><strong>Semester:</strong> {profile.semester}</p>
                        <p><strong>CGPA:</strong> {profile.cgpa}</p>
                        <p><strong>Attendance:</strong> {profile.attendance}%</p>
                    </div>

                    <div className="analysis-info-card">
                        <h3>🧠 Skills & Interests</h3>

                        <p><strong>Skills:</strong> {profile.skills}</p>
                        <p><strong>Interests:</strong> {profile.interests}</p>
                    </div>

                    <div className="analysis-info-card project-info">
                        <h3>🚀 Project Experience</h3>

                        <p>
                            {profile.projects ||
                                "No projects added yet."}
                        </p>
                    </div>

                </div>

                {/* STRENGTHS & IMPROVEMENTS */}

                <div className="analysis-grid">

                    <div className="analysis-info-card strengths-card">
                        <h3>💪 Your Strengths</h3>

                        {strengths.map((strength, index) => (
                            <p key={index}>
                                ✅ {strength}
                            </p>
                        ))}
                    </div>

                    <div className="analysis-info-card improvement-card">
                        <h3>📈 Areas to Improve</h3>

                        {improvements.map((item, index) => (
                            <p key={index}>
                                🔹 {item}
                            </p>
                        ))}
                    </div>

                </div>
                <h3>🧠 Skill Gap Analysis</h3>

                <div className="skill-gap-card">

                    <p>
                        <strong>🎯 Target Career:</strong>{" "}
                        {career}
                    </p>

                    {skillGaps.length > 0 ? (
                        <>
                            <p>
                                Skills you should develop:
                            </p>

                            <div className="skill-gap-list">
                                {skillGaps.map((skill, index) => (
                                    <span key={index}>
                                        + {skill}
                                    </span>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="skill-complete">
                            🎉 Excellent! You already have
                            the key skills for this career.
                        </p>
                    )}

                </div>


                {/* CAREER */}

                <div className="career-card">

                    <div>

                        <small>
                            🎯 AI RECOMMENDED CAREER
                        </small>

                        <h3>
                            {career}
                        </h3>

                        <p>
                            Based on your interests, skills
                            and academic performance.
                        </p>

                    </div>

                    <div className="match">
                        {performanceScore}%
                    </div>

                </div>
                <CareerRoadmap career={career}
                    onBack={onBack}
                />

            </div>
        </div>

    );
}

export default Analysis;