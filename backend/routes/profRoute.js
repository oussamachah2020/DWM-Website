const express = require("express");
const route = express.Router();
const { register } = require("../controllers/ProfController");

route.post("/", register);

module.exports = route;
