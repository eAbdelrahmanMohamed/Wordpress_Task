<?php
wp_enqueue_style('style', get_stylesheet_uri());
wp_enqueue_script('script', get_template_directory_uri() . './main.js', array('jquery'), 1.1, true);
add_action('wp_ajax_nopriv_display_posts', 'display_posts');
add_action('wp_ajax_display_posts', 'display_posts');
function display_posts($args = array(
    'post_type'        => 'post',
    'posts_per_page'   => 5,
    'post_status'      => 'publish',
))
{

    $current_user = wp_get_current_user();
    $display_name = $current_user->display_name;
    $display_id = $current_user->ID;
    $author_avatar = get_avatar($display_id, 32);

    ob_start();
    $all_posts = get_posts($args);
    // var_dump($args);
    // wp_die();
    if ($all_posts) {
        foreach ($all_posts as $post) {
            setup_postdata($post);
?>

            <div class="post" id=<?php echo $post->ID; ?>>
                <div class="author_icon">
                    <div id="icon"><?php echo $author_avatar ?></div>
                </div>
                <div class="author_post">
                    <div class="author-name"><?php echo $display_name ?></div>
                    <div><?php echo $post->post_content; ?></div>
                </div>
                <button class="delete" data-id=<?php echo $post->ID ?>>Delete</button>
            </div>
<?php
        }
        wp_reset_postdata();
    } else {
        echo 'No posts found.';
    }


    $html = ob_get_clean();
    echo $html;
    wp_die();
}

// ===========================================================
add_action('wp_ajax_nopriv_create_post', 'create_post');
add_action('wp_ajax_create_post', 'create_post');
function create_post()
{
    $content = $_POST['content'];
    $user_ID = $_POST['user_id'];
    $counter = 1;
    $ismore = isset($_POST['offset']);
    $new_post = array(
        'post_title' => 'custom posts ' . $counter++,
        'post_content' => $content,
        'post_status' => 'publish',
        'post_date' => date('Y-m-d H:i:s'),
        'post_author' => $user_ID,
        'post_type' => 'post',
        'post_category' => array(0)
    );
    wp_insert_post($new_post);
    // $counter++;
    if ($ismore) {

        return display_posts(array(
            'post_type'        => 'post',
            'posts_per_page'   => $_POST['offset'] + 1,
            'post_status'      => 'publish',
        ));
    } else {
        return display_posts();
    }
}
// ----------------------------
add_action('wp_ajax_nopriv_delete_post', 'delete_post');
add_action('wp_ajax_delete_post', 'delete_post');
function delete_post()
{
    // $post_id = $_POST['pid'];
    $post_id = $_POST['pid'];
    $ismore = isset($_POST['offset']);

    wp_delete_post($post_id);
    if ($ismore) {

        return display_posts(array(
            'post_type'        => 'post',
            'posts_per_page'   => $_POST['offset'] - 1,
            'post_status'      => 'publish',
        ));
    } else {
        return display_posts();
    }
}
// ---------------------------------
add_action('wp_ajax_nopriv_see_more', 'see_more');
add_action('wp_ajax_see_more', 'see_more');
function see_more()
{
    $posts_per_page = $_POST['posts'];
    $posts_count = $_POST['count'];
    $page = $_POST['page'];
    $offset = intval($posts_count) * intval($page);
    display_posts(array(
        'post_type'        => 'post',
        'post_status'      => 'publish',
        'posts_per_page'   => $posts_count,
        'offset'           => $offset,

    ));
    wp_die();
}
