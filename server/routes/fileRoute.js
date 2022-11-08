const express = require("express");
const route = express.Router();
const { upload } = require("../controllers/FileController");
const FileModel = require("../models/fileModel");

route.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newFile = new FileModel({
        name: req.body.name,
        file: {
          data: req.file.filename,
          contentType: "image/pdf",
        },
      });
      newFile.save().then(() => res.send("file uploaded"));
    }
  });
});

module.exports = route;
