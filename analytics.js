(function () {
  var measurementId = "G-083MSQKPFX";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!link || !window.gtag) return;

    var url;
    try {
      url = new URL(link.href);
    } catch (_) {
      return;
    }

    var isExternal = url.hostname && url.hostname !== window.location.hostname;
    var isAffiliate = /sponsored|affiliate/i.test(link.rel || "") || /amazon\.com|audible|headspace/i.test(link.href);

    if (isAffiliate || isExternal) {
      window.gtag("event", isAffiliate ? "affiliate_click" : "outbound_click", {
        link_url: link.href,
        link_text: (link.textContent || "").trim().slice(0, 100),
        page_location: window.location.href
      });
    }
  });
})();
