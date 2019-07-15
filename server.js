// Dotenv for storing passwords
require("dotenv").config();

// Dependencies
const express = require("express");
const logger = require("morgan");

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

// Set templating engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

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
