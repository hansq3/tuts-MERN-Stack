const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled in");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }
    return user;
};

// static register method
userSchema.statics.register = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled in");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use");
    }

    const passSalt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, passSalt);

    const user = await this.create({ email, password: passHash });
    return user;
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
