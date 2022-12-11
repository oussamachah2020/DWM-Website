const express = require("express");
require("dotenv").config();
require("colors");
const PORT = 6060 || process.env.PORT;
const connection = require("./db/connect");
const markRoute = require("./routes/markRoute");
const subjectRoute = require("./routes/subjectRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

// DB Connection
connection();

//Routes
app.use("/api/students", require("./routes/studentRoute"));
app.use("/api/profs", require("./routes/profRoute"));
app.use("/api/files", require("./routes/fileRoute"));
app.use("/api/annonces", require("./routes/annonceRoute"));
app.use("/api/subjects", subjectRoute);
app.use("/api/marks", markRoute);

// create a server
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
