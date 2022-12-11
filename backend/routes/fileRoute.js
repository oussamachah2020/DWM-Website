const express = require("express");
const route = express.Router();
const {
  getFiles,
  deleteFile,
  uploadFile,
} = require("../controllers/FileController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const fs = require("fs");
route.post("/:category", protect, async (req, res) => {
  console.log("req body upload file", req.body);
  console.log("hit");

  uploadFile(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json(err);
    }
    // const files = fs.read(`uploads/subjects/${subjectName}/${category}`);

    res.status(200).json({ msg: "success" });
  });
});

route.delete("/:subjectName/:category/:fileName", deleteFile);

route.get("/:subjectName/:category", getFiles);

module.exports = route;
