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

const deleteFile = AsyncHandler(async (req, res) => {
  const { subjectName, category, fileName } = req.params;

  try {
    await fsPromises.unlink(`uploads/subjects/${subjectName}/${category}/${fileName}`)
  }catch(err) {
    res.status(401).json({ err: err.msg });
  }

  if (File) {
    res.status(200).json("deleted successfully");
  } else {
    res.status(400);
    throw new Error("Something wrong or wrong path");
  }
});

const getFiles = AsyncHandler(async (req, res) => {
  const {subjectName, category} = req.params

  try {
    const files = await fs.stat(`uploads/subjects/${subjectName}/${category}`);
    let filesData = []
    if(category === "cours") {
      filesData.push({cours: files})
    }else if(category === "tds") {
      filesData.push({tds: files})
    }else if(category === "tps") {
      filesData.push({tps: files})
    }else {
      res.status(404).json({ err: "category n'est pas trouvée" })
    }
  }catch(err) {
    res.status(401).json({ err: err.msg })
  }
});

module.exports = { uploadFile, getFiles, deleteFile };
