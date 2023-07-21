// DEPENDENCIES
const express = require("express");
const colors = require("./models/color.js");

// CONFIGURATION
const app = express();

// ROUTES
// Home Page
app.get("/", (req, res) => {
  res.send("Welcome to Colors App");
});

// Colors resource
const colorsController = require("./controllers/colorsController.js");
app.use("/colors", colorsController);

// 404 Page not found
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

// EXPORT
module.exports = app;
