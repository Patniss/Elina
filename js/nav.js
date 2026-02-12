export async function loadNav() {
  const navContainer = document.getElementById("nav-container");
  if (!navContainer) return;

  const response = await fetch("/Elina/nav.html");
  const html = await response.text();
  navContainer.innerHTML = html;

  initNavbarBurger();
  initNavbarDropdowns();
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

export async function customNavbar() {
  console.log(session);
}