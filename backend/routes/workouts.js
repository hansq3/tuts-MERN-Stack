const express = require("express");
const router = express.Router();

// GET all workouts
router.get("/", (req, res) => {
    res.json({
        msg: "GET all workouts",
    });
});

// GET a single workouts
router.get("/:id", (req, res) => {
    res.json({
        msg: "GET a single workout",
    });
});

// POST a new workouts
router.post("/", (req, res) => {
    res.json({
        msg: "POST a new workout",
    });
});

// DELETE a  workouts
router.delete("/:id", (req, res) => {
    res.json({
        msg: "DELETE a workout",
    });
});

// UPDATE a new workouts
router.patch("/:id", (req, res) => {
    res.json({
        msg: "UPDATE a workout",
    });
});

module.exports = router;
