const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AsyncHandler = require("express-async-handler");
const Prof = require("../models/profModel");

const register = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const profExists = await Prof.findOne({ email });

  if (profExists) {
    const errorMsg = "Prof deja existe";
    res.status(401).json({ error: errorMsg });
    throw new Error(errorMsg);
  }

  if (!username) {
    const errorMsg = "Le nom de prof est necessaire";
    res.status(401).json({ error: errorMsg });
    throw new Error(errorMsg);
  }

  if (!email) {
    const errorMsg = "Le email de prof n'est pas trouvé";
    res.status(401).json({ error: errorMsg });
    throw new Error(errorMsg);
  }
  if (!password) {
    const errorMsg = "Le mot de passe  de prof n'est pas trouvé";
    res.status(401).json({ error: errorMsg });
    throw new Error(errorMsg);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const prof = await Prof.create({
    username: username,
    email: email,
    password: hashPassword,
  });
  const token = generateToken(prof._id);

  if (prof) {
    res.status(201).json({
      id: prof._id,
      username: prof.username,
      email: prof.email,
      token,
    });
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
      id: prof._id,
      username: prof.username,
      email: prof.email,
      token: generateToken(prof._id),
    });
  } else {
    const errorMsg = "Email ou mot de passe incorrecte";
    res.status(401).json({ error: errorMsg });
    throw new Error(errorMsg);
  }
});

const getProfData = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const prof = await Prof.findById(id);
  if (prof) {
    res.status(200).json(prof);
  } else {
    res.status(400).json({ error: "Prof n'exist pas" });
  }
});

const updatePassword = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const findProf = await Prof.findOne({ email });

  if (!findProf) {
    res.status(400).json({ error: "user is not found" });
  }

  const prof = await Prof.findByIdAndUpdate(findUser._id, {
    password: hashPassword,
  });

  if (prof) {
    res.status(200).json({ msg: "user password upadated" });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { register, login, getProfData, updatePassword };
