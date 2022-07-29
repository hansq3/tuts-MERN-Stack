const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true,
        },

        password: {
            type: String,
            require: true,
        },

        avatar: {
            type: String,
        },

        isAdmin: {
            type: String,
            default: false,
        },
    },
    { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
