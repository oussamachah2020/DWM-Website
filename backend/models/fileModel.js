const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
  profID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Prof",
  },
  subjectID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "subject",
  },

  Filetype: {
    type: String,
  },
});

const FileModel = mongoose.model("file", FileSchema);
module.exports = FileModel;
