require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const morgan = require("morgan");
const userRoutes = require("./routes/user");

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(morgan("combined"));

// routes
app.use("/api", userRoutes);

// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, (err) => {
            if (err) console.log(err);
            else console.log("listening on port", process.env.PORT);
        });
    })
    .catch((error) => console.log(error));
