import FaceRegister from "./FaceRegister";
import { useState } from "react";
import "../App.css";

function Register({ onBack, onRegister }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !course) {
            alert("Please fill all the fields.");
            return;
        }

        try {
            const response = await fetch("https://ai-student-analyzer-9hms.onrender.com/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    course,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Registration failed.");
                return;
            }

            const student = {
                name,
                email,
                course,
            };

            localStorage.setItem("student", JSON.stringify(student));

            alert("Registration successful! Welcome to StudentAnalyzer.");

            onRegister();

        } catch (error) {
            console.error("Registration error:", error);
            alert("Unable to connect to the backend.");
        }
    };

    return (
        <div className="login-page">

            <button className="back-btn" onClick={onBack}>
                ← Back to Home
            </button>

            <div className="login-card">

                <div className="logo login-logo">
                    <div className="logo-icon">AI</div>

                    <span>
                        Student<span className="logo-highlight">Analyzer</span>
                    </span>
                </div>

                <h1>Create Your Profile</h1>

                <p className="login-subtitle">
                    Tell us about yourself to get personalized AI insights.
                </p>

                <form onSubmit={handleRegister}>

                    <label>Full Name</label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <label>Password</label>

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <label>Course</label>

                    <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    >
                        <option value="">Select your course</option>
                        <option value="B.Tech CSE">B.Tech CSE</option>
                        <option value="B.Tech CSE AI">B.Tech CSE AI</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="Other">Other</option>
                    </select>

                    <button
                        type="submit"
                        className="primary-btn login-submit"
                    >
                        Create Account →
                    </button>

                </form>

                <p className="signup-text">
                    Already have an account?
                    <span onClick={onBack}> Login</span>
                </p>
                <FaceRegister />
            </div>
        </div>
    );
}

export default Register;