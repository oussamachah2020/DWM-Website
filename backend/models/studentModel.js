const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
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

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
