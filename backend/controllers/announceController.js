const asyncHandler = require("express-async-handler");
const { Announce } = require("../models/announceModel");

const postAnnounce = asyncHandler(async (req, res) => {
  const { content, year } = req.body;
  const { id } = req.prof;
  const announce = await Announce.create({
    profID: id,
    content,
    year,
  });

  if (announce) {
    res.status(201).json({ announce });
  } else {
    throw new Error("false data");
  }
});

const getAnnounces = asyncHandler(async (req, res) => {
  const announces = await Announce.find({});

  res.status(200).json({ announces });
});

module.exports = { postAnnounce, getAnnounces };
