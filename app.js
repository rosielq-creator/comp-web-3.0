const languageButton = document.querySelector(".language-button");
const languageMenu = document.querySelector(".language-menu");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

function setExpanded(button, panel, open) {
  button.setAttribute("aria-expanded", String(open));
  panel.setAttribute("aria-hidden", String(!open));
  panel.classList.toggle("is-open", open);
}

languageButton?.addEventListener("click", () => {
  const open = languageButton.getAttribute("aria-expanded") !== "true";
  setExpanded(languageButton, languageMenu, open);
});

languageMenu?.addEventListener("click", (event) => {
  const option = event.target.closest("[data-language]");
  if (!option) return;

  languageButton.querySelector("span").textContent = option.dataset.language;
  setExpanded(languageButton, languageMenu, false);
});

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  setExpanded(menuButton, mobileMenu, open);
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
});

document.addEventListener("click", (event) => {
  if (
    languageButton &&
    languageMenu &&
    !languageButton.contains(event.target) &&
    !languageMenu.contains(event.target)
  ) {
    setExpanded(languageButton, languageMenu, false);
  }
});
