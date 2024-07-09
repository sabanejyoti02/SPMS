// app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const studentRoutes = require("./routes/studentRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const parentRoutes = require("./routes/parentRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const projectRoutes = require("./routes/projectRoutes");
const platformRoutes = require("./routes/platformRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoute = require("./auth/authRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/mentors', mentorRoutes);
app.use('/api/v1/parents', parentRoutes);
app.use('/api/v1/certificates', certificateRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/platforms', platformRoutes);
app.use('/api/v1/events', eventRoutes);
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
    res.status(200).send(`
        <h1>Homepage</h1>
        <h2>Get Requests</h2>
        <ul>
            <li>
                <a href="/api/v1/students">Get All Students</a>
            </li>
            <li>
                <a href="/api/v1/mentors">Get All Mentors</a>
            </li>
            <li>
                <a href="/api/v1/students/1">Get Specific Student</a>
            </li>
            <li>
                <a href="/api/v1/mentors/1">Get Specific Mentor</a>
            </li>
            <li>
                <a href="/api/v1/mentors/1/mentees">Get Mentees of Specific Mentor</a>
            </li>
            <li>
                <a href="/api/v1/parents">Get all Parents</a>
            </li>
        </ul>
        <h2>Post Requests</h2>
        <ul>
            <li>
                <a href="/studentform.html" target="_blank">Post (Add) Student Entry</a>
            </li>
            <li>
                <a href="/mentorform.html" target="_blank">Post (Add) Mentor Entry</a>
            </li>
            <li>
                <a href="/signup.html" target="_blank">Signup</a>
            </li>
            <li>
                <a href="/login.html" target="_blank">Login</a>
            </li>
        </ul>
    `);
});

app.get("*", (req, res) => {
    res.status(404).send("<h1>Error 404 ! Webpage not found !</h1>");
});

module.exports = app;
