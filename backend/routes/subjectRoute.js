const express = require("express");
const subjectRoute = express.Router();
const {
  postSubject,
  getProfSubjects,
  getSubject,
  getStudentSubjects,
} = require("../controllers/subjectController");
const { protect, protectStudent } = require("../middleware/authMiddleware");

subjectRoute.post("/", protect, postSubject);

subjectRoute.get("/", protect, getProfSubjects);
subjectRoute.get("/studentsubjects", protectStudent, getStudentSubjects);

subjectRoute.get("/:subjectID", getSubject);

module.exports = subjectRoute;
