"use strict";
/* <![CDATA[ */
var TRX_ADDONS_STORAGE = {
  // "ajax_url": "http:\/\/stevenwatkins.axiomthemes.com\/wp-admin\/admin-ajax.php",
  "ajax_nonce": "d7b3d317fd",
  "site_url": "http:\/\/stevenwatkins.axiomthemes.com",
  "vc_edit_mode": "0",
  "popup_engine": "magnific",
  "menu_cache": [],
  "user_logged_in": "0",
  "email_mask": "^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$",
  "msg_ajax_error": "Invalid server answer!",
  "msg_magnific_loading": "Loading image",
  "msg_magnific_error": "Error loading image",
  "msg_error_like": "Error saving your like! Please, try again later.",
  "msg_field_name_empty": "The name can't be empty",
  "msg_field_email_empty": "Too short (or empty) email address",
  "msg_field_email_not_valid": "Invalid email address",
  "msg_field_text_empty": "The message text can't be empty",
  "msg_send_complete": "Send message complete!",
  "msg_send_error": "Transmit failed!",
  "login_via_ajax": "1",
  "msg_login_empty": "The Login field can't be empty",
  "msg_login_long": "The Login field is too long",
  "msg_password_empty": "The password can't be empty and shorter then 4 characters",
  "msg_password_long": "The password is too long",
  "msg_login_success": "Login success! The page should be reloaded in 3 sec.",
  "msg_login_error": "Login failed!",
  "msg_not_agree": "Please, read and check 'Terms and Conditions'",
  "msg_email_long": "E-mail address is too long",
  "msg_email_not_valid": "E-mail address is invalid",
  "msg_password_not_equal": "The passwords in both fields are not equal",
  "msg_registration_success": "Registration success! Please log in!",
  "msg_registration_error": "Registration failed!",
  "scroll_to_anchor": "1",
  "update_location_from_anchor": "0",
  "msg_sc_googlemap_not_avail": "Googlemap service is not available",
  "msg_sc_googlemap_geocoder_error": "Error while geocode address"
};
/* ]]> */

/* <![CDATA[ */
var STEVENWATKINS_STORAGE = {
  // "ajax_url": "http:\/\/stevenwatkins.axiomthemes.com\/wp-admin\/admin-ajax.php",
  "ajax_nonce": "d7b3d317fd",
  "site_url": "http:\/\/stevenwatkins.axiomthemes.com",
  "user_logged_in": "",
  "mobile_layout_width": "959",
  "menu_stretch": "1",
  "menu_animation_in": "fadeInUpSmall",
  "menu_animation_out": "fadeOutDownSmall",
  "background_video": "",
  "use_mediaelements": "1",
  "message_maxlength": "1000",
  "site_scheme": "scheme_default",
  "admin_mode": "",
  "email_mask": "^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$",
  "strings": {
    "ajax_error": "Invalid server answer!",
    "error_global": "Error data validation!",
    "name_empty": "The name can&#039;t be empty",
    "name_long": "Too long name",
    "email_empty": "Too short (or empty) email address",
    "email_long": "Too long email address",
    "email_not_valid": "Invalid email address",
    "text_empty": "The message text can&#039;t be empty",
    "text_long": "Too long message text",
    "search_error": "Search error! Try again later.",
    "send_complete": "Send message complete!",
    "send_error": "Transmit failed!"
  },
  "menu_hover": "fade",
  "menu_hover_color": "#ec3449",
  "button_hover": "slide_left",
  "alter_link_color": "#3fb9be"
};
/* ]]> */
jQuery(document).ready(function() {
  setTimeout(function() {
    jQuery.post(TRX_ADDONS_STORAGE['ajax_url'], {
      action: 'post_counter',
      nonce: TRX_ADDONS_STORAGE['ajax_nonce'],
      post_id: 326,
      views: 1
    }).done(function(response) {
      var rez = {};
      try {
        rez = JSON.parse(response);
      } catch (e) {
        rez = {
          error: TRX_ADDONS_STORAGE['ajax_error']
        };
        // console.log(response);
      }
      if (rez.error === '') {
        jQuery('.post_counters_single .post_counters_views .post_counters_number').html(rez.counter);
      }
    });
  }, 10);


  // Accordion
  jQuery('#accordion .accordion-content').hide();
  jQuery('#accordion h4:first').addClass('active').next().slideDown('slow');
  jQuery('#accordion h4').click(function() {
    if(jQuery(this).next().is(':hidden')) {
      jQuery('#accordion h4').removeClass('active').next().slideUp('slow');
      jQuery(this).toggleClass('active').next().slideDown('slow');
    }
  });
  jQuery("ul#tabs li").click(function(e){
    if (!jQuery(this).hasClass("active")) {
      var tabNum = jQuery(this).index();
      var nthChild = tabNum+1;
      jQuery("ul#tabs li.active").removeClass("active");
      jQuery(this).addClass("active");
      jQuery("ul#tab li.active").removeClass("active");
      jQuery("ul#tab li:nth-child("+nthChild+")").addClass("active");
    }
  });
});
var tribe_events_linked_posts = {"post_types":{"tribe_venue":"venue","tribe_organizer":"organizer"}};
var tribe_bootstrap_datepicker_strings = {"dates":{"days":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"daysShort":["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"daysMin":["S","M","T","W","T","F","S","S"],"months":["January","February","March","April","May","June","July","August","September","October","November","December"],"monthsShort":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"clear":"Clear","today":"Today"}};
var tribe_js_config = {"permalink_settings":"\/%postname%\/","events_post_type":"tribe_events","events_base":"http:\/\/stevenwatkins.axiomthemes.com\/events\/"};
var wc_single_product_params = {"i18n_required_rating_text":"Please select a rating","review_rating_required":"yes"};
var wc_add_to_cart_variation_params = {"i18n_no_matching_variations_text":"Sorry, no products matched your selection. Please choose a different combination.","i18n_make_a_selection_text":"Please select some product options before adding this product to your cart.","i18n_unavailable_text":"Sorry, this product is unavailable. Please choose a different combination."};
var tribe_js_config = {"permalink_settings":"\/%postname%\/","events_post_type":"tribe_events","events_base":"http:\/\/stevenwatkins.axiomthemes.com\/events\/"};
var sb_instagram_js_options = {"sb_instagram_at":"3978570070.3a81a9f.f04daf1905c74ff7bb1386e6741d85b7"};
// var mySwiper = new Swiper ('.swiper-container', {
//   // Optional parameters
//   loop: true,
//   slidesPerView: 3,
// });
var woocommerce_price_slider_params = {
    "currency_symbol": "$",
    "currency_pos": "left",
    "min_price": "",
    "max_price": ""
};
