const asyncHandler = require("express-async-handler");
const Mark = require("../models/markModel");
const Subject = require("../models/subjectModel");

const Student = require("../models/studentModel");

const insertMark = asyncHandler(async (req, res) => {
  const { mark, subjectName, studentName, description } = req.body;
  if (!mark) res.status(400).json({ error: "La note est necessaire" });
  if (!subjectName)
    res.status(400).json({ error: "Le nom de module est necessaire" });
  if (!studentName)
    res.status(400).json({ error: "Le nom d'etudiant est necessaire" });

  const student = await Student.findOne({ username: studentName });

  if (!student) res.status(400).json({ error: "Etudiant not found" });
  const subject = await Subject.findOne({ name: subjectName });

  if (!subject) res.status(400).json({ error: "Module not found" });

  // all tests passed, now we post the mark
  await Mark.create({
    studentID: student._id,
    subjectID: subject._id,
    mark,
    description,
  });

  res.status(201).json({ message: "La note est posté avec success" });
});

const getStudentMarks = asyncHandler(async (req, res) => {
  const { _id } = req.student;

  const studentMarks = await Mark.find({ studentID: _id });

  res.status(200).json(studentMarks);
});

module.exports = { insertMark, getStudentMarks };
