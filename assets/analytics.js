/* Analytics + public visitor counter
 *
 * 1) GoatCounter (free, no cookies) -> powers the visitor numbers shown in the footer.
 *    Sign up at https://www.goatcounter.com, choose a site code (e.g. "jilian"), then set it below.
 *    In GoatCounter: Settings -> tick "Allow adding visitor counts on your website" -> Save.
 * 2) Google Analytics 4 (optional, private dashboard) -> paste your Measurement ID below.
 * Placeholders do nothing, so the site never breaks.
 */
(function () {
  'use strict';

  var GC_CODE = 'jilian';      // <-- your GoatCounter site code
  var GA_ID   = 'G-XXXXXXXXXX';   // <-- optional Google Analytics Measurement ID

  var gcOn = /^[a-z0-9-]{2,}$/i.test(GC_CODE) && GC_CODE !== 'YOUR-CODE';
  var gaOn = /^G-[A-Z0-9]{6,}$/.test(GA_ID) && GA_ID !== 'G-XXXXXXXXXX';
  var dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1';
  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';
  var collect = !dnt && !isLocal;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  function loadScript(src, attrs) {
    var s = document.createElement('script');
    s.async = true; s.src = src;
    for (var k in attrs) s.setAttribute(k, attrs[k]);
    document.head.appendChild(s);
  }

  // Custom events (CV clicks, project clicks, etc.)
  function track(name, params) {
    if (!collect) return;
    try { if (gaOn) gtag('event', name, params || {}); } catch (e) {}
    try {
      if (gcOn && window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: 'event/' + name, title: name, event: true });
      }
    } catch (e) {}
  }
  window.trackEvent = track;

  if (collect && gcOn) {
    loadScript('https://gc.zgo.at/count.js', { 'data-goatcounter': 'https://' + GC_CODE + '.goatcounter.com/count' });
  }
  if (collect && gaOn) {
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID));
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  // Show public visitor numbers in the footer (works from any page that has #visitStats)
  function showStats() {
    var box = document.getElementById('visitStats');
    if (!box || !gcOn) return;
    fetch('https://' + GC_CODE + '.goatcounter.com/counter/TOTAL.json')
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var c = document.getElementById('visitCount'), u = document.getElementById('visitUnique');
        if (c) c.textContent = d.count;
        if (u) u.textContent = d.count_unique || d.count;
        box.hidden = false;
      })
      .catch(function () { /* keep hidden if counter is unavailable */ });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showStats);
  else showStats();

  // Click tracking
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    var custom = el.getAttribute('data-analytics');
    if (custom) { track(custom, { link_url: el.getAttribute('href') || '' }); return; }
    var href = el.getAttribute('href') || '';
    var m = href.match(/projects\/([^\/]+)\/?/);
    if (m) { track('project_click', { project_name: m[1] }); return; }
    if (/^https?:\/\//i.test(href) && href.indexOf(location.hostname) === -1) track('outbound_click', { link_url: href });
  });

  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'contactForm') track('contact_form_submit');
  });
})();
