//This script gets loaded for both pages...
$(document).ready(function() {
  $(document).on("click", ".save", function() {
    // Get the ID so we can update the article stored in the DB
    console.log($(this));
    let articleID = $(this).data("id");
    console.log("Article to update: " + articleID);

    // using the id, make an ajax call to /articles/:id
    $.ajax({
      method: "PUT",
      url: "/articles/" + articleID,
      data: { saved: true }
    }).done(response => {
      console.log(response);
    });
    //Change the article button to say "saved!"
    $(this).html("Saved!");
  });
});
