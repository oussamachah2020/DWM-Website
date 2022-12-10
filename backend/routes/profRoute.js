const express = require("express");
const route = express.Router();
const {
  register,
  login,
  getProfData,
  updatePassword,
} = require("../controllers/ProfController");
const { protect } = require("../middleware/authMiddleware");
route.post("/", register).post("/login", login);
route.get("/:id", getProfData);
route.patch("/reset", protect, updatePassword);

module.exports = route;
