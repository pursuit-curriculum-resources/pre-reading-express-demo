// DEPENDENCIES
const express = require("express");
const colors = require("./models/color.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json()); // parse incoming middleware

// Example custom middleware
app.use((req, res, next) => {
  console.log(req.method, req.headers.host, req.path);
  next();
});

// Middleware where you must always supply an API key for every route
// http://localhost:3333/colors?apikey=1234
// app.use((req, res, next) => {
//   if (req.query.apikey) {
//     next();
//   } else {
//     res.send("You must supply an API key");
//   }
// });

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
