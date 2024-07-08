const express = require("express");
const {getAllStudents,getStudent,addStudent, updateStudent} = require("../controllers/studentController");

const {extractToken} = require("../auth/authMiddleware");
const router = express.Router();


router.get("/",extractToken,getAllStudents);
router.get("/:prn",extractToken,getStudent);

router.post("/add",extractToken,addStudent)
router.post("/update",extractToken,updateStudent)

module.exports = router;