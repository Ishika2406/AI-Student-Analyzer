function CareerRoadmap({ career, onBack }) {
    const roadmaps = {
        "AI / ML Engineer": [
            "Master Python, NumPy and Pandas",
            "Learn Statistics and Data Visualization",
            "Learn Machine Learning Algorithms",
            "Learn Deep Learning and Neural Networks",
            "Build 2–3 AI/ML Projects",
            "Prepare for AI/ML Internships"
        ],

        "Data Scientist": [
            "Strengthen Python and SQL",
            "Learn Statistics and Probability",
            "Master Pandas and Data Visualization",
            "Learn Machine Learning",
            "Build Data Science Projects",
            "Prepare for Internships"
        ]
    };

    const steps =
        roadmaps[career] || roadmaps["AI / ML Engineer"];

    return (
        <div className="roadmap-card">
            <button
                className="back-btn"
                onClick={onBack}
            >
                ← Back to Dashboard
            </button>
            <div className="roadmap-header">
                <span>🗺️</span>

                <div>
                    <small>AI CAREER ROADMAP</small>
                    <h2>{career}</h2>
                </div>
            </div>

            <p className="roadmap-description">
                Follow these steps to move closer to your career goal.
            </p>

            <div className="roadmap-steps">

                {steps.map((step, index) => (
                    <div
                        className="roadmap-step"
                        key={index}
                    >

                        <div className="step-number">
                            {index + 1}
                        </div>

                        <div className="step-content">
                            <h3>{step}</h3>

                            <p>
                                Complete this step to move closer
                                to your career goal.
                            </p>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default CareerRoadmap;