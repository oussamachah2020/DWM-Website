const express = require("express");
const route = express.Router();
const {
  register,
  login,
  deleteStudent,
  addStudent,
  getStudentsByYear,
  updatePassword,
} = require("../controllers/StudentController");
const { protectStudent } = require("../middleware/authMiddleware");

route.post("/", addStudent).post("/register", register).post("/login", login);
route.get("/:year", getStudentsByYear);
route.delete("/:id", deleteStudent);
route.patch("/reset", protectStudent, updatePassword);

module.exports = route;
