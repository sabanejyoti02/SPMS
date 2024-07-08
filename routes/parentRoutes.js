const express = require("express");
const {getAllParents,getParent, addParent, updateParent} = require("../controllers/parentController")
const router = express.Router();

router.get("/",getAllParents);
router.get("/:parentphone",getParent);

router.post("/add",addParent);
router.post("/update",updateParent);

module.exports = router;