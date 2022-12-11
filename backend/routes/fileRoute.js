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
  uploadTDs(req, res, async (err) => {
    const { subjectID, name, myFile } = req.body;
    console.log("reqBody", req.body);
    // console.log("myFile", myFile);
    // console.log("subjectID", subjectID);
    // console.log("name", name);
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name,
        file: {
          data: myFile.name,
          contentType: myFile.type,
        },
        subjectID,
        category: "Cours",
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

route.post("/tps", protect, async (req, res) => {
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
