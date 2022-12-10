const express = require("express");
const route = express.Router();
const {
  postAnnonce,
  getAnnonces,
  getProfAnnonces,
  deleteAnnonce,
  get1stYearAnnonces,
  get2ndYearAnnonces,
} = require("../controllers/annonceController");
const { protect } = require("../middleware/authMiddleware");

route.post("/", protect, postAnnonce);
route.get("/all", getAnnonces);
route.get("/", protect, getProfAnnonces);
route.get("/1", get1stYearAnnonces);
route.get("/2", get2ndYearAnnonces);
route.delete("/:id", deleteAnnonce);
module.exports = route;
