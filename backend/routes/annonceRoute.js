const express = require("express");
const route = express.Router();
const {
  postAnnonce,
  getAnnonces,
  getProfAnnonces,
  deleteAnnonce,
} = require("../controllers/annonceController");
const { protect } = require("../middleware/authMiddleware");

route.post("/", protect, postAnnonce);
route.get("/all", getAnnonces);
route.get("/", protect, getProfAnnonces);
route.delete("/:id", deleteAnnonce);
module.exports = route;
