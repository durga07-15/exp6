const express = require("express");
const app = express();
const PORT = 3000;

const studentRoutes = require("./routes/students");

// Middleware: parse JSON request body
app.use(express.json());

// Middleware: log every request
app.use(function (req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

// Homepage
app.get("/", function (req, res) {
    res.send("Student Management API is running. Try /students");
});

// Use the students router for all /students routes
app.use("/students", studentRoutes);

// Task 2: Invalid Routes error handling (runs if no route above matched)
app.use(function (req, res) {
    res.status(404).json({ message: "Invalid Route" });
});

app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
