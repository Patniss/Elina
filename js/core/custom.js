export function applyUserTheme(session) {
    const root = document.documentElement;

    root.style.setProperty("--user-primary", session.theme_color);
    root.style.setProperty("--bulma-primary-invert-l", session.button_text);
    root.style.setProperty("--user-background-url", `url("/Elina/css/backgrounds/${session.background}.jpg")`);
}