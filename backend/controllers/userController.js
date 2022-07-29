const { create } = require("../models/userModel");
const Users = require("../models/userModel");
const mongoose = require("mongoose");

// Login User
const loginUser = async (req, res) => {
    res.json({
        msg: "login user",
    });
};

// Register User
const registerUser = async (req, res) => {
    res.json({
        msg: "register user",
    });
};

// Get a single user
const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "User not found" });
    }
    const user = await Users.findById(id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
};

// Get all users
const getUsers = async (req, res) => {
    const users = await Users.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
};

// Create a new User
const createUser = async (req, res) => {
    const reqBody = req.body;

    try {
        const user = await Users.create(reqBody);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a User
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "User not found" });
    }
    const user = await Users.findByIdAndDelete({ _id: id });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
};

// Update a User
const updateUser = async (req, res) => {
    const { id } = req.params;
    const reqBody = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "User not found" });
    }
    const user = await Users.findOneAndUpdate({ _id: id }, { ...reqBody });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
};

module.exports = {
    loginUser,
    registerUser,
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
};
