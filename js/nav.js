// js/nav.js
export async function loadNav() {
  const navContainer = document.getElementById("nav-container");
  if (!navContainer) return;

  const response = await fetch("/nav.html");
  const html = await response.text();
  navContainer.innerHTML = html;
}