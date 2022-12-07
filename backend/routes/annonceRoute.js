const express = require("express");
const route = express.Router();
const {
  postAnnonce,
  getAnnonces,
} = require("../controllers/annonceController");
const { protect } = require("../middleware/authMiddleware");

route.post("/", protect, postAnnonce);
route.get("/", getAnnonces);

module.exports = route;
