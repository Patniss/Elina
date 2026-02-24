import { loadProfile } from "/Elina/js/modules/dashboard/dashboard.js";

export async function customNavbar() {
  const session = await loadProfile();

  const navMovies = document.getElementById("navbar-item-movies");
  const navShows = document.getElementById("navbar-item-shows");
  const navDramas = document.getElementById("navbar-item-dramas");
  const navBooks = document.getElementById("navbar-item-books");

  if(!session.movies) navMovies.style.display = "none";
  if(!session.shows) navShows.style.display = "none";
  if(!session.dramas) navDramas.style.display = "none";
  if(!session.books) navBooks.style.display = "none";

  document.documentElement
      .style
      .setProperty('--user-primary', session.theme_color);
      
  document.documentElement
    .style
    .setProperty('--bulma-primary-invert-l', session.button_text);

  document.documentElement
    .style
    .setProperty('--user-background-url', `url("/Elina/css/backgrounds/${session.background}.jpg")`)
}

export async function loadNav() {
  const navContainer = document.getElementById("nav-container");
  if (!navContainer) return;

  const response = await fetch("/Elina/nav.html");
  const html = await response.text();
  navContainer.innerHTML = html;

  initNavbarBurger();
  initNavbarDropdowns();
  customNavbar();
}

function initNavbarBurger() {
  const burgers = document.querySelectorAll(".navbar-burger");

  burgers.forEach((burger) => {
    burger.addEventListener("click", () => {
      const targetId = burger.dataset.target;
      const target = document.getElementById(targetId);

      burger.classList.toggle("is-active");
      target.classList.toggle("is-active");
    });
  });
}

function initNavbarDropdowns() {
  const dropdowns = document.querySelectorAll(".mobile-dropdown");

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(".navbar-link");

    link.addEventListener("click", (e) => {
      // mobile uniquement
      if (window.innerWidth <= 1023) {
        e.preventDefault();
        e.stopPropagation();

        dropdown.classList.toggle("is-active");
      }
    });
  });
}
const navbarItems = document.querySelectorAll(".navbar-item a");

navbarItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
      const menu = document.querySelector(".navbar-menu");
      menu.classList.remove("is-active");
      const burger = document.querySelector(".navbar-burger");
      burger.classList.remove("is-active");
    }
  });
});