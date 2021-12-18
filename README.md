# Github-Profile-Card
 📣 WordPress plugin to show Github profile summary through their API.

![Github-profile-cards](https://user-images.githubusercontent.com/11471878/145589532-48c5a0cd-bcb9-446a-bb70-c81c5c83cb14.gif)

⚡️ Demo: 
https://manojkumar.online/lab/wp/github-profile-search/

After installing the plugin, just use this shortcode: [github-flair] in your posts, pages or widgets.

You can make use of the user attribute of the shortcode like this:

[github-flair user="WordPress"] 
where WordPress can be replaced by your desired Github username.

By default, the search function is enabled but if you need to remove it, you can do so with:

[github-flair show-search="no"]
You can also make use of the shortcode in your template files using this

<?php echo do_shortcode("[github-flair user='WordPress']") ; ?
