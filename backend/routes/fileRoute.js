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
const multer = require("multer");

route.post("/cours", protect, async (req, res) => {
  uploadCours(req, res, async (err) => {
    const { subjectID, name, myFile } = req.body;
    if (err instanceof  multer.MulterError) {
      res.status(500).json(err)
    } else if(err) {
      res.status(500).json(err)
    } //else {
    //   const newFile = new FileModel({
    //     name,
    //     file: {
    //       data: myFile.filename,
    //       contentType: myFile.type,
    //     },
    //     subjectID,
    //     category: "Cours",
    //   });
    //   newFile.save().then(() => res.send(req.file));
    // }
    return res.status(200).send(req.file)
  });
});

route.post("/tps", protect, async (req, res) => {
  uploadTPs(req, res, async (err) => {
    const { subjectID, name, file } = req.body;
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name,
        file: {
          data: file.filename,
          contentType: file.mimetype,
        },
        subjectID,
        category: "TP",
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

route.post("/tds", protect, async (req, res) => {
  uploadTDs(req, res, async (err) => {
    const { subjectID, name, file } = req.body;
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name,
        file: {
          data: file.filename,
          contentType: file.mimetype,
        },
        subjectID,
        category: "TD",
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

route.delete("/:fileId", deleteFile);

route.get("/:subjectID", protect, getFiles);

module.exports = route;
