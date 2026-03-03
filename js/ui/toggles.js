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
  show.classList.toggle("is-hidden");
  hide.classList.add("is-hidden");
}