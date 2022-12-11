const express = require("express");
const route = express.Router();
const {
  getFiles,
  deleteFile,
  uploadFile,
} = require("../controllers/FileController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

route.post("/:category", protect, async (req, res) => {
  console.log("hit");
  console.log("req body", req.params);

  uploadFile(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json(err);
    } else if (err) {
      res.status(500).json(err);
    }
    res.status(200).json({ msg: "success" });
  });
});

route.delete("/:subjectName/:category/:fileName", deleteFile);

route.get("/:subjectName/:category", protect, getFiles);

module.exports = route;
