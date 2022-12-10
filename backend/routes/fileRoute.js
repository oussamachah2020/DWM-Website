const express = require("express");
const route = express.Router();
const {
  uploadCours,
  uploadTPs,
  uploadTDs,
  getFiles,
  deleteFile,
} = require("../controllers/FileController");
const { protect } = require("../middleware/authMiddleware");
const FileModel = require("../models/fileModel");
const Subject = require("../models/subjectModel");

route.post("/cours", protect, async (req, res) => {
  uploadCours(req, res, async (err) => {
    const subject = await Subject.findOne({ name: req.body.subjectName });
    const { _id } = subject._id;
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name: req.body.name,
        file: {
          data: req.file.filename,
          contentType: req.file.mimetype,
        },
        profID: req.prof,
        subjectID: _id,
        Filetype: "Cours",
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

route.post("/tps", protect, async (req, res) => {
  uploadTPs(req, res, async (err) => {
    const subject = await Subject.findOne({ name: req.body.subjectName });
    const { _id } = subject._id;
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name: req.body.name,
        file: {
          data: req.file.filename,
          contentType: req.file.mimetype,
        },
        profID: req.prof,
        subjectID: _id,
        Filetype: "TP",
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

route.post("/tds", protect, async (req, res) => {
  uploadTDs(req, res, async (err) => {
    const subject = await Subject.findOne({ name: req.body.subjectName });
    const { _id } = subject._id;
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name: req.body.name,
        file: {
          data: req.file.filename,
          contentType: req.file.mimetype,
        },
        profID: req.prof,
        subjectID: _id,
        Filetype: "TD",
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

route.delete("/:fileId", deleteFile);

route.get("/", protect, getFiles);

module.exports = route;
