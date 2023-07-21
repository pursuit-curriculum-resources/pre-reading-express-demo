const express = require("express");
const colors = express.Router();
const colorsArray = require("../models/color.js");

colors.get("/", (req, res) => {
  res.json(colorsArray);
});

module.exports = colors;
