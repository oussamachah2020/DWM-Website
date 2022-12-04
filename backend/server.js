const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const PORT = 6060 || process.env.PORT;
const connection = require("./db/connect");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Connection
connection();

//Routes
app.use("/api/students", require("./routes/studentRoute"));
app.use("/api/profs", require("./routes/profRoute"));
app.use("/api/files", require("./routes/fileRoute"));
app.use("/api/announces", require("./routes/announceRoute"));

// create a server
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
