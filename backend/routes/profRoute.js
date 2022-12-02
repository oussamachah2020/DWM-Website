const express = require("express");
const route = express.Router();
const { register, login } = require("../controllers/ProfController");

route.post("/", register).post("/login", login);

module.exports = route;
