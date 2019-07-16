// Route dependencies
const db = require("../models");
const mongoose = require("mongoose");

module.exports = app => {
  // connect to the DB
  mongoose.connect("mongodb://localhost/mongoosescraper", {
    useNewUrlParser: true
  });

  // Home page route
  app.get("/", (req, res) => {
    // change query to only find those who aren't saved!!
    db.Article.find({}, null, { sort: { _id: -1 } }, (err, data) => {
      if (err) throw err;
      //We will send this data to handlebars for server side rendering via the index.handlebars file
      console.log(data);
      res.render("index", { articles: data });
    });
  });

  // .get /saved for rendering the saved pages based on the bool
  app.get("/saved", (req, res) => {
    db.Article.find(
      { saved: true },
      null,
      { sort: { _id: -1 } },
      (err, data) => {
        if (err) throw err;
        // We will send this data to handlebars for server side rendering via the saved.handlebars file
        res.render("saved", { savedArticles: data });
      }
    );
  });

  //
};
