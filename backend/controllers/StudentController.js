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
      _id: student.id,
      username: student.username,
      email: student.email,
      year: student.year,
      token,
    });
  } else {
    res.status(401);
    throw new Error("wrong data");
  }
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validate if email and password are both provided
  if (!email || !password) {
    throw new Error("Email ou mot de passe manquant");
  }

  const student = await Student.findOne({ email });
  // validate if email is correct
  if (!student) {
    throw new Error("Adresse Email incorrecte");
  }

  // validate if password is correct
  const match = await bcrypt.compare(password, student.password);
  if (!match) {
    throw new Error("Mot de passe incorrecte");
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
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { register, login, deleteStudent };
