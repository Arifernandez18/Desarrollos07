const slides = Array.from(document.querySelectorAll('.equipment-slide'));
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
const status = document.querySelector('.carousel-status');
let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === currentSlide);
  });
  if (status) status.textContent = `${currentSlide + 1} / ${slides.length}`;
}

prevButton?.addEventListener('click', () => showSlide(currentSlide - 1));
nextButton?.addEventListener('click', () => showSlide(currentSlide + 1));

showSlide(0);


/* ---- scroll reveal animations ---- */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // section-level fade-up
  var sections = document.querySelectorAll("main > section, .site-footer");
  sections.forEach(function (el) { el.classList.add("reveal"); });

  // staggered children inside these groups
  var groups = document.querySelectorAll(".values-strip, .service-grid, .spec-list, .stats-row, .mission-band, .footer-grid, .category-grid, .product-grid");
  groups.forEach(function (group) {
    var kids = Array.prototype.slice.call(group.children);
    kids.forEach(function (kid, i) {
      kid.classList.add("reveal-child");
      kid.style.transitionDelay = (i * 80) + "ms";
    });
  });

  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal, .reveal-child"));

  function reveal(el) { el.classList.add("is-visible"); }

  // 1) reveal anything already in (or near) the viewport on load, so above-fold content never stays hidden
  function revealInView() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    items.forEach(function (el) {
      if (el.classList.contains("is-visible")) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) reveal(el);
    });
  }

  // 2) IntersectionObserver for below-fold elements as you scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(reveal);
  }

  requestAnimationFrame(revealInView);
  window.addEventListener("load", revealInView);

  // 3) safety backstop: never leave content hidden if observer/scroll never fires
  setTimeout(function () {
    items.forEach(function (el) {
      el.classList.add("is-visible");
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }, 2600);
})();


/* ---- selector de tipo de servicio (tabs) ---- */
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.svc-tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.svc-panel'));
  if (!tabs.length) return;

  function activate(name, instant) {
    tabs.forEach(function (t) { t.setAttribute('aria-selected', t.dataset.tab === name ? 'true' : 'false'); });
    panels.forEach(function (p) {
      var on = p.dataset.panel === name;
      p.classList.toggle('is-active', on);
      if (on && instant) {
        p.querySelectorAll('.reveal, .reveal-child').forEach(function (el) {
          el.classList.add('is-visible');
          el.style.transition = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { activate(t.dataset.tab, true); });
  });

  window.addEventListener('hashchange', function () {
    if (location.hash === '#hospedaje') activate('hospedaje', true);
  });

  if (location.hash === '#hospedaje') activate('hospedaje', true);
})();
