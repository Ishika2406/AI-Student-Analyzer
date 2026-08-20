const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        course: {
            type: String,
            default: ""
        },

        academicProfile: {
            semester: {
                type: String,
                default: ""
            },

            cgpa: {
                type: Number,
                default: 0
            },

            attendance: {
                type: Number,
                default: 0
            },

            skills: {
                type: String,
                default: ""
            },

            interests: {
                type: String,
                default: ""
            },

            projects: {
                type: String,
                default: ""
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Student", studentSchema);