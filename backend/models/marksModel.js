const mongoose = require("mongoose");

const marksSchema = mongoose.Schema({
  marks: {
    type: [String],
    required: true,
  },
  students: {
    type: [String],
    required: true,
  },
  subject: {
    type: String,
    require: ["subject required", true]
  },
  profId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Prof",
  },
});

const Marks = mongoose.model("marks", marksSchema);
module.exports = Marks;
