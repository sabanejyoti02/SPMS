const express = require("express");
const {getAllMentors,getMentor,getMentorMentees,addMentor, updateMentor} = require("../controllers/mentorController");
const {extractToken} = require("../auth/authMiddleware");
const router = express.Router();

router.get("/",extractToken,getAllMentors);
router.get("/:MentorID",extractToken, getMentor);
router.get("/:MentorID/mentees",extractToken, getMentorMentees);

router.post("/add",extractToken,addMentor);
router.post("/update",extractToken,updateMentor);
module.exports = router;