const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Prof = require("../models/profModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.prof = await Prof.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "request is not authorized" });
      throw new Error("request is not authorized");
    }
  }

  if (!token) {
    res.status(401).json("not authorized, no token");
    throw new Error("not authorized, no token");
  }
});

module.exports = { protect };
