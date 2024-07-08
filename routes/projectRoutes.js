const express = require("express");
const {addProject, getAllProjects, getProjectsOfStudent, updateProject, deleteProject } = require("../controllers/projectController");
const {extractToken} = require("../auth/authMiddleware");
const router = express.Router();

router.get("/",extractToken, getAllProjects);
router.get("/get",extractToken, getProjectsOfStudent);
router.post("/add",extractToken, addProject);
router.post("/update",extractToken, updateProject);
router.post("/delete",extractToken, deleteProject);

module.exports = router;