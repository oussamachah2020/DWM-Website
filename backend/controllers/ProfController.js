const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AsyncHandler = require("express-async-handler");
const Prof = require("../models/profModel");

const register = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const studentExist = await Prof.findOne({ email });

  if (studentExist) {
    res.status(401);
    throw new Error("Student already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const prof = await Prof.create({
    username: username,
    email: email,
    password: hashPassword,
    token: generateToken,
  });

  if (prof) {
    res.status(201).json({ prof });
  } else {
    res.status(401);
    throw new Error("wrong data");
  }
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const prof = await Prof.findOne({ email });

  if (prof && (await bcrypt.compare(password, prof.password))) {
    res.status(200).json({
      username: prof.username,
      email: prof.email,
      token: generateToken(prof._id),
    });
  } else {
    res.status(401);
    throw new Error("Incorrect Data");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { register, login };
