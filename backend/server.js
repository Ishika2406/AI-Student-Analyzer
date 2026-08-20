const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());


// ================= REGISTER =================

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, course } = req.body;

        if (!name || !email || !password || !course) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const student = new Student({
            name,
            email,
            password,
            course
        });

        await student.save();

        res.status(201).json({
            message: "Registration successful",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                course: student.course
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        console.log("LOGIN REQUEST:", email);

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const student = await Student.findOne({ email });

        console.log(
            "STUDENT FOUND:",
            student ? student.email : "NO"
        );

        if (!student) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (student.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        console.log("LOGIN SUCCESS:", student.email);

        return res.status(200).json({
            message: "Login successful",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                course: student.course || ""
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// ================= ACADEMIC PROFILE =================

app.put("/api/profile/:email", async (req, res) => {
    try {
        const { email } = req.params;

        const {
            semester,
            cgpa,
            attendance,
            skills,
            interests,
            projects
        } = req.body;

        if (!semester || !cgpa || !attendance || !skills || !interests) {
            return res.status(400).json({
                message: "All required fields are needed"
            });
        }

        const student = await Student.findOneAndUpdate(
            { email },
            {
                academicProfile: {
                    semester,
                    cgpa,
                    attendance,
                    skills,
                    interests,
                    projects: projects || ""
                }
            },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Academic profile saved successfully",
            academicProfile: student.academicProfile
        });

    } catch (error) {
        console.error("Profile error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});
// ================= GET ACADEMIC PROFILE =================

app.get("/api/profile/:email", async (req, res) => {
    try {
        const { email } = req.params;

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            academicProfile: student.academicProfile
        });

    } catch (error) {
        console.error("Get profile error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
    res.json({
        message: "Student Analyzer Backend is running 🚀"
    });
});


// ================= MONGODB =================

mongoose
    .connect(process.env.MONGO_URI, {
        tls: true,
        serverSelectionTimeoutMS: 10000
    })
    .then(() => {
        console.log("MongoDB connected successfully 🚀");
    })
    .catch((error) => {
        console.error(
            "MongoDB connection failed:",
            error.message
        );
    });


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});