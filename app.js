// DEPENDENCIES
const express = require("express");
const colors = require("./models/color.js");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Colors App");
});

// Index route
app.get("/colors", (req, res) => {
  res.send(colors);
});

// Route with an error
app.get("/colors/oops/:index", (req, res) => {
  const { index } = req.params;
  res.send(colors[index]);
  // error cannot send more than one response!
  res.send("this is the index: " + index);
});

// Place route in correct order
app.get("/colors/cool", (req, res) => {
  //this will never be reached
  res.send(`
    <body
        style="background: linear-gradient(to bottom, ${colors[0]} 16%, ${colors[1]} 32%, ${colors[2]} 48%, ${colors[3]} 64%, ${colors[4]} 80%, ${colors[5]} 100%)"
    >
        <h1>Colors are cool!</h1>
    </body>
  `);
});

// Dynamic route for one color with error handling
app.get("/colors/:index", (req, res) => {
  const { index } = req.params;
  if (colors[index]) {
    res.send(colors[index]);
  } else {
    res.send("Cannot find any colors at this index: " + index);
  }
});

// Multiple parameters
app.get("/question/:firstName/:lastName", (req, res) => {
  console.log(req.params);
  const { firstName, lastName } = req.params;
  res.send(`${firstName} ${lastName} asks if there is life on Mars?`);
});

// Parameters and query strings
app.get("/calculator/:operator", (req, res) => {
  const { num1, num2 } = req.query;
  let sum = 0;
  if (req.params.operator === "add") {
    sum = Number(num1) + Number(num2);
  }
  res.send("sum is " + sum);
});

// EXPORT
module.exports = app;
