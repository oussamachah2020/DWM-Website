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
});

const FileModel = mongoose.model("file", FileSchema); 
module.exports = FileModel;
