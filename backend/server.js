require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const workoutRoutes = require("./routes/workouts");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api", workoutRoutes);
// app.get("/", (req, res) => {
//     res.json({
//         msg: "Welcome to the app!",
//     });
// });

// Listen for requests
app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    else console.log("listening on port", process.env.PORT);
});
