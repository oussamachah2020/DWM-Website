const express = require("express");
const { insertMarks } = require("../controllers/marksController");
const route = express.Router();
const { register, login } = require("../controllers/ProfController");
const { setSubject } = require("../controllers/subjectController");
const { protect } = require("../middleware/authMiddleware");
route.post("/", register).post("/login", login);
route.post("/subject", protect, setSubject);
route.post("/marks", protect, insertMarks);

module.exports = route;
