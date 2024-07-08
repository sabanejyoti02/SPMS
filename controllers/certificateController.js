const { addCertificateToDB, getCertificatesOfStudentFromDB, getAllCertificatesFromDB, updateCertificateInDB, deleteCertificateFromDB, approveCertificate } = require('../models/certificateModel');
const { getAuth } = require('firebase/auth');

const addCertificate = async (req, res) => {
    try {
        const certficate = {};
        for (const key in req.body) {
            certficate[String(key)] = req.body[key];
        }

        const result = await addCertificateToDB(certficate.certificateid, certficate);
        console.log(result);
        const successRes = {
            success: true,
            message: "Certificate Added Successfully!",
            data: certficate
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

const updateCertificate = async (req, res) => {
    try {
        const certficate = {};
        for (const key in req.body) {
            certficate[String(key)] = req.body[key];
        }

        const result = await updateCertificateInDB(certficate.certificateid, certficate);
        const successRes = {
            success: true,
            message: "Certificate updated Successfully!",
            data: certficate
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

const deleteCertificate = async(req, res) => {
    try {
        const { certificateid } = req.body;

        if (!certificateid) {
            return res.status(400).json({
                error: "Bad Request",
                details: "certificateid is required"
            });
        }
        console.log(typeof(certificateid));
        const result = await deleteCertificateFromDB(certificateid);
        const successRes = {
            success: true,
            message: "Certificate deleted Successfully!",
            // data: updateData
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


const getCertificatesOfStudent = async (req, res) => {
    try {
        const studentemail = req.body;

        if (!studentemail) {
            return res.status(400).json({
                error: "Bad Request",
                details: "studentemail is required"
            });
        }
       
        const result = await getCertificatesOfStudentFromDB(studentemail);

        if (!result) {
            return res.status(500).json({
                error: "Internal Server Error",
                details: "Error while getting certificate from database"
            });
        }

        const successRes = {
            success: true,
            message: "Certificate got Successfully!",
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

const getAllCertificates = async (req, res) => {
    try {       
        const result = await getAllCertificatesFromDB();

        if (!result) {
            return res.status(500).json({
                error: "Internal Server Error",
                details: "Error while getting certificate from database"
            });
        }

        const successRes = {
            success: true,
            message: "All Certificate got Successfully!",
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
};

/*const approveCertificateStatus = async(req, res) => {
    try{
    const approvalData = req.body;
    const result = await approveCertificate(approvalData.certificateid, approvalData.mentoremail, approvalData.status);
    if (!result) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: "Error while approvind certificate from database"
        });
    }

    const successRes = {
        success: true,
        message: "Certificate approved Successfully!",
        Data: result
    };
    return res.status(200).json(successRes);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
};*/

const approveCertificateStatusOfStudent = async (req, res) => {
    try {
        const { certificateid, certficateApprovalStatus } = req.body;
        const updatedCertificateObj = { certificateid, certficateApprovalStatus };

        const result = await updateCertificateInDB(certificateid, updatedCertificateObj);
        const successRes = {
            success: true,
            message: "Certificate updated Successfully!",
            data: updatedCertificateObj
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

module.exports = { addCertificate, getCertificatesOfStudent, getAllCertificates, updateCertificate, deleteCertificate, approveCertificateStatusOfStudent };
