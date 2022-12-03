const express = require("express");
const route = express.Router();
const { postAnnounce } = require("../controllers/announceController");
const { protect } = require("../middleware/authMiddleware");

route.post("/", protect, postAnnounce);

module.exports = route;
