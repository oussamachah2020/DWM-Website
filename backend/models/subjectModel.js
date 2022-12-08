const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: ["subject name required", true],
  },
  profID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Prof",
  },
  year: {
    type: String,
    required: ["year is required", true],
  },
});

const Subject = mongoose.model("subject", subjectSchema);

module.exports = Subject;
