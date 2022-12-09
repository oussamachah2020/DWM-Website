const express = require("express");
const {
  insertMark,
  getStudentMarks,
} = require("../controllers/MarkController");
const { protect, protectStudent } = require("../middleware/authMiddleware");

const markRoute = express.Router();

markRoute.post("/", protect, insertMark);
markRoute.get("/", protectStudent, getStudentMarks);
module.exports = markRoute;
