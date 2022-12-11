const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const AsyncHandler = require("express-async-handler");

const Student = require("../models/studentModel");

const register = AsyncHandler(async (req, res) => {
  const { username, email, password, year } = req.body;
  // checking if email is valid
  if (!email || !password) {
    res.status(400);
    throw new Error("L'email ou le mot de passe ne sont pas fournis");
  }
  if (!validator.isEmail(email)) {
    throw new Error("L'email n'est pas valide");
  }
  // end of checking if email is valid

  const studentExist = await Student.findOne({ email });

  if (studentExist) {
    res.status(401);
    throw new Error("Student already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const student = await Student.create({
    username,
    email,
    password: hashPassword,
    year: year,
  });

  // create token
  const token = generateToken(student._id);

  if (student) {
    res.status(201).json({
      id: student._id,
      username: student.username,
      email: student.email,
      year: student.year,
      token,
    });
  } else {
    const errorMsg = "N'a pas pu de s'inscrire l'etudiant";
    res.status(401).json({ error: errorMsg });
    throw new Error(errorMsg);
  }
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validate if email and password are both provided
  if (!email || !password) {
    const errorMsg = "Email ou mot de passe manquant";
    res.status(400).json({ error: errorMsg });
    throw new Error(errorMsg);
  }

  const student = await Student.findOne({ email });
  // validate if email is correct
  if (!student) {
    const errorMsg = "Adresse Email incorrecte";
    res.status(400).json({ error: errorMsg });
    throw new Error(errorMsg);
  }

  // validate if password is correct
  const match = await bcrypt.compare(password, student.password);
  if (!match) {
    const errorMsg = "Mot de passe incorrecte";
    res.status(400).json({ error: errorMsg });
    throw new Error(errorMsg);
  }

  // student is logged in! create token and send it to the client along with student data

  res.status(200).json({
    username: student.username,
    email: student.email,
    year: student.year,
    token: generateToken(student._id),
  });
});

const deleteStudent = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findOneAndRemove({ _id: id });

  if (student) {
    res.status(200).json({ msg: "student deleted" });
  } else {
    res.status(401);
    throw new Error("Student not found");
  }
});

const addStudent = AsyncHandler(async (req, res) => {
  const { username, email, password, year } = req.body;
  // checking if email is valid
  if (!email || !password) {
    res.status(400);
    throw new Error("L'email ou le mot de passe ne sont pas fournis");
  }
  if (!validator.isEmail(email)) {
    throw new Error("L'email n'est pas valide");
  }
  // end of checking if email is valid

  const studentExist = await Student.findOne({ email });

  if (studentExist) {
    res.status(401);
    throw new Error("Student already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const student = await Student.create({
    username,
    email,
    password: hashPassword,
    year: year,
  });

  if (student) {
    res.status(201).json({
      _id: student.id,
      username: student.username,
      email: student.email,
      year: student.year,
    });
  } else {
    const errorMsg = "N'a pas pu d'ajouter l'etudiant";
    res.status(401).json({ error: errorMsg });
    throw new Error(errorMsg);
  }
});

const getStudentsByYear = AsyncHandler(async (req, res) => {
  const { year } = req.params;

  let année;
  if (year == "1") {
    année = "1ere année";
  } else if (year == "2") {
    année = "2eme année";
  } else {
    res.status(400).json("L'année d'etude doit etre 1 ou 2");
  }
  const students = await Student.find({ year: année });

  res.status(200).json(students);
});

const updatePassword = AsyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;
  console.log("req body", req.body);
  console.log("newPassword", newPassword);
  const { _id } = req.student;

  const foundStudent = await Student.findById(_id);
  const match = await bcrypt.compare(password, foundStudent.password);
  if (!match) {
    const errorMsg = "Mot de passe actuelle non correcte";
    return res.status(400).json({ error: errorMsg });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  const student = await Student.findByIdAndUpdate(_id, {
    password: hashPassword,
  });

  if (student) {
    res.status(200).json({ msg: "Mot de passe changé avec success" });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  register,
  login,
  deleteStudent,
  addStudent,
  getStudentsByYear,
  updatePassword,
};
