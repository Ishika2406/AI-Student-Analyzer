import "../App.css";

function CareerRecommendation({ onBack, onRoadmap }) {

    const careers = [
        {
            name: "AI / ML Engineer",
            match: 87,
            icon: "🤖",
            description:
                "Build intelligent systems using machine learning, deep learning and artificial intelligence."
        },
        {
            name: "Data Scientist",
            match: 82,
            icon: "📊",
            description:
                "Analyze data, discover patterns and build predictive models to solve real-world problems."
        },
        {
            name: "Full Stack Developer",
            match: 76,
            icon: "💻",
            description:
                "Build complete web applications using frontend, backend and database technologies."
        },
        {
            name: "Cybersecurity Engineer",
            match: 71,
            icon: "🔐",
            description:
                "Protect systems, networks and applications from security threats and cyber attacks."
        },
        {
            name: "Software Developer",
            match: 68,
            icon: "⚙️",
            description:
                "Design, develop and maintain software applications using programming and problem-solving skills."
        }
    ];

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
                    🎯 AI CAREER RECOMMENDATION
                </span>

                <h1>Career Paths For You</h1>

                <p className="profile-subtitle">
                    Explore career options based on your skills,
                    interests and academic profile.
                </p>

                <div className="career-recommendation-grid">

                    {careers.map((career, index) => (

                        <div
                            className="career-recommendation-card"
                            key={index}
                        >

                            <div className="career-icon">
                                {career.icon}
                            </div>

                            <div>
                                <h2>{career.name}</h2>

                                <span className="career-match">
                                    {career.match}% Match
                                </span>
                            </div>

                            <p>
                                {career.description}
                            </p>

                            <button className="primary-btn"
                                onClick={() => onRoadmap(career.name)}>
                                View Roadmap →
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default CareerRecommendation;