const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Prof = require("../models/profModel");
const Student = require("../models/studentModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);
      req.prof = await Prof.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "request is not authorized" });
      throw new Error("error message: ", error.message);
    }
  }

  if (!token) {
    res.status(401).json("not authorized, no token");
    throw new Error("not authorized, no token");
  }
});

const protectStudent = asyncHandler(async (req, res, next) => {
  console.log("middleware hit");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);
      req.student = await Student.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "request is not authorized" });
      throw new Error("error message: ", error.message);
    }
  }

  if (!token) {
    res.status(401).json("not authorized, no token");
    throw new Error("not authorized, no token");
  }
});

module.exports = { protect, protectStudent };
