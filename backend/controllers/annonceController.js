const asyncHandler = require("express-async-handler");
const { Annonce } = require("../models/annonceModel");

const postAnnonce = asyncHandler(async (req, res) => {
  const { content, year } = req.body;
  const { _id } = req.prof;
  try {
    const annonce = await Annonce.create({
      profID: _id,
      content,
      year,
    });

    res.status(200).json({ annonce });
  } catch (error) {
    // remove "Annonces validation failed" message before the actual error message
    const errorMsg = error.message.split(":")[2];
    res.status(400).json({ error: errorMsg });
  }
});

const getAnnonces = asyncHandler(async (req, res) => {
  const annonces = await Annonce.find({});

  res.status(200).json(annonces);
});

module.exports = { postAnnonce, getAnnonces };
