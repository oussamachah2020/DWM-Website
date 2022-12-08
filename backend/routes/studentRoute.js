const express = require("express");
const route = express.Router();
const {
  register,
  login,
  deleteStudent,
  addStudent,
  getStudentsByYear,
} = require("../controllers/StudentController");

route.post("/", addStudent).post("/register", register).post("/login", login);
route.get("/:year", getStudentsByYear);
route.delete("/:id", deleteStudent);

module.exports = route;
