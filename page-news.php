<?php
require_once 'header.php';
$current_user = wp_get_current_user();
$display_name = $current_user->display_name;
$display_id = $current_user->ID;
// get_the_author_meta('ID'); 
$author_avatar = get_avatar($display_id, 32);
if (!defined('ABSPATH')) {
    exit;
}
if (!is_user_logged_in()) {
    echo "please log in first to see posts";
    wp_login_form(array(
        'echo' => true,
    ));
} else {

    $args = array(
        'post_type'        => 'post',
        'posts_per_page'   => 5,
        'post_status'      => 'publish',

    );
    $all_posts = get_posts($args);

    $count = array(
        'post_type'        => 'post',
        'posts_per_page'   => -1,
        'post_status'      => 'publish',

    );
    $posts_count = count(get_posts($count));
    // $author_id, $author_name;

?>

    <body>
        <div id="alert"></div>
        <div id="head" data-uid=<?php echo $display_id; ?>>
            <!-- <img src="https://www.pngarts.com/files/11/Avatar-PNG-Picture.png" alt="" id="icon"> -->
            <div id="icon"><?php echo $author_avatar ?></div>
            <input type="text" placeholder="what's in your mind" id="content">
            <button id="btnpost" class="btn">post</button>
        </div>
        <?php

        if ($all_posts) {
            // $author_id = get_the_author_meta('ID');
            // $author_name = get_the_author();


        ?>
            <div id="contanier" data-page="1" data-count="5" data-posts="<?php echo $posts_count; ?>">
                <?php foreach ($all_posts as $post) {
                    setup_postdata($post);
                ?>

                    <div class="post" id=<?php echo get_the_id(); ?>>
                        <div class="author_icon">
                            <div id="icon"><?php echo $author_avatar ?></div>
                        </div>
                        <div class="author_post">
                            <div class="author-name"><?php echo $display_name; ?></div>
                            <div>
                                <?php echo the_content(); ?>
                            </div>
                        </div>
                        <button class="delete btn" data-id=<?php echo get_the_id(); ?>>Delete</button>
                    </div>
            <?php

                }
                wp_reset_postdata();
            } else {
                echo 'No More Posts Found.';
            }
            ?>
            </div>
            <?php if ($posts_count > 5) { ?>
                <button id="SeeMore" class="btn">See More</button>
            <?php } ?>
    </body>

<?php
}
require_once 'footer.php';
