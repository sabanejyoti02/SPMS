const { addPlatformToDB, updatePlatformInDB, deletePlatformFromDB, getAllPlatformsFromDB } = require('../models/platformModel');
const { getAuth } = require('firebase/auth');

const addPlatform = async (req, res) => {
    try {
        const platform = {};
        for (const key in req.body) {
            platform[String(key)] = req.body[key];
        }
       
        const result = await addPlatformToDB(platform.platformid, platform);
        const successRes = {
            success: true,
            message: "Platform Added Successfully!",
            data: platform
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

const updatePlatform = async (req, res) => {
    try {
        const platform = {};
        for (const key in req.body) {
            platform[String(key)] = req.body[key];
        }

        const result = await updatePlatformInDB(platform.platformid, platform);
        const successRes = {
            success: true,
            message: "Platform updated Successfully!",
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

const deletePlatform = async(req, res) => {
    try {
        const { platformid } = req.body;
        console.log(typeof(platformid));
        const result = await deletePlatformFromDB(platformid);
        const successRes = {
            success: true,
            message: "Platform deleted Successfully!",
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

const getAllPlatforms = async(req, res) => {
    try {       
        const result = await getAllPlatformsFromDB();
        const successRes = {
            success: true,
            message: "All platforms got Successfully!",
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

module.exports = { addPlatform, getAllPlatforms, updatePlatform, deletePlatform};
