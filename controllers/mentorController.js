const {
    getAllMentorsFromDB,
    getMentorFromDB,
    getMentorMenteesFromDB,
    addMentorToDB,
    updateMentorInDB
} = require("../models/mentorModel");

const getAllMentors = async (req, res) => {
    res.setHeader('Content-Type', "application/json");
    try {
        const mentors = await getAllMentorsFromDB();
        if (!mentors) {
            const reply = {
                "error": {
                    "code": 404,
                    "message": "No mentors found"
                }
            };
            return res.status(404).send(reply);
        }
        const successRes = {
            "success": true,
            "message": "All Mentor Data",
            "data": mentors
        };
        return res.status(200).send(successRes);
    } catch (error) {
        console.log(error);
        const errorRes = {
            "error": {
                "code": 500,
                "message": "Internal server error"
            }
        };
        return res.status(500).send(errorRes);
    }
}

const getMentor = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const { MentorID } = req.params;
        const mentor = await getMentorFromDB(MentorID);
        if (!mentor) {
            const reply = {
                "error": {
                    "code": 404,
                    "message": "Mentor Resource Not found"
                }
            };
            return res.status(404).send(reply);
        }
        const successRes = {
            "success": true,
            "message": "Mentor Data",
            "data": mentor
        };
        return res.status(200).send(successRes);
    } catch (error) {
        console.log(error);
        const reply = {
            "error": {
                "code": 500,
                "message": "Internal Server Error"
            }
        };
        return res.status(500).send(reply);
    }
}

const getMentorMentees = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const { MentorID } = req.params;
        const mentor = await getMentorFromDB(MentorID);
        if (!mentor) {
            const reply = {
                "error": {
                    "code": 404,
                    "message": "Mentor Resource Not Found"
                }
            };
            return res.status(404).send(reply);
        }
        const mentees = await getMentorMenteesFromDB(MentorID);
        if (!mentees) {
            const reply = {
                "error": {
                    "code": 404,
                    "message": "Mentor does not have Mentees!"
                }
            };
            return res.status(404).send(reply);
        }
        const successRes = {
            "success": true,
            "message": "Mentor Mentees Data",
            "data": { mentor, mentees }
        };
        return res.status(200).send(successRes);
    } catch (error) {
        console.log(error);
        const reply = {
            "error": {
                "code": 500,
                "message": "Internal Server Error"
            }
        };
        return res.status(500).send(reply);
    }
}

const addMentor = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const mentor = {};
        for (const key in req.body) {
            if (key === "mentees[]") {
                mentor["mentees"] = req.body[key];
                continue;
            }
            mentor[key] = req.body[key];
        }
        const res2 = await addMentorToDB(mentor);
        if (!res2) {
            return res.status(404).send("<h4>Mentees with specified prns do not exist</h4>");
        }
        const successRes = {
            "success": true,
            "message": "Mentor Added Successfully!",
            "data": mentor
        };
        return res.status(200).send(successRes);
    } catch (error) {
        console.log(error);
        const reply = {
            "error": {
                "code": 500,
                "message": "Internal Server Error"
            }
        };
        return res.status(500).send(reply);
    }
}

const updateMentor = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const mentor = {};
        for (const key in req.body) {
            if (key === "mentees[]") {
                mentor["mentees"] = req.body[key];
                continue;
            }
            mentor[key] = req.body[key];
        }
        if (!mentor.mentorid) {
            return res.status(400).send({
                "error": {
                    "code": 400,
                    "message": "Mentor ID is required"
                }
            });
        }
        const res2 = await updateMentorInDB(mentor.mentorid, mentor);
        if (!res2) {
            return res.status(404).send("<h4>Mentor not found or mentees with specified prns do not exist</h4>");
        }
        const successRes = {
            "success": true,
            "message": "Mentor Updated Successfully!",
            "data": mentor
        };
        return res.status(200).send(successRes);
    } catch (error) {
        console.log(error);
        const reply = {
            "error": {
                "code": 500,
                "message": "Internal Server Error"
            }
        };
        return res.status(500).send(reply);
    }
}

module.exports = { getAllMentors, getMentor, getMentorMentees, addMentor, updateMentor };
