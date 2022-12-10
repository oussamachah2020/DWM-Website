const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  subjectID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "subject",
  },
  name: {
    type: String,
    required: true,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: String,
  },
});

const FileModel = mongoose.model("file", FileSchema);

module.exports = FileModel;
