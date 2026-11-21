/* polish.js - স্ক্রলে সেকশন ফোটা, স্ক্রল রেখা, হেডারের ছায়া ও "ওপরে যাও" বাটন */

(function () {
  "use strict";

  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var html = document.documentElement;

  /* ---------- ১. স্ক্রলে সেকশন ধীরে ধীরে ফুটে ওঠা ---------- */
  function setupReveal() {
    if (reduce || !("IntersectionObserver" in window)) {
      return;
    }

    var sections = document.querySelectorAll(".section");
    if (!sections.length) {
      return;
    }

    var viewHeight = window.innerHeight || 800;

    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("in");
            observer.unobserve(entries[i].target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    for (var j = 0; j < sections.length; j++) {
      var s = sections[j];
      s.classList.add("reveal");

      // যেগুলো আগে থেকেই পর্দায় আছে সেগুলো সঙ্গে সঙ্গে দেখানো (ঝলক এড়াতে)
      if (s.getBoundingClientRect().top < viewHeight * 0.9) {
        s.classList.add("in");
      } else {
        observer.observe(s);
      }
    }

    html.classList.add("js-reveal");
  }

  /* ---------- ২. স্ক্রল রেখা, হেডারের ছায়া, "ওপরে যাও" বাটন ---------- */
  var STR = {
    en: { top: "Back to top" },
    bn: { top: "ওপরে যাও" }
  };

  function getStr() {
    var lang = window.TS_I18N ? window.TS_I18N.getLang() : "en";
    return STR[lang] || STR.en;
  }

  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  var toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
  toTop.setAttribute("aria-label", getStr().top);
  document.body.appendChild(toTop);

  var header = document.getElementById("top");
  var ticking = false;

  function update() {
    ticking = false;

    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(1, y / max) : 0;

    bar.style.transform = "scaleX(" + progress + ")";

    if (y > 600) {
      toTop.classList.add("show");
    } else {
      toTop.classList.remove("show");
    }

    if (header) {
      if (y > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  document.addEventListener("tsi18n:changed", function () {
    toTop.setAttribute("aria-label", getStr().top);
  });

  /* ---------- শুরু ---------- */
  setupReveal();
  update();
})();