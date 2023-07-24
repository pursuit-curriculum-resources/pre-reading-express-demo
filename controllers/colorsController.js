const express = require("express");
const colors = express.Router();
const colorsArray = require("../models/color.js");
const { checkForColorKey } = require("../models/validations.js");

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

// You do not need an API key here
// If you wanted to require the API key
// Move this route below the `color.use` middleware
// DELETE
// colors.delete("/:arrayIndex", (req, res) => {
//   const { arrayIndex } = req.params;
//   if (colorsArray[arrayIndex]) {
//     const deletedBookMark = colorsArray.splice(arrayIndex, 1);
//     res.status(200).json(deletedBookMark[0]);
//   } else {
//     res.status(404).json({ error: "Not Found" });
//   }
// });

// Redirect option with delete
colors.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (colorsArray[arrayIndex]) {
    colorsArray.splice(arrayIndex, 1);
    res.redirect("/colors");
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

colors.put("/:arrayIndex", checkForColorKey, (req, res) => {
  const { arrayIndex } = req.params;
  colorsArray[arrayIndex] = req.body;
  res.status(200).json(colorsArray[arrayIndex]);
});

colors.use((req, res, next) => {
  if (req.query.apikey) {
    next();
  } else {
    res.send("You must supply an API key");
  }
});

// CREATE
// example curl command to be able to create a new color:
// curl -H "Content-Type: application/json" -X POST -d '{"name":"blanchedalmond"}' http://localhost:3333/colors\?apikey\=4321`
colors.post("/", checkForColorKey, (req, res) => {
  colorsArray.push(req.body);
  res.json(colorsArray[colorsArray.length - 1]);
});

module.exports = colors;
