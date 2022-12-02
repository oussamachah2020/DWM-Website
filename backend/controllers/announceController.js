const asyncHandler = require("express-async-handler");
const { Announce } = require("../models/announceModel");

const postAnnounce = asyncHandler(async (req, res) => {

  const announce = await Announce.create({
    prof: req.prof.id,
    content: req.body.text,
    year: req.body.year
  });

  if (announce) {
    res.status(201).json({ announce });
  } else {
    throw new Error("false data");    
  }
});

module.exports = { postAnnounce };
