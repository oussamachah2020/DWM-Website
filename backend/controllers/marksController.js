const asyncHandler = require("express-async-handler");
const Marks = require("../models/marksModel");
const Subject = require("../models/subjectModel");

const insertMarks = asyncHandler(async (req, res) => {
  const table = req.body.marks;

  const marks = await Marks.create({
    marks: table,
    students: req.body.students,
    profId: req.prof.id,
  });

  if (marks) {
    res.status(201).json({ marks });
  } else {
    res.status(401).json({ msg: "Something is wrong" });
  }
});

module.exports = { insertMarks };
