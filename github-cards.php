<?php

/**
 * Plugin Name:       Flair - Github
 * Plugin URI:        https://github.com/M4N0JKUM4R/WordPress-Github-Cards
 * Description:       Display a profile summary through Github's API
 * Version:           1.0.1
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Manoj Kumar
 * Author URI:        https://manojkumar.online
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       Flair-Github
 * Domain Path:       /languages
 */

if( !defined("ABSPATH") ) {
    echo "You don't have access to this publicly";
    die();
}

// Add shortcode [github-flair] with an attribute user

function gshf_github_shortcode_fn( $atts ) {

    // Add necessary scripts and styles - Link their versions automatically based on the server functions

    $js_src = plugin_dir_url(__FILE__).'js/script-min.js';
    $js_ver = filemtime(plugin_dir_path(__FILE__).'js/script-min.js');
    
    $css_src = plugin_dir_url(__FILE__).'css/style-min.css';
    $css_ver = filemtime(plugin_dir_path(__FILE__).'css/style-min.css');
    
    wp_enqueue_script("gshf-github-profile", $js_src, array('jquery'), $js_ver, true);
    wp_enqueue_style("gshf-github-profile", $css_src, "", $css_ver);
    
    // Default shortcode that can be overwritten

    $attr = shortcode_atts( array(
        "user" => "Github",
        "show-search" => "yes",
        "total-results" => "25"
    ), $atts);

    ob_start();
    
    ?>

    <!-- Card render -->

    <div class="gshf-container" data-user="<?php echo $attr['user']; ?>" >

        <?php if( $attr['show-search'] == "yes") { ?> 
            <form class="gshf-search" data-results="<?php echo $attr['total-results'] ?>">
                <input type="search" class="gshf-search-user" placeholder="Enter at least 3 characters" />
                <div class="gshf-search-output">
                </div>
            </form>
        <?php } ?>
        <div class="gshf-user-card">
        </div>
        <div class="gshf-loader">
            <div class="gshf-loader-progress"></div>
        </div>
    </div>

    <!-- Finish Card rendering -->

    <?php

    $html = ob_get_clean();
    return $html;
}

add_shortcode("github-flair", "gshf_github_shortcode_fn");