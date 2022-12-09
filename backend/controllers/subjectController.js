const asyncHandler = require("express-async-handler");
const Subject = require("../models/subjectModel");

const postSubject = asyncHandler(async (req, res) => {
  const { name, year } = req.body;
  if (!name) {
    res.status(401).json({ error: "Nom de module est necessaire" });
  }
  if (!year) {
    res.status(401).json({ error: "Année de module est necessaire" });
  }
  const { _id } = req.prof;
  const subject = await Subject.create({
    name,
    profID: _id,
    year,
  });

  if (subject) {
    res.status(201).json(subject);
  } else {
    res.status(401).json({ error: "N'a pas pu de créer cette module" });
  }
});

const getSubject = asyncHandler(async (req, res) => {
  const { subjectID } = req.params;
  const subject = await Subject.findById(subjectID);

  if (subject) {
    res.status(200).json(subject);
  } else {
    res.status(400).json({ error: "Ce module n'exist pas" });
  }
});

const getProfSubjects = asyncHandler(async (req, res) => {
  const { _id } = req.prof;

  const subjects = await Subject.find({ profID: _id });

  res.status(200).json(subjects);
});

module.exports = { postSubject, getSubject, getProfSubjects };
