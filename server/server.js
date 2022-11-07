const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const PORT = 6060 || process.env.PORT;
const connection = require('./db/connect');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Connection
connection();

// create a server
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
