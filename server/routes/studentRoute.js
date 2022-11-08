const express = require("express");
const route = express.Router();
const { register } = require("../controllers/StudentController");

route.post("/", register);

module.exports = route;
