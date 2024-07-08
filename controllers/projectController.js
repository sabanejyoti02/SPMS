const { addProjectToDB, updateProjectInDB, deleteProjectFromDB, getAllProjectsFromDB, getProjectsOfStudentFromDB } = require('../models/projectModel');
const { getAuth } = require('firebase/auth');

const addProject = async (req, res) => {
    try {
        const project = {};
        for (const key in req.body) {
            project[String(key)] = req.body[key];
        }
       
        const result = await addProjectToDB(project.projectid, project);
        const successRes = {
            success: true,
            message: "Project Added Successfully!",
            data: project
        };
        return res.status(200).json(successRes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = {};
        for (const key in req.body) {
            project[String(key)] = req.body[key];
        }

        const result = await updateProjectInDB(project.projectid, project);
        const successRes = {
            success: true,
            message: "Project updated Successfully!",
            // data: project
        };
        return res.status(200).json(successRes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
};

const deleteProject = async(req, res) => {
    try {
        const { projectid } = req.body;
        console.log(typeof(projectid));
        const result = await deleteProjectFromDB(projectid);
        const successRes = {
            success: true,
            message: "Prpject deleted Successfully!",
        };
        return res.status(200).json(successRes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
};

const getAllProjects = async(req, res) => {
    try {       
        const result = await getAllProjectsFromDB();
        const successRes = {
            success: true,
            message: "All projects got Successfully!",
            Data: result
        };
        return res.status(200).json(successRes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
}

const getProjectsOfStudent = async(req, res) => {
    try {
        const studentemail = req.body;       
        const result = await getProjectsOfStudentFromDB(studentemail);
        const successRes = {
            success: true,
            message: "project got Successfully!",
            data: studentemail
        };
        return res.status(200).json(successRes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }  
};


module.exports = { addProject, getAllProjects, getProjectsOfStudent, updateProject, deleteProject};
