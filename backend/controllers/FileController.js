const multer = require("multer");
const fsPromises = require("fs/promises");

const AsyncHandler = require("express-async-handler");
const fs = require("fs");

const frontendPath =
  "C:/Users/Hp Elitebook/Documents/estm/dwm-website/frontend/public/uploads";

//Cours upload
const SubjectData = multer.diskStorage({
  destination: (req, file, callback) => {
    let subjectName = req.body.subjectName;
    let category = req.params.category;
    let path = `${frontendPath}/subjects/${subjectName}/${category}`;
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
  console.log("api hit");
  console.log("req params", req.params);

  fs.unlink(
    // "uploads/subjects/Architecture Des Ordinateurs/cours/orange.jpg"
    `${frontendPath}/subjects/${subjectName}/${category}/${fileName}`,
    (err) => {
      if (err) {
        console.log(err);
        res.status(404).json({ err: "fichier non trouvé" });
      } else {
        res.status(200).json({ msg: "Supprimé avec succes" });
        console.log("\nDeleted file: example_file.txt");
      }
    }
  );
});

const getFiles = AsyncHandler(async (req, res) => {
  console.log("hitted");
  const { subjectName, category } = req.params;
  console.log("reqparams", req.params);

  let filesData = [];
  const files = fs.readdirSync(
    `${frontendPath}/subjects/${subjectName}/${category}`
  );
  console.log("found files", files);
  files.forEach((file) => {
    const fileData = fs.readFileSync(
      `${frontendPath}/subjects/${subjectName}/${category}/${file}`
    );
    // const downloadLink = `http://localhost:6060/uploads/subjects/${subjectName}/${category}/${file}`
    filesData.push({ fileName: file, fileData });
  });
  console.log("filesData", filesData);
  res.status(200).json(filesData);
});

module.exports = { uploadFile, getFiles, deleteFile };
