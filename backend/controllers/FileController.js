const multer = require("multer");
const FileModel = require("../models/fileModel");

//Cours upload
const Cours = multer.diskStorage({
  destination: "uploads/Cours",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCours = multer({
  storage: Cours,
}).single("testCours"); 

//TPs upload
const TPs = multer.diskStorage({
  destination: "uploads/TPs",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadTPs = multer({
  storage: TPs,
}).single("testTPs"); 

//TDs upload
const TDs = multer.diskStorage({
  destination: "uploads/TDs",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadTDs = multer({
  storage: TDs,
}).single("testTDs"); 

module.exports = { uploadCours, uploadTPs, uploadTDs };
