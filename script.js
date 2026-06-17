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
  var groups = document.querySelectorAll(".values-strip, .service-grid, .spec-list, .stats-row, .mission-band, .footer-grid");
  groups.forEach(function (group) {
    var kids = Array.prototype.slice.call(group.children);
    kids.forEach(function (kid, i) {
      kid.classList.add("reveal-child");
      kid.style.transitionDelay = (i * 80) + "ms";
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".reveal, .reveal-child").forEach(function (el) { io.observe(el); });
})();
