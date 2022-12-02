const express = require("express");
const route = express.Router();
const {
  register,
  login,
  deleteStudent,
} = require("../controllers/StudentController");

route.post("/", register).post("/login", login);
route.delete("/:id", deleteStudent);

module.exports = route;
