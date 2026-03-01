import { loadProfile } from "/Elina/js/modules/dashboard/dashboard.js";
import { applyUserTheme } from "/Elina/js/core/custom.js";

const NAV_ITEMS = [
  { id: "navbar-item-movies", keys: "movies" },
  { id: "navbar-item-shows", keys: "shows" },
  { id: "navbar-item-dramas", keys: "dramas" },
  { id: "navbar-item-animes", keys: "animes" },
  { id: "navbar-item-books", keys: "books" },
  { id: "navbar-item-recipes", keys: "recipes" },
  { id: "navbar-item-movies", keys: "movies" },
  { id: "navbar-item-cleaning", keys: "cleaning" },
  { id: "navbar-item-budget", keys: "budget" },
  { id: "navbar-item-todo", keys: "todo" },
  { id: "navbar-item-pro", keys: "pro" },
  { id: "navbar-item-moodboard", keys: "moodboard" },
  { id: "navbar-item-travel", keys: "travel" },
  { id: "navbar-item-crochet", keys: "crochet" },
  { id: "navbar-item-candles", keys: "candles" },
  { id: "navbar-item-aromazone", keys: "aromazone" },
  { id: "navbar-item-sport", keys: "sport" },
  { id: "navbar-item-period", keys: "period" }
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