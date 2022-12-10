const mongoose = require("mongoose");

const markSchema = mongoose.Schema({
  mark: {
    type: String,
    required: true,
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "student",
  },
  subjectID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "subject",
  },
  description: {
    type: String,
    required: false,
  },
});

const Mark = mongoose.model("mark", markSchema);
module.exports = Mark;
