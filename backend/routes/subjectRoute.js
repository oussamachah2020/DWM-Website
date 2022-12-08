const express = require("express");
const subjectRoute = express.Router();
const {
  postSubject,
  getProfSubjects,
  getSubject,
} = require("../controllers/subjectController");
const { protect } = require("../middleware/authMiddleware");

subjectRoute.post("/", protect, postSubject);
subjectRoute.get("/", protect, getProfSubjects);
subjectRoute.get("/:subjectID", getSubject);
module.exports = subjectRoute;
