const express = require("express");
const route = express.Router();
const {
  register,
  login,
  deleteStudent,
  addStudent,
} = require("../controllers/StudentController");

route.post("/", addStudent).post("/register", register).post("/login", login);
route.delete("/:id", deleteStudent);

module.exports = route;
