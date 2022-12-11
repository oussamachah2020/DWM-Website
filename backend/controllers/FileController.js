const multer = require("multer");
const FileModel = require("../models/fileModel");
const fsPromises = require("fs/promises");

const AsyncHandler = require("express-async-handler");
const fs = require("fs");

//Cours upload
const SubjectData = multer.diskStorage({
  destination: (req, file, callback) => {
    let subjectName = req.body.subjectName;
    let category = req.params.category;
    let path = `uploads/subjects/${subjectName}/${category}`;
    callback(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage: SubjectData,
}).single("myFile");

//TPs upload
// const TPs = multer.diskStorage({
//   destination: "uploads/TPs",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const uploadTPs = multer({
//   storage: TPs,
// }).single("TP");

// //TDs upload
// const TDs = multer.diskStorage({
//   destination: "uploads/TDs",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const uploadTDs = multer({
//   storage: TDs,
// }).single("TD");

const deleteFile = AsyncHandler(async (req, res) => {
  const { fileId } = req.params;
  // const File = await FileModel.findOneAndRemove({ _id: fileId });
  // const pdf = fs.writeFile(File, File.data).toString('utf8')
  if (File) {
    res.status(200).json("deleted successfully");
  } else {
    res.status(400);
    throw new Error("Something wrong or wrong path");
  }
});

const getFiles = AsyncHandler(async (req, res) => {
  // const files = await FileModel.find({ subjectID: req.params.subjectID });
  const {subjectName, category} = req.params
  
  // if (files) {
  //   files.forEach((file) => {});
  //   res.status(200).json(files);
  //   if (files.category === "Cours") {
  //     await fs.promises.access("uploads/Cours");
  //   }

  //   if (files.category === "TP") {
  //     await fs.promises.access("uploads/TPs");
  //   }

  //   if (files.category === "TD") {
  //     await fs.promises.access("uploads/TDs");
  //   }
  // }
});

module.exports = { uploadFile, getFiles, deleteFile };
