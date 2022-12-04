const express = require("express");
const route = express.Router();
const {
  postAnnounce,
  getAnnounces,
} = require("../controllers/announceController");
const { protect } = require("../middleware/authMiddleware");

route.post("/", protect, postAnnounce);
route.get("/", getAnnounces);

module.exports = route;
