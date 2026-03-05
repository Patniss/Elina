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

export function toggleDropdown(show, hide) {
  if (show.classList.contains("is-hidden")) {
    show.classList.add("is-hidden");
  } else {
    hide.classList.remove("is-hidden");
    show.classList.add("is-hidden");
  }
}