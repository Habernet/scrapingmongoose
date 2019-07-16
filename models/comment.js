let mongoose = require("mongoose");

// Create a variable that refers to the schema constructor provided by mongoose
let Schema = mongoose.Schema;

//Use the above constructor to a schema
let CommentSchema = new Schema({
  commentBody: {
    type: String,
    validate: [
      input => {
        return input.length >= 1;
      },
      "Comment needs content."
    ]
  }
});

// Pull together a model based on the schema and schema method so that we can export it for use
let Comment = mongoose.model("Comment", CommentSchema);

// Export the model
module.exports = Comment;
