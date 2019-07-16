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
    db.Article.find({}, null, { sort: { _id: -1 } }, (err, data) => {
      //   if (err) throw err;
      //We will send this data to handlebars for server side rendering, for now we are just displaying data in the browser.
      res.json(data);
    });
    // db.Article.create(
    //   { headline: "Hello World", imageURL: "NA", saved: false },

    //   (err, article) => {
    //     if (err) throw err;
    //     res.json(article);
    //   }
    // );
  });
};
