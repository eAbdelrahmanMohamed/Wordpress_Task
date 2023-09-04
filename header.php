<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="ajax_url" content="<?php echo admin_url('admin-ajax.php'); ?>">

    <link rel="stylesheet" href="./style.css">
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <h1><a href="<?php echo home_url(); ?>">Home</a></h1>
    <!-- show pages links on home page only -->
    <?php if (is_home()) : ?>
        <header>
            <nav>
                <?php wp_nav_menu(array('theme_location' => 'main-menu')); ?>
            </nav>
        </header>
    <?php endif; ?>