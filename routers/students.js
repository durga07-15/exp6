const express = require("express");
const router = express.Router();

// In-memory student data
let students = [
    { id: 1, name: "Ravi Kumar", department: "CSE", year: 2, email: "ravi@example.com" },
    { id: 2, name: "Priya Sharma", department: "ECE", year: 3, email: "priya@example.com" }
];

// Simple email format check
function isValidEmail(email) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Validate student input - Task 1
function validateStudent(data) {
    if (!data.name || data.name.trim() === "") {
        return "Student Name cannot be empty";
    }
    if (!data.department || data.department.trim() === "") {
        return "Department cannot be empty";
    }
    if (!data.year || data.year < 1 || data.year > 4) {
        return "Year must be between 1 and 4";
    }
    if (!data.email || !isValidEmail(data.email)) {
        return "A valid email address is required";
    }
    return null; // no errors
}

// GET /students - view all students
router.get("/", function (req, res) {
    res.status(200).json(students);
});

// GET /students/:id - view one student
router.get("/:id", function (req, res) {
    let student = students.find(function (s) {
        return s.id === parseInt(req.params.id);
    });

    // Task 2: Student Not Found error handling
    if (!student) {
        return res.status(404).json({ message: "Student Not Found" });
    }
    res.status(200).json(student);
});

// POST /students - create a student
router.post("/", function (req, res) {
    let error = validateStudent(req.body);

    // Task 2: Invalid Request Body error handling
    if (error) {
        return res.status(400).json({ message: error });
    }

    let newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;

    let newStudent = {
        id: newId,
        name: req.body.name,
        department: req.body.department,
        year: req.body.year,
        email: req.body.email
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT /students/:id - update a student
router.put("/:id", function (req, res) {
    let student = students.find(function (s) {
        return s.id === parseInt(req.params.id);
    });

    if (!student) {
        return res.status(404).json({ message: "Student Not Found" });
    }

    let error = validateStudent(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    student.name = req.body.name;
    student.department = req.body.department;
    student.year = req.body.year;
    student.email = req.body.email;

    res.status(200).json(student);
});

// DELETE /students/:id - delete a student
router.delete("/:id", function (req, res) {
    let index = students.findIndex(function (s) {
        return s.id === parseInt(req.params.id);
    });

    if (index === -1) {
        return res.status(404).json({ message: "Student Not Found" });
    }

    let deleted = students.splice(index, 1);
    res.status(200).json({ message: "Student deleted", deleted: deleted });
});

module.exports = router;
