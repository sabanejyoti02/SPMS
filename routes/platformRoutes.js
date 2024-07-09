const express = require("express");
const {addPlatform, getAllPlatforms, updatePlatform, deletePlatform } = require("../controllers/platformController");
const {extractToken} = require("../auth/authMiddleware");
const router = express.Router();

router.get("/",extractToken, getAllPlatforms);
router.post("/add",extractToken, addPlatform);
router.post("/update",extractToken, updatePlatform);
router.post("/delete",extractToken, deletePlatform);

module.exports = router;