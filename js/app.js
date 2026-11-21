/* app.js - Phase 4: Sidebar, Hamburger মেনু, আইকন ও Active হাইলাইট */

(function () {
  var menuToggle = document.getElementById("menu-toggle");
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  var closeBtn = document.getElementById("sidebar-close");

  if (!menuToggle || !sidebar || !overlay) {
    return;
  }

  /* ---------- মেনু খোলা ও বন্ধ ---------- */
  function openMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
    document.body.classList.add("no-scroll");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
  }

  function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }

  menuToggle.addEventListener("click", function () {
    if (sidebar.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      closeMenu();
    }
  });

  /* ---------- আইকনের তালিকা (প্রতিটি লিংকের জন্য) ---------- */
  var icons = {
    "#hero": '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    "#quick-test": '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    "#language": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3 3 15 0 18"/><path d="M12 3c-3 3-3 15 0 18"/>',
    "#practice": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    "#games": '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5"/><path d="M15 12h.01M18 13.5h.01"/>',
    "#statistics": '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    "#leaderboard": '<path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>',
    "#achievements": '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
    "#keyboard": '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    "#learning": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"/><path d="M4 19.5V21h16"/>',
    "about.html": '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    "contact.html": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    "privacy.html": '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/>',
    "terms.html": '<path d="M6 2h9l5 5v15H6V2z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>'
  };

  var links = sidebar.querySelectorAll(".sidebar-nav a");

  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var href = link.getAttribute("href");

    // আইকন বসানো
    if (icons[href]) {
      link.insertAdjacentHTML(
        "afterbegin",
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          icons[href] +
          "</svg>"
      );
    }

    // লিংকে চাপলে মেনু বন্ধ হবে
    link.addEventListener("click", closeMenu);
  }

  /* ---------- বর্তমান সেকশন হাইলাইট ---------- */
  function setActive(id) {
    for (var j = 0; j < links.length; j++) {
      if (links[j].getAttribute("href") === "#" + id) {
        links[j].classList.add("active");
        links[j].setAttribute("aria-current", "location");
      } else {
        links[j].classList.remove("active");
        links[j].removeAttribute("aria-current");
      }
    }
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        for (var k = 0; k < entries.length; k++) {
          if (entries[k].isIntersecting) {
            setActive(entries[k].target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    for (var m = 0; m < links.length; m++) {
      var h = links[m].getAttribute("href");
      if (h && h.charAt(0) === "#") {
        var section = document.querySelector(h);
        if (section) {
          observer.observe(section);
        }
      }
    }
  }
})();