const asyncHandler = require("express-async-handler");
const { Annonce } = require("../models/annonceModel");
const mongoose = require("mongoose");
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
  const annonces = await Annonce.find({}).sort({
    createdAt: -1,
  });

  res.status(200).json(annonces);
});

const get1stYearAnnonces = asyncHandler(async (req, res) => {});

const getProfAnnonces = asyncHandler(async (req, res) => {
  const { _id } = req.prof;

  const profAnnonces = await Annonce.find({ profID: _id }).sort({
    createdAt: -1,
  });
  // console.log("profAnnonces", profAnnonces);
  res.status(200).json(profAnnonces);
});

const deleteAnnonce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Cette annonce n'existe pas" });
  }

  const annonce = await Annonce.findOneAndDelete({ _id: id });

  if (!annonce) {
    return res.status(400).json({ error: "Cette annonce n'existe pas" });
  }

  res.status(200).json(annonce);
};

module.exports = { postAnnonce, getAnnonces, getProfAnnonces, deleteAnnonce };
