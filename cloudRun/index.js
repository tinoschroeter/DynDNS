"use strict";
const morgan = require("morgan");
const setIP = require("./routes/setIP");

const API_KEY = process.env.API_KEY;

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.post("/" + API_KEY, setIP());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
