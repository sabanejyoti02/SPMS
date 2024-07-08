const express = require("express");
const router = express.Router();
const {signupUser,loginUser, logoutUser} = require("./authController");


//after -  /api/v1/auth
router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
//router.post("/login",login);

module.exports = router;