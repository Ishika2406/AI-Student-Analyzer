import { useState } from "react";
import "../App.css";

function Login({ onBack, onRegister, onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        try {

            const response = await fetch(
                "https://ai-student-analyzer-9hms.onrender.com/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim().toLowerCase(),
                        password
                    })
                }
            );

            const data = await response.json();

            console.log("LOGIN STATUS:", response.status);
            console.log("LOGIN RESPONSE:", data);

            if (!response.ok) {
                alert(data.message || "Login failed.");
                return;
            }

            localStorage.setItem(
                "student",
                JSON.stringify(data.student)
            );

            alert(
                `Welcome back, ${data.student.name}!`
            );

            onLogin();

        } catch (error) {

            console.error("LOGIN FETCH ERROR:", error);

            alert(
                "Backend connection error: " +
                error.message
            );
        }
    };

    return (
        <div className="login-page">

            <button
                className="back-btn"
                onClick={onBack}
            >
                ← Back to Home
            </button>

            <div className="login-card">

                <div className="logo login-logo">

                    <div className="logo-icon">
                        AI
                    </div>

                    <span>
                        Student
                        <span className="logo-highlight">
                            Analyzer
                        </span>
                    </span>

                </div>

                <h1>Welcome Back</h1>

                <p className="login-subtitle">
                    Sign in to continue your personalized student journey.
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <label>Password</label>

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="primary-btn login-submit"
                    >
                        Login →
                    </button>

                </form>

                <p className="signup-text">
                    Don't have an account?

                    <button
                        type="button"
                        className="create-account-btn"
                        onClick={onRegister}
                    >
                        Create one
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Login;