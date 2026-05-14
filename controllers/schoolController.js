const db = require("../config/db");
const calculateDistance = require("../utils/distanceCalculator");


// Add School API
const addSchool = (req, res) => {

    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    if (typeof name !== "string" || typeof address !== "string") {
        return res.status(400).json({
            success: false,
            message: "Name and address must be strings"
        });
    }

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return res.status(400).json({
            success: false,
            message: "Invalid latitude"
        });
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return res.status(400).json({
            success: false,
            message: "Invalid longitude"
        });
    }

    const query = `
        INSERT INTO schools (name, address, latitude, longitude)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [name, address, latitude, longitude],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            return res.status(201).json({
                success: true,
                message: "School added successfully",
                schoolId: result.insertId
            });
        }
    );
};


// List Schools API
const listSchools = (req, res) => {

    const userLatitude = parseFloat(req.query.latitude);
    const userLongitude = parseFloat(req.query.longitude);

    // Validation
    if (isNaN(userLatitude) || isNaN(userLongitude)) {
        return res.status(400).json({
            success: false,
            message: "Valid latitude and longitude are required"
        });
    }

    const query = `SELECT * FROM schools`;

    db.query(query, (err, schools) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        // Add distance to each school
        const schoolsWithDistance = schools.map((school) => {

            const distance = calculateDistance(
                userLatitude,
                userLongitude,
                school.latitude,
                school.longitude
            );

            return {
                ...school,
                distance: Number(distance.toFixed(2))
            };
        });

        // Sort nearest first
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        return res.status(200).json({
            success: true,
            count: schoolsWithDistance.length,
            data: schoolsWithDistance
        });
    });
};

module.exports = {
    addSchool,
    listSchools
};