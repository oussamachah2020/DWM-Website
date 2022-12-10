const mongoose = require("mongoose");

const annonceSchema = mongoose.Schema(
  {
    profID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Prof",
    },
    content: {
      type: String,
      required: ["Le contenu est requis", true],
    },
    year: {
      type: String,
      required: ["L'année d'étude est requise", true],
    },
  },
  { timestamps: true }
);

const Annonce = mongoose.model("annonces", annonceSchema);
module.exports = { Annonce };
