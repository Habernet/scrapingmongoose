//This script gets loaded for both pages...
$(document).ready(function() {
  // Start a modal functionality, this had to be templated by handlebars first
  $(".modal").modal();
  //   document.addEventListener("DOMContentLoaded", function() {
  //     var elems = document.querySelectorAll(".modal");
  //     var instances = M.Modal.init(elems, options);
  //   });

  // On click to save an article
  $(document).on("click", ".save", function() {
    // Get the ID so we can update the article stored in the DB
    let articleID = $(this).data("id");

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

  // On click to delete an article from saved
  $(document).on("click", ".delete", function() {
    // Get the ID so we can update the article stored in the DB
    let articleID = $(this).data("id");
    console.log(articleID);
    // using the id, make an ajax call to /articles/:id
    $.ajax({
      method: "PUT",
      url: "/articles/" + articleID,
      data: { saved: false }
    }).done(response => {
      console.log(response);
      // Reload the page
      location.reload();
    });
  });

  // On click of saved articles' "view comments" button
  $(document).on("click", ".view-comments", function() {
    // Get the ID so we know which article to load along with its
    let articleID = $(this).data("id");
    // GET Ajax call to the /articles/:id
    $.ajax({
      method: "GET",
      url: "/articles/" + articleID
    }).done(function(data) {
      console.log(data);
      // Build out the modal with jquery
      // Update the target modal title
      $(".modal-title").text(data.headline);
      $(".comments-section").empty();
      // Use the ID to make the update the save comment button
      console.log("THIS ID : ", data._id);
      $(".save-comment-button").data("id", data._id);
      if (data.comments.length === 0) {
        $(".comments-section").text("No comments.");
      } else {
        // loop through the comments, creating a card for adding to the modal.
        for (let i = 0; i < data.comments.length; i++) {
          let commentCard = `<div class="col s12 m7">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-content">
                  <p>${data.comments[i].commentBody}</p>
                  </p><button class='col s1 btn delete-comment-button' data-dbid='${
                    data.comments[i]._id
                  }'>X</button>
                </div>
              </div>
            </div>
          </div>`;
          $(".comments-section").prepend(commentCard);
        }
        M.Modal.getInstance($(".modal")).open();
      }
    });
  });

  //On click of save comment button, ajax call to save comment based on iD
});
