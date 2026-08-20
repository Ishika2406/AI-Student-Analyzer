import { useState } from "react";
import "../App.css";

function AcademicProfile({ onBack, onSave }) {

    const [formData, setFormData] = useState({
        semester: "",
        cgpa: "",
        attendance: "",
        skills: "",
        interests: "",
        projects: ""
    });

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.semester ||
            !formData.cgpa ||
            !formData.attendance ||
            !formData.skills ||
            !formData.interests
        ) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            const student = JSON.parse(
                localStorage.getItem("student")
            );

            if (!student?.email) {
                alert("Please login again.");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/api/profile/${student.email}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Profile saving failed.");
                return;
            }

            // Keep localStorage for the existing Analysis/Dashboard
            localStorage.setItem(
                "academicProfile",
                JSON.stringify(formData)
            );

            alert("Academic profile saved successfully! 🎉");

            onSave();

        } catch (error) {
            console.error("Profile error:", error);
            alert("Unable to connect to the backend.");
        }
    };

    return (
        <div className="profile-page">

            <button className="back-btn" onClick={onBack}>
                ← Back to Dashboard
            </button>

            <div className="profile-card">

                <div className="logo login-logo">
                    <div className="logo-icon">AI</div>

                    <span>
                        Student<span className="logo-highlight">
                            Analyzer
                        </span>
                    </span>
                </div>

                <span className="dashboard-label">
                    ACADEMIC PROFILE
                </span>

                <h1>Tell us about yourself</h1>

                <p className="profile-subtitle">
                    Enter your academic information so our AI can
                    understand your strengths and potential.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Current Semester *</label>

                    <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                    >
                        <option value="">Select semester</option>
                        <option value="1">1st Semester</option>
                        <option value="2">2nd Semester</option>
                        <option value="3">3rd Semester</option>
                        <option value="4">4th Semester</option>
                        <option value="5">5th Semester</option>
                        <option value="6">6th Semester</option>
                        <option value="7">7th Semester</option>
                        <option value="8">8th Semester</option>
                    </select>


                    <label>Current CGPA / Percentage *</label>

                    <input
                        type="number"
                        name="cgpa"
                        placeholder="Example: 8.2"
                        value={formData.cgpa}
                        onChange={handleChange}
                        step="0.01"
                    />


                    <label>Attendance (%) *</label>

                    <input
                        type="number"
                        name="attendance"
                        placeholder="Example: 85"
                        value={formData.attendance}
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />


                    <label>Technical Skills *</label>

                    <input
                        type="text"
                        name="skills"
                        placeholder="Example: C++, Python, Java, SQL"
                        value={formData.skills}
                        onChange={handleChange}
                    />


                    <label>Interests *</label>

                    <input
                        type="text"
                        name="interests"
                        placeholder="Example: AI, Web Development, Data Science"
                        value={formData.interests}
                        onChange={handleChange}
                    />


                    <label>Projects</label>

                    <textarea
                        name="projects"
                        placeholder="Tell us about your projects..."
                        value={formData.projects}
                        onChange={handleChange}
                        rows="4"
                    />


                    <button
                        type="submit"
                        className="primary-btn profile-submit"
                    >
                        Save Academic Profile →
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AcademicProfile;