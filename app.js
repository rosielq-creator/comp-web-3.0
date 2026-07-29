const languageButton = document.querySelector(".language-button");
const languageMenu = document.querySelector(".language-menu");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const workFilters = document.querySelector(".work-filters");
const workGroups = document.querySelectorAll(".work-brand-group");

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

workFilters?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-work-filter]");
  if (!button) return;

  const filter = button.dataset.workFilter;
  workFilters.querySelectorAll("button").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });

  workGroups.forEach((group) => {
    group.hidden =
      filter !== "all" && group.dataset.workCategory !== filter;
  });
});

document.querySelectorAll(".show-more-button").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".work-brand-group");
    const more = group?.querySelector(".work-more");
    if (!group || !more) return;

    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.firstChild.textContent = expanded ? "Show more " : "Show less ";
    more.setAttribute("aria-hidden", String(expanded));
    group.classList.toggle("is-expanded", !expanded);
  });
});
