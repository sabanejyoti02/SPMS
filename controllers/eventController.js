const { addEventToDB, updateEventInDB, deleteEventFromDB, getAllEventsFromDB, getEventOfStudentFromDB } = require('../models/eventModel');
const { getAuth } = require('firebase/auth');

const addEvent = async (req, res) => {
    try {
        const event = {};
        for (const key in req.body) {
            event[String(key)] = req.body[key];
        }
       
        const result = await addEventToDB(event.eventid, event);
        const successRes = {
            success: true,
            message: "Event Added Successfully!",
            data: event
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

const updateEvent = async (req, res) => {
    try {
        const event = {};
        for (const key in req.body) {
            event[String(key)] = req.body[key];
        }

        const result = await updateEventInDB(event.eventid, event);
        const successRes = {
            success: true,
            message: "Event updated Successfully!",
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

const deleteEvent = async(req, res) => {
    try {
        const { eventid } = req.body;
        console.log(typeof(eventid));
        const result = await deleteEventFromDB(eventid);
        const successRes = {
            success: true,
            message: "Event deleted Successfully!",
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

const getAllEvents = async(req, res) => {
    try {       
        const result = await getAllEventsFromDB();
        const successRes = {
            success: true,
            message: "All events got Successfully!",
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

const getEventOfStudent = async(req, res) => {
    try {
        const studentemail = req.body;       
        const result = await getEventOfStudentFromDB(studentemail);

        if (!result) {
            return res.status(500).json({
                error: "Internal Server Error",
                details: "Error while getting events from database"
            });
        }

        const successRes = {
            success: true,
            message: "Event got Successfully!",
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

module.exports = { addEvent, getAllEvents, updateEvent, deleteEvent, getEventOfStudent};
