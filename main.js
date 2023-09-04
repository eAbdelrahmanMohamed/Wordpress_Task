// let count = parseInt(
//   document.getElementById("contanier").getAttribute("data-count")
// );
// let page = parseInt(
//   document.getElementById("contanier").getAttribute("data-page")
// );
// let posts_count = parseInt(
//   document.getElementById("contanier").getAttribute("data-posts")
// );
// let limit = (page + 1) * count;
// ============================== the above section to make those public and can access from all file ==============
function Show_Hide() {
  let count = parseInt(
    document.getElementById("contanier").getAttribute("data-count")
  );
  let page = parseInt(
    document.getElementById("contanier").getAttribute("data-page")
  );
  let posts_count = parseInt(
    document.getElementById("contanier").getAttribute("data-posts")
  );
  let child_nodes_count =
    document.getElementById("contanier").childElementCount;

  let limit = page * child_nodes_count;
  console.log("limit is " + limit + " and page is" + page);
  if (posts_count > 5) {
    document.getElementById("SeeMore").style.display = "block";
  } else {
    document.getElementById("SeeMore").style.display = "none";
  }
}
document
  .getElementById("contanier")
  .addEventListener("DOMNodeInserted", Show_Hide()); // to ensure see more be visible when change happens in contanier div
document.addEventListener("load", Show_Hide()); // this to ensure see more is visible on when page loaded
// ==============POST BTN ==================================
jQuery("#btnpost").on("click", function () {
  // when post button is clicked
  let count = parseInt(
    document.getElementById("contanier").getAttribute("data-count")
  );
  //   let child_nodes_count=document.getElementById("contanier").childElementCount;
  let page = parseInt(
    document.getElementById("contanier").getAttribute("data-page")
  );
  let posts_count = parseInt(
    document.getElementById("contanier").getAttribute("data-posts")
  );
  //   below line is to prevent multiple clicks
  jQuery(this).attr("disabled", true);

  Content = document.getElementById("content").value; //input text content
  uid = document.getElementById("head").getAttribute("data-uid"); //user id
  if (Content === "") {
    // if user didn't write any thing it can't post
    alert("please fill posts content");
  } else if (page > 1) {
    //if there are more than 5 posts then
    jQuery.ajax({
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      data: {
        action: "create_post", // functon name
        dataType: "html", //return type expected
        content: Content,
        offset: count * page,
        user_id: uid,
      },
      success: function (posts) {
        document.getElementById("contanier").innerHTML = posts; //post returned result to div
      },
    });
  } else {
    // if posts is less than or equal 5 (page 1)
    jQuery.ajax({
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      data: {
        action: "create_post",
        dataType: "html",
        content: Content,
        user_id: uid,
      },
      success: function (posts) {
        document.getElementById("contanier").innerHTML = posts;
      },
    });
  }
  jQuery("#btnpost").attr("disabled", false); //remove disabled from post button and return functionalty
  document.getElementById("content").value = ""; // reset input text
  jQuery("#contanier").attr("data-posts", parseInt(posts_count) + 1); // update number of posts total
  //   update see more condtion after change in posts number
  if (parseInt(jQuery("#contanier").attr("data-posts")) > 5) {
    document.getElementById("SeeMore").style.display = "block";
  } else {
    document.getElementById("SeeMore").style.display = "none";
  }
}); // i wanted to use offset as optional param but i couldn't to enchance code

// ==============DELETE BTN ==================================
jQuery("#contanier").on("click", ".delete", function (event) {
  //when delete button is clicked
  event.preventDefault();
  let count = parseInt(
    document.getElementById("contanier").getAttribute("data-count")
  );
  let page = parseInt(
    document.getElementById("contanier").getAttribute("data-page")
  );
  let posts_count = parseInt(
    document.getElementById("contanier").getAttribute("data-posts")
  );

  post_id = jQuery(this).attr("data-id"); //get id for post which is clicked on
  if (page > 1) {
    jQuery.ajax({
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      dataType: "html",

      data: {
        action: "delete_post",
        pid: post_id,
        offset: count * page,
      },
      success: function (posts) {
        document.getElementById("alert").innerText =
          "post " + post_id + " removed successfully"; // this is a notification message
        document.getElementById(post_id).style.display = "none"; // hide post from html
        // we can also use to remove it
        document.getElementById(post_id).remove();
        // or
        // document.getElementById(post_id).parentElement.removeChild(document.getElementById(post_id));
        document.getElementById("contanier").innerHTML = posts; // place the new posts html
        // jQuery("#contanier").attr("data-posts", parseInt(posts_count) - 1); // reclac posts total number
        // document.getElementById("SeeMore").style.display = "block";
      },
    });
  } else {
    jQuery.ajax({
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      dataType: "html",

      data: {
        action: "delete_post",
        pid: post_id,
      },
      success: function (posts) {
        document.getElementById("alert").innerText =
          "post " + post_id + " removed successfully";
        document.getElementById(post_id).style.display = "none";
        document.getElementById(post_id).remove();
        document.getElementById("contanier").innerHTML = posts;
        // jQuery("#contanier").attr("data-posts", parseInt(posts_count) - 1);
        // document.getElementById("SeeMore").style.display = "none";
      },
    });
  }
  jQuery("#contanier").attr("data-posts", parseInt(posts_count) - 1); // update number of posts total
  //   update see more condtion after change in posts number
  if (parseInt(jQuery("#contanier").attr("data-posts")) > 5) {
    document.getElementById("SeeMore").style.display = "block";
  } else {
    document.getElementById("SeeMore").style.display = "none";
  }
});

// ============== SEE MORE BTN =============================
jQuery("#SeeMore").on("click", function () {
  let count = parseInt(
    document.getElementById("contanier").getAttribute("data-count")
  );
  let page = parseInt(
    document.getElementById("contanier").getAttribute("data-page")
  );
  let posts_count = parseInt(
    document.getElementById("contanier").getAttribute("data-posts")
  );
  let limit = (page + 1) * count;
  if (
    // if user reached the end of posts / pages
    limit > posts_count &&
    document.getElementById("SeeMore").innerText == "See Less"
  ) {
    jQuery.ajax({
      // send call
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      data: {
        action: "display_posts",
      },
      success: function (posts) {
        jQuery("#contanier").attr("data-page", 1); //reset pages counter to 1
        document.getElementById("contanier").innerHTML = posts; // put posts html
        document.getElementById("SeeMore").innerText = "See More"; // reset / make button text
      },
    });
  } else {
    jQuery.ajax({
      // send call
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      data: {
        action: "see_more",
        page: page, //page number
        posts: posts_count, //posts total nubmer
        count: count, // posts count listed
      },
      success: function (posts) {
        jQuery("#contanier").attr("data-page", parseInt(page) + 1); //increase pages by 1
        jQuery("#contanier").append(posts); // add new posts to the page

        if (limit > posts_count) {
          //if user reached the end of posts change btn text
          document.getElementById("SeeMore").innerText = "See Less";
        }
      },
    });
  }
});
