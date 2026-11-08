/* Analytics for the portfolio (Google Analytics 4).
 * 1. Create a free GA4 property at https://analytics.google.com
 * 2. Copy your Measurement ID (looks like G-ABC123XYZ9) and paste it below.
 * Until you do, nothing is loaded and no data is sent.
 * On project pages, include this file with: <script src="../../assets/analytics.js" defer></script>
 */
(function () {
  'use strict';

  var GA_ID = 'G-XXXXXXXXXX'; // <-- replace with your Measurement ID

  var enabled = /^G-[A-Z0-9]{6,}$/.test(GA_ID) && GA_ID !== 'G-XXXXXXXXXX';
  var dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1';
  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Safe wrapper: does nothing if analytics is off, so the site never breaks.
  function track(name, params) {
    if (!enabled || dnt || isLocal) return;
    try { gtag('event', name, params || {}); } catch (e) { /* ignore */ }
  }
  window.trackEvent = track;

  if (!enabled || dnt || isLocal) return; // respects Do Not Track and skips local testing

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });

  // Event tracking via click delegation
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;

    var custom = el.getAttribute('data-analytics');
    if (custom) {
      track(custom, { link_url: el.getAttribute('href') || '', page_location: location.href });
      return;
    }

    var href = el.getAttribute('href') || '';

    // Project detail clicks
    var m = href.match(/projects\/([^\/]+)\/?/);
    if (m) { track('project_click', { project_name: m[1] }); return; }

    // Outbound links (e.g. GitHub)
    if (/^https?:\/\//i.test(href) && href.indexOf(location.hostname) === -1) {
      track('outbound_click', { link_url: href });
    }
  });

  // Contact form (the "Prepare email" action)
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'contactForm') track('contact_form_submit');
  });
})();
