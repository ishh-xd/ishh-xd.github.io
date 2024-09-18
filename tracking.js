
// Load Google Analytics script
(function() {
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-RF7VQ0FD8Z';
  document.head.appendChild(gtagScript);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());

  gtag('config', 'G-RF7VQ0FD8Z');
})();
