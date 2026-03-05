export function initToggleSection({
  toggleId,
  contentId,
  arrowId,
  hiddenClass = "is-hidden",
  iconOpen = "fa-chevron-down",
  iconClosed = "fa-chevron-right"
}) {
  const toggle = document.getElementById(toggleId);
  const content = document.getElementById(contentId);
  const arrow = document.getElementById(arrowId);

  if (!toggle || !content || !arrow) return;

  toggle.addEventListener("click", () => {
    const isHidden = content.classList.contains(hiddenClass);

    content.classList.toggle(hiddenClass, !isHidden);

    arrow.classList.replace(
      isHidden ? iconClosed : iconOpen,
      isHidden ? iconOpen : iconClosed
    );
  });
}

export function autoToggleSection({
  contentId,
  arrowId,
  hiddenClass = "is-hidden",
  iconOpen = "fa-chevron-down",
  iconClosed = "fa-chevron-right",
  auto = false
}) {
  const content = document.getElementById(contentId);
  const arrow = document.getElementById(arrowId);

  if (!content || !arrow) return;

  if (auto) {
    // afficher la section
    content.classList.remove(hiddenClass);
    arrow.classList.replace(iconClosed, iconOpen);
  } else {
    // cacher la section
    content.classList.add(hiddenClass);
    arrow.classList.replace(iconOpen, iconClosed);
  }
}

export function toggleDropdown(show, hide) {
  if (show.classList.contains("is-hidden")) {
    show.classList.remove("is-hidden");
    hide.classList.add("is-hidden");
  } else {
    show.classList.add("is-hidden");
  }
}