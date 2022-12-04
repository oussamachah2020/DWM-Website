const mongoose = require("mongoose");

const announceSchema = mongoose.Schema(
  {
    profID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Prof",
    },
    content: {
      type: String,
      required: ["content required", true],
    },
    year: {
      type: String,
      required: ["year required", true],
    },
  },
  { timestamps: true }
);

const Announce = mongoose.model("announce", announceSchema);
module.exports = { Announce };
