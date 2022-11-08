const multer = require("multer");
const FileModel = require("../models/fileModel");


const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testFile"); 

module.exports = { upload };
