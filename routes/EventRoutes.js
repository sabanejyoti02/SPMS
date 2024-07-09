const express = require("express");
const {addEvent, getAllEvents, updateEvent, deleteEvent, getEventOfStudent} = require("../controllers/eventController");
const {extractToken} = require("../auth/authMiddleware");
const router = express.Router();

router.get("/",extractToken, getAllEvents);
router.post("/add",extractToken, addEvent);
router.post("/update",extractToken, updateEvent);
router.post("/delete",extractToken, deleteEvent);

module.exports = router;