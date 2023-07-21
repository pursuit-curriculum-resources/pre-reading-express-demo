const express = require("express");
const colors = express.Router();
const colorsArray = require("../models/color.js");

// Index route
colors.get("/", (req, res) => {
  res.json(colorsArray);
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

module.exports = colors;
