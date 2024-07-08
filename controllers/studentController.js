const {
    getAllStudentsFromDB,
    getStudentFromDB,
    addStudentToDB,
    updateStudentInDB
} = require("../models/studentModel");

const getAllStudents = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        //console.log(req.token);
        const students = await getAllStudentsFromDB();
        if (!students) {
            const reply = { "error": { "code": 404, "message": "No student resource found" } }
            return res.status(404).json(reply);
        }
        return res.status(200).json({ "success": true, "data": students });
    } catch (error) {
        console.log(error);
        /*
        if(error.code === ""){
            const reply = { "error": { "code": 401, "message": "Not authorized" } }  
            return res.status(401).json(reply);  
        }
        */
        const reply = { "error": { "code": 500, "message": "Internal server error" } }
        return res.status(500).json(reply);
    }
}

const getStudent = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const { prn } = req.params;
        const studentInfo = await getStudentFromDB(prn);
        if (!studentInfo) {
            var reply = { "error": { "code": 404, "message": "Student resource not found" } }
            return res.status(404).json(reply);
        }
        return res.status(200).json({ "success": true, "data": studentInfo });
    } catch (error) {
        //console.log(error.code);
        if(error.code === "permission-denied"){
            var reply = { "error": { "code": 403, "message": "Access Denied !" } }
            return res.status(500).json(reply);
        }
        var reply = { "error": { "code": 500, "message": "Internal server error" } }
        return res.status(500).json(reply);
    }
}

const addStudent = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const student = {};
        for (const key in req.body) {
            student[String(key)] = req.body[key];
        }
        //console.log(student);
        const re = await addStudentToDB(student);
        //console.log(re);
        var reply = { "success": true, "Message": "Student data added successfully", "data": student };
        res.status(200).json(reply);
    } catch (error) {
        console.log(error);
        var reply = { "error": { "code": 500, "message": "Internal server error" } };
        res.status(500).json(reply)
    }
}

const updateStudent = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const student = {};
        for (const key in req.body) {
            student[String(key)] = req.body[key];
        }
        // console.log(student);
        const re = await updateStudentInDB(student.prn, student);
        console.log(re);
        var reply = { "success": true, "Message": "Student data updated successfully", "data": student };
        res.status(200).json(reply)
    } catch (error) {
        console.log(error);
        var reply = { "error": { "code": 500, "message": "Internal server error" } };
        res.status(500).json(reply)
    }
}

module.exports = { getAllStudents, getStudent, addStudent, updateStudent }
