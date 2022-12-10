const express = require("express");
const route = express.Router();
const {
  uploadCours,
  uploadTPs,
  uploadTDs,
  deleteFile,
} = require("../controllers/FileController");
const FileModel = require("../models/fileModel");

route.post("/cours", (req, res) => {
  uploadCours(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name: req.body.name,
        file: {
          data: req.file.filename,
          contentType: req.file.mimetype,
        },
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

route.post("/tps", (req, res) => {
  uploadTPs(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name: req.body.name,
        file: {
          data: req.file.filename,
          contentType: req.file.mimetype,
        },
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

route.post("/tds", (req, res) => {
  uploadTDs(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name: req.body.name,
        file: {
          data: req.file.filename,
          contentType: req.file.mimetype,
        },
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

route.post("/removeFile", (req, res) => {
  const filePath = req.body.path;
  if (deleteFile(filePath)) {
    res.status(200).json("deleted successefuly");
  } else {
    res.status(400);
    throw new Error("Something wrong or wrong path");
  }
});

module.exports = route;
