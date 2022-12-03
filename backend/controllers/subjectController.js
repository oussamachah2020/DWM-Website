const asyncHandler = require("express-async-handler");
const Subject = require("../models/subjectModel");

const setSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.create({
    name: req.body.name,
    profId: req.prof.id,
    year: req.body.year,
  });

  if (subject) {
    res.status(201).json({ subject });
  } else {
    res.status(401);
    throw new Error("Somthing is wrong");
  }
});

module.exports = { setSubject };
