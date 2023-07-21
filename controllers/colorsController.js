const express = require("express");
const colors = express.Router();
const colorsArray = require("../models/color.js");

// Index route
colors.get("/", (req, res) => {
  res.json(colorsArray);
});

// SHOW
colors.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  res.json(colorsArray[arrayIndex]);
});

// You can have additional routes that don't fit the RESTful pattern, if needed
colors.get("/very/cool", (req, res) => {
  //this will never be reached
  res.send(`
      <body
          style="background: linear-gradient(to bottom, ${colorsArray[0]} 16%, ${colorsArray[1]} 32%, ${colorsArray[2]} 48%, ${colorsArray[3]} 64%, ${colorsArray[4]} 80%, ${colorsArray[5]} 100%)"
      >
          <h1>Colors are cool!</h1>
      </body>
    `);
});

colors.use((req, res, next) => {
  if (req.query.apikey) {
    next();
  } else {
    res.send("You must supply an API key");
  }
});

const checkForColorKey = (req, res, next) => {
  if (req.body.hasOwnProperty("name")) {
    next();
  } else {
    res.send("You must supply an object with a key of `name`");
  }
};

// CREATE
// example curl command to be able to create a new color:
// curl -H "Content-Type: application/json" -X POST -d '{"name":"blanchedalmond"}' http://localhost:3333/colors\?apikey\=4321`
colors.post("/", checkForColorKey, (req, res) => {
  colorsArray.push(req.body);
  res.json(colorsArray[colorsArray.length - 1]);
});

module.exports = colors;
