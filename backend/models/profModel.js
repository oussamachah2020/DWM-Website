const mongoose = require("mongoose");

const ProfSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: ["username required", true],
    },
    email: {
      type: String,
      required: ["email required", true],
    },
    password: {
      type: String,
      require: ["password required", true],
    },
  },
  { timestamps: true }
);

const Prof = mongoose.model("prof", ProfSchema);
module.exports = Prof;
