const { response } = require("express");
const express = require("express");
const router = express.Router();
const {
    loginUser,
    registerUser,
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
} = require("../controllers/userController");

// Login user
router.post("/login", loginUser);

// Register user
router.post("/register", registerUser);

// GET all user
router.get("/", getUsers);

// GET a single user
router.get("/:id", getUser);

// POST a new user (register)
router.post("/create", createUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a new user
router.patch("/:id", updateUser);

module.exports = router;
