const mongoose = require("mongoose");

// Create a variable that refers to the schema constructor provided by mongoose
let Schema = mongoose.Schema;

//Use the above constructor to a schema
let ArticleSchema = new Schema({
  //The headline of the article
  headline: {
    type: String,
    required: true
  },
  // The associated image
  imageURL: {
    type: String,
    required: true
  },
  // The associated link
  articleURL: {
    type: String,
    required: true
  },
  // Shows whether or not the article has been saved
  saved: {
    type: Boolean,
    required: true
  },
  // Comments are an array so we can have multiples
  comments: [
    {
      // the type is the object ID provided by mongoose, this is how we can associate comments with their articles
      type: Schema.Types.ObjectId,
      // the ref is how we syntactically make the relationship described above
      ref: "Comment"
    }
  ]
});

// Pull together a model based on the schema and schema method so that we can export it for use
let Article = mongoose.model("Article", ArticleSchema);

//Export it for use
module.exports = Article;
