const express = require("express");
const route = express.Router();
const { register, deleteStudent } = require("../controllers/StudentController");

route.post("/", register);
route.delete("/:id", deleteStudent);

module.exports = route;
