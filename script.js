// Wait for the document to load
(function ($) {
  $(window).on('load hashchange', function () {
    // Wait for the header to be loaded before applying the logic
    if (!document.querySelector('.main-menu')) {
      setTimeout(() => $(window).trigger('hashchange'), 100);
      return;
    }

    // Hide all content regions
    $('.content-region').hide();

    // Remove any active classes on the main-menu
    $('.main-menu a').removeClass('active');

    // Determine the current hash or default to the first menu item
    const region = location.hash || $('.main-menu a:first').attr('href');

    // Show the region specified in the hash
    $(region).show();

    // Highlight the active menu link
    $('.main-menu a[href="' + region + '"]').addClass('active');

    // If on a subpage, redirect to the main page with the correct hash
    const isSubPage = !window.location.pathname.endsWith('index.html');
    if (isSubPage && region) {
      const mainPageURL = `https://alexmah123.github.io/index.html${region}`;
      window.location.href = mainPageURL;
    }
  });
})(jQuery);


function openFullscreen(image) {
  // Get the modal and image elements
  const modal = document.getElementById("fullscreen-modal");
  const fullscreenImage = document.getElementById("fullscreen-image");
  
  // Set the modal image source to the clicked thumbnail's source
  fullscreenImage.src = image.src;

  // Show the modal
  modal.classList.add("active");
}

function closeFullscreen() {
  // Hide the modal
  const modal = document.getElementById("fullscreen-modal");
  modal.classList.remove("active");
}