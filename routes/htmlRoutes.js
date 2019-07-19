// Route dependencies
const db = require("../models");

module.exports = app => {
  // Home page route
  app.get("/", (req, res) => {
    res.render("index");
  });
  app.get("/scraped", (req, res) => {
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
        console.log(data);
        if (err) throw err;
        // We will send this data to handlebars for server side rendering via the saved.handlebars file
        res.render("saved", { savedArticles: data });
      }
    );
  });
};
