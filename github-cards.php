<?php

/**
 * Plugin Name:       Github Profile Card
 * Plugin URI:        https://github.com
 * Description:       Display a Profile summary through Github's API
 * Version:           1.10.3
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Manoj Kumar
 * Author URI:        https://manojkumar.online
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       github-profile-card
 * Domain Path:       /languages
 */

if( !defined("ABSPATH") ) {
    echo "You don't have access to this publicly";
    die();
}

function custom_scripts() {
    $js_src = plugin_dir_url(__FILE__).'js/script.js';
    $js_ver = filemtime(plugin_dir_path(__FILE__).'js/script.js');

    $css_src = plugin_dir_url(__FILE__).'css/style.css';
    $css_ver = filemtime(plugin_dir_path(__FILE__).'css/style.css');

    wp_enqueue_script("github-profile", $js_src, array('jquery'), $js_ver, true);
    wp_enqueue_style("github-profile", $css_src, "", $css_ver);
}

add_action("wp_enqueue_scripts", "custom_scripts");

function github_shortcode_fn() {
    ob_start();
    include "card.php";
    $html = ob_get_clean();
    return $html;
}

add_shortcode("github-profile-search", "github_shortcode_fn");