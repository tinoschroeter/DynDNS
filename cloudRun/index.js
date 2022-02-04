"use strict";
const { MongoClient } = require("mongodb");
const morgan = require("morgan");
const getIP = require("./routes/getIP");
const setIP = require("./routes/setIP");

const API_KEY = process.env.API_KEY;

const express = require("express");
const app = express();

const uri = process.env.MONGO_URI
const options = { useNewUrlParser: true, useUnifiedTopology: true };

MongoClient(uri, options)
  .connect()
  .then((client) => {
    const collection = client.db("ops").collection("ip");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("combined"));

    app.get("/", getIP(collection));
    app.post("/" + API_KEY, setIP(collection));

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on Port ${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
