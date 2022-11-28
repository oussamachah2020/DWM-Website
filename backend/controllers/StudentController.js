const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AsyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");

const register = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const studentExist = await Student.findOne({ email });

  if (studentExist) {
    res.status(401);
    throw new Error("Student already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const student = await Student.create({
    username: username,
    email: email,
    password: hashPassword,
    token: generateToken,
  });

  if (student) {
    res.status(201).json({
      _id: student.id,
      username: student.username,
      email: student.email,
      token: generateToken(student._id),
    });
  } else {
    res.status(401);
    throw new Error("wrong data");
  }
});

const deleteStudent = AsyncHandler(async(req, res) => {
  const {id} = req.params;
  const student = await Student.findOneAndRemove({ _id: id });

  if(student) {
    res.status(200).json({msg: "student deleted"});
  }else {
    res.status(401)
    throw new Error("Student not found")
  }

})
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { register, deleteStudent };
