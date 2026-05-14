const express = require("express");

const router = express.Router();

const {
    addSchool,
    listSchools
} = require("../controllers/schoolController");


// POST API
router.post("/addSchool", addSchool);


// GET API
router.get("/listSchools", listSchools);


module.exports = router;