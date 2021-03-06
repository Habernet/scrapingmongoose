// Dotenv for storing passwords
require("dotenv").config();

// Dependencies
const express = require("express");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// Models
const db = require("./models");

// Choose the port based on deployment
const PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();

// Set middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use Morgan
app.use(logger("dev"));
// Set templating engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoosescraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Kick off the server
app.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

//Make the app available for other files to use
module.exports = app;
