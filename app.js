const languageButton = document.querySelector(".language-button");
const languageMenu = document.querySelector(".language-menu");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const workFilters = document.querySelector(".work-filters");
const workGroups = [...document.querySelectorAll(".work-brand-group")];
const workLoadMore = document.querySelector(".work-load-more");
const WORK_BATCH_SIZE = 4;
let activeWorkFilter = "all";
let visibleWorkCount = WORK_BATCH_SIZE;

function updateVisibleWork() {
  const matchingGroups = workGroups.filter(
    (group) =>
      activeWorkFilter === "all" ||
      group.dataset.workCategory === activeWorkFilter,
  );

  workGroups.forEach((group) => {
    const matches = matchingGroups.includes(group);
    const index = matchingGroups.indexOf(group);
    const isVisible = matches && index < visibleWorkCount;

    group.hidden = !isVisible;
    group.dataset.pageVisible = String(isVisible);
    group.setAttribute("aria-hidden", String(!isVisible));
  });

  if (workLoadMore) {
    const remaining = matchingGroups.length - visibleWorkCount;
    workLoadMore.hidden = remaining <= 0;
    workLoadMore.dataset.pageVisible = String(remaining > 0);
    workLoadMore.querySelector("span").textContent = "Show more";
    workLoadMore.setAttribute(
      "aria-label",
      remaining > 0
        ? `Show ${Math.min(WORK_BATCH_SIZE, remaining)} more projects`
        : "All projects are shown",
    );
  }
}

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

  activeWorkFilter = button.dataset.workFilter;
  visibleWorkCount = WORK_BATCH_SIZE;
  workFilters.querySelectorAll("button").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });

  updateVisibleWork();
});

workLoadMore?.addEventListener("click", () => {
  visibleWorkCount = Math.min(
    visibleWorkCount + WORK_BATCH_SIZE,
    workGroups.filter(
      (group) =>
        activeWorkFilter === "all" ||
        group.dataset.workCategory === activeWorkFilter,
    ).length,
  );
  updateVisibleWork();
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

updateVisibleWork();
