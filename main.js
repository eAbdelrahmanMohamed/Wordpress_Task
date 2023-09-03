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

jQuery("#btnpost").on("click", function () {
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
  jQuery(this).attr("disabled", true);

  Content = document.getElementById("content").value;
  uid = document.getElementById("head").getAttribute("data-uid");
  console.log("page " + page + " count " + count);
  if (Content === "") {
    alert("please fill posts content");
  } else if (page > 1) {
    jQuery.ajax({
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      data: {
        action: "create_post",
        dataType: "html",
        content: Content,
        offset: count * page,
        // user_id: uid,
      },
      success: function (posts) {
        jQuery("#btnpost").attr("disabled", false);

        document.getElementById("content").value = "";
        document.getElementById("contanier").innerHTML = posts;
        jQuery("#contanier").attr("data-posts", parseInt(posts_count) + 1);
      },
    });
  } else {
    jQuery.ajax({
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      data: {
        action: "create_post",
        dataType: "html",
        content: Content,
      },
      success: function (posts) {
        jQuery("#btnpost").attr("disabled", false);
        document.getElementById("content").value = "";
        document.getElementById("contanier").innerHTML = posts;
        jQuery("#contanier").attr("data-posts", parseInt(posts_count) + 1);
      },
    });
  }
});

jQuery("#contanier").on("click", ".delete", function (event) {
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
  let limit = (page + 1) * count;

  post_id = jQuery(this).attr("data-id");
  console.log("delete is clicked and id is " + post_id);
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
        //   console.log(posts);
        document.getElementById("alert").innerText =
          "post " + post_id + " removed successfully";
        document.getElementById(post_id).style.display = "none";
        document.getElementById("contanier").innerHTML = posts;
        jQuery("#contanier").attr("data-posts", parseInt(posts_count) - 1);
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
        //   console.log(posts);
        document.getElementById("alert").innerText =
          "post " + post_id + " removed successfully";
        document.getElementById(post_id).style.display = "none";
        document.getElementById("contanier").innerHTML = posts;
        jQuery("#contanier").attr("data-posts", parseInt(posts_count) - 1);
      },
    });
  }
});

// /////////////////////////////////////////////
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
    limit > posts_count &&
    document.getElementById("SeeMore").innerText == "See Less"
  ) {
    console.log("limit from 1 is " + limit + " and pcount " + posts_count);
    jQuery.ajax({
      // send call
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      data: {
        action: "display_posts",
      },
      success: function (posts) {
        jQuery("#contanier").attr("data-page", 1);

        document.getElementById("contanier").innerHTML = posts;
        document.getElementById("SeeMore").innerText = "See More";
      },
    });
  } else {
    console.log("limit from 2 is " + limit + " and pcount " + posts_count);

    jQuery.ajax({
      // send call
      type: "POST",
      url: jQuery("meta[name=ajax_url]").attr("content"),
      data: {
        action: "see_more",
        page: page,
        posts: posts_count,
        count: count,
      },
      success: function (posts) {
        jQuery("#contanier").attr("data-page", parseInt(page) + 1);

        jQuery("#contanier").append(posts);

        if (limit > posts_count) {
          // document.getElementById("SeeMore").style.display = "none";
          document.getElementById("SeeMore").innerText = "See Less";
        }
        //   if (limit < posts_count) {
        //     document.getElementById("SeeMore").style.display = "block";
        //   }
      },
    });
  }
});
