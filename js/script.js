$(document).ready(function() {

  'use strict';

  // =================
  // Responsive videos
  // =================

  $('.post-content').fitVids();

  // ===============
  // Off Canvas menu
  // ===============

  $('.off-canvas-toggle').click(function(event) {
    event.preventDefault();
    $('.off-canvas-container').toggleClass('is-active');
  });

  // ======
  // Search
  // ======

  var search_field = $('.search-form__field'),
      search_results = $('.search-results'),
      toggle_search = $('.toggle-search-button'),
      close_search = $('.close-search-button'),
      search_result_template = "\
        <div class='search-results__item'>\
          <a class='search-results__item__title' href='{{link}}'>{{title}}</a>\
        </div>";

  toggle_search.click(function(event) {
    event.preventDefault();
    $('.search-form-container').addClass('is-active');

    // If off-canvas is active, just disable it
    $('.off-canvas-container').removeClass('is-active');

    setTimeout(function() {
      search_field.focus();
    }, 500);
  });

  $('.search-form-container').on('keyup', function(event) {
    if (event.keyCode == 27) {
      $('.search-form-container').removeClass('is-active');
    }
  });

  $('.close-search-button').click(function() {
    $('.search-form-container').removeClass('is-active');
  });

  search_field.ghostHunter({
    results: search_results,
    onKeyUp         : true,
    rss             : base_url + '/feed.xml',
    zeroResultsInfo : false,
    info_template   : "<h4 class='heading'>Number of posts found: {{amount}}</h4>",
    item_preprocessor: function(item) {
      console.log(item);
      var ret = {};
      var thisDate = new Date(item.updated_at);
      var aWeekAgo = new Date(thisDate.getTime() - 1000*60*60*24*7);
      if (thisDate > aWeekAgo) {
          ret.recent = true;
      } else {
          ret.recent = false;
      }
      ret.day = "xxx";
      return ret;
    },
    result_template : search_result_template,
    before: function() {
      search_results.fadeIn();
    }
  });

  const headings = document.querySelectorAll('.heading-links h2,h3');
  const linkContent = '#';
  for (const heading of headings) {
      const linkIcon = document.createElement('a');
      linkIcon.className = "heading-link";
      linkIcon.setAttribute('href', `#${heading.id}`);
      linkIcon.innerHTML = linkContent;
      heading.appendChild(linkIcon);
  }

});