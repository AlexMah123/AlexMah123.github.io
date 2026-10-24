// Shared site behaviour: header/footer injection, tab navigation, screenshot viewer and analytics.
// Loaded with "defer" on every page, so the DOM is already parsed when this runs.
(function () {
  const GA_MEASUREMENT_ID = 'G-9QCRQ7NQCZ';
  const isHomePage = document.getElementById('home') !== null;

  async function loadPartial(selector, url) {
    const target = document.querySelector(selector);
    if (!target) return;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      target.innerHTML = await response.text();
    } catch (error) {
      console.error(`Error loading ${url}:`, error);
    }
  }

  // The content region matching the URL hash, defaulting to #home.
  function currentRegion() {
    const region = document.getElementById(location.hash.slice(1));
    return region && region.classList.contains('content-region') ? region : document.getElementById('home');
  }

  function highlightMenu(region) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${region.id}`);
    });
  }

  function showTab() {
    const region = currentRegion();
    document.querySelectorAll('.content-region').forEach(r => r.classList.toggle('hide', r !== region));
    highlightMenu(region);

    // Tabs act as pages, so start at the top instead of the browser's jump to the #anchor.
    window.scrollTo(0, 0);
  }

  // Clicking a screenshot opens it full size; click anywhere or press Escape to close.
  function setupScreenshotViewer() {
    const images = document.querySelectorAll('.generic_image, .achievement_image');
    if (images.length === 0) return;

    const modal = document.createElement('div');
    modal.className = 'fullscreen-modal';
    modal.innerHTML = '<button class="close-btn" aria-label="Close">&times;</button><img class="fullscreen-image" alt="">';
    document.body.appendChild(modal);

    const fullscreenImage = modal.querySelector('img');
    const close = () => modal.classList.remove('active');

    images.forEach(image => image.addEventListener('click', () => {
      fullscreenImage.src = image.src;
      fullscreenImage.alt = image.alt;
      modal.classList.add('active');
    }));
    modal.addEventListener('click', event => {
      if (event.target !== fullscreenImage) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') close();
    });
  }

  // Google Analytics (gtag.js)
  function loadAnalytics() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  if (isHomePage) {
    showTab();
    window.addEventListener('hashchange', showTab);
    window.addEventListener('load', showTab);
  }
  setupScreenshotViewer();
  loadAnalytics();

  loadPartial('#header', '/header.html').then(() => {
    if (isHomePage) {
      highlightMenu(currentRegion());
    } else {
      // On subpages, menu links point back to the matching tab on the home page.
      document.querySelectorAll('.nav-link').forEach(link => {
        link.setAttribute('href', `/${link.getAttribute('href')}`);
      });
    }
  });

  loadPartial('#footer', '/footer.html').then(() => {
    const year = document.querySelector('.current-year');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
