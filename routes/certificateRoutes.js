const express = require("express");
const {addCertificate, getCertificatesOfStudent, getAllCertificates, updateCertificate, deleteCertificate, approveCertificateStatusOfStudent} = require("../controllers/certificateController");
const {extractToken} = require("../auth/authMiddleware");
const router = express.Router();

router.get("/", getAllCertificates);
router.get("/get", extractToken, getCertificatesOfStudent);
router.post("/add", extractToken, addCertificate);
router.post("/update", extractToken, updateCertificate);
router.post("/delete", extractToken, deleteCertificate);
router.post("/approve", extractToken, approveCertificateStatusOfStudent);

module.exports = router;