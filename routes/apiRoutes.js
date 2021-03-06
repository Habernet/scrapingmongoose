// Bring in the models
const db = require("../models");

// Dependencies
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {
  // .get /scrape for doing the scraping action
  app.get("/scrape", (req, res) => {
    db.Article.find({}, (err, data) => {
      if (err) throw err;

      // grab the headlines from the results, this specifically is what we will test against for duplicates.
      currentHeadlines = [];

      for (let i = 0; i < data.length; i++) {
        currentHeadlines.push(data[i].headline);
      }
      // use axios to make the call to the website
      axios.get("https://www.ign.com/articles?tags=news").then(response => {
        // load the response with cheerio, simulating jquery
        var $ = cheerio.load(response.data);

        $("div.listElmnt").each((i, element) => {
          if (
            !currentHeadlines.includes(
              $(element)
                .find("img")
                .attr("alt")
            )
          ) {
            let result = {};
            // Grab the urls, headline and summary
            result.articleSummary = $(element)
              .find("p")
              .text()
              .slice(0, -13);
            result.articleSummary += "...";
            result.imageURL = $(element)
              .find("img")
              .attr("src");
            result.headline = $(element)
              .find("img")
              .attr("alt");
            result.saved = false;
            result.articleURL = $(element)
              .find("a.listElmnt-storyHeadline")
              .attr("href");

            db.Article.create(result)
              .then(dbArticle => {
                console.log("CREATED: ", dbArticle);
              })
              .catch(err => {
                console.log("ERROR ", err);
              });
          }
        });
      });
    });
    res.redirect("/scraped");
  });

  // .get /articles/:id to find an article based on the id and send the article along with its populated comments back
  app.get("/articles/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate("Comment")
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // .put /articles/:id for updating articles bool value
  app.put("/articles/:id", (req, res) => {
    db.Article.update(
      { _id: req.params.id },
      { $set: req.body },
      (err, result) => {
        if (err) {
          console.log("DID NOT PUT");
        }
        console.log(result);
        // We can add more to the response here for better API documentation
        res.sendStatus(200);
      }
    );
  });

  // .post /articles/:id for saving a comment for a specific article
  app.post("/articles/:id", (req, res) => {
    db.Comment.create(req.body)
      .then(dbComment => {
        //find and update the article that is associated with the req.body
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: dbComment._id } },
          { new: true }
        );
      })
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // .delete /comments/:id use this to delete a comment based on the id
  app.delete("/comments/:id", (req, res) => {
    db.Comment.remove({ _id: req.params, id }, (err, data) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
};
