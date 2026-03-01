import { loadProfile } from "/Elina/js/modules/dashboard/dashboard.js";
import { applyUserTheme } from "/Elina/js/core/custom.js";

const NAV_ITEMS = [
  { id: "navbar-item-movies", key: "movies" },
  { id: "navbar-item-shows", key: "shows" },
  { id: "navbar-item-dramas", key: "dramas" },
  { id: "navbar-item-animes", key: "animes" },
  { id: "navbar-item-books", key: "books" },
  { id: "navbar-item-recipes", key: "recipes" },
  { id: "navbar-item-movies", key: "movies" },
  { id: "navbar-item-cleaning", key: "cleaning" },
  { id: "navbar-item-budget", key: "budget" },
  { id: "navbar-item-todo", key: "todo" },
  { id: "navbar-item-pro", key: "pro" },
  { id: "navbar-item-moodboard", key: "moodboard" },
  { id: "navbar-item-travel", key: "travel" },
  { id: "navbar-item-crochet", key: "crochet" },
  { id: "navbar-item-candles", key: "candles" },
  { id: "navbar-item-aromazone", key: "aromazone" },
  { id: "navbar-item-sport", key: "sport" },
  { id: "navbar-item-period", key: "period" }
]

export async function customNavbar() {
  const session = await loadProfile();

  NAV_ITEMS.forEach(( id, key ) => {
    const element = document.getElementById(id);
    if (!element) return;

    if (!session[key]) {
      element.classList.add("is-hidden");
    }
  });

  applyUserTheme(session);
  
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