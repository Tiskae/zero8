const features = document.querySelectorAll(".feature");
const footer = document.querySelector(".footer");
const navLinksContainer = document.querySelector(".nav__list");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navMenuBtn = document.querySelector(".nav__menu--btn");
const navMenu = document.querySelector(".nav__menu");
const gallerySection = document.querySelector(".section-gallery");

navMenuBtn.addEventListener("click", function () {
  this.classList.toggle("open");
  navMenu.classList.toggle("hidden");
});

const stickyNav = function (entry) {
  const ent = entry[0];
  if (!ent.isIntersecting) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-50px",
});

headerObserver.observe(header);

[navLinksContainer, navMenu].forEach((el) => {
  el.addEventListener("click", function (e) {
    if (!e.target.classList.contains("nav__link")) return; // guard class
    e.preventDefault();
    const target = e.target;

    if (target.classList.contains("nav__link--inner")) {
      navMenu.classList.toggle("hidden");
    }

    const targetHref = target.getAttribute("href");
    console.log(targetHref);
    document.querySelector(targetHref).scrollIntoView({ behavior: "smooth" });
  });
});

const animateFeature = function (entry) {
  const ent = entry[0];
  if (ent.isIntersecting) {
    ent.target.classList.remove("hidden");
    featureObserver.unobserve(ent.target);
  }
};

const featureObserver = new IntersectionObserver(animateFeature, {
  root: null,
  threshold: 0.5,
});

[...features].forEach((e) => {
  e.classList.add("hidden");
  featureObserver.observe(e);
});

const imgs = document.querySelectorAll(".gallery__img");
let counter = 0;

imgs.forEach((img, index) => {
  img.style.transform = `translateX(${index * 100}%)`;
  img.style.display = "block";
});

function moveSlides() {
  imgs.forEach(
    (_, index) =>
      (document.querySelector(
        `.gallery__img--${index + 1}`
      ).style.transform = `translateX(${(index - counter) * 100}%)`)
  );
  if (counter < imgs.length - 1) {
    counter++;
  } else counter = 0;
}

moveSlides();
setInterval(moveSlides, 3000);

///////////////////////////////////////////////////////

gallerySection.classList.add("hidden");

const animateGallerySection = function (entry) {
  const ent = entry[0];
  if (ent.isIntersecting) {
    ent.target.classList.remove("hidden");
    gallerySectionObserver.unobserve(ent.target);
  }
};

const gallerySectionObserver = new IntersectionObserver(animateGallerySection, {
  root: null,
  threshold: 0.8,
});

gallerySectionObserver.observe(gallerySection);

///////////////////////////////////////////////////////

footer.classList.add("hidden");

const animateFooter = function (entry) {
  const ent = entry[0];
  if (ent.isIntersecting) {
    ent.target.classList.remove("hidden");
    footerObserver.unobserve(ent.target);
  }
};

const footerObserver = new IntersectionObserver(animateFooter, {
  root: null,
  threshold: 0.2,
});

footerObserver.observe(footer);
