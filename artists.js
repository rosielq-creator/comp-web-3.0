const controls = document.querySelector(".directory-controls");
const filters = [...document.querySelectorAll("[data-artist-filter]")];
const cards = [...document.querySelectorAll("[data-artist-card]")];
const resultCount = document.querySelector(".result-count span");
const resetButton = document.querySelector(".reset-filters");
const emptyState = document.querySelector(".empty-state");
const emptyResetButton = emptyState?.querySelector("button");
const languageButton = document.querySelector(".language-button");
const languageMenu = document.querySelector(".language-menu");

function applyFilters() {
  const activeFilters = Object.fromEntries(
    filters.map((filter) => [filter.dataset.artistFilter, filter.value])
  );

  let visible = 0;

  cards.forEach((card) => {
    const matches = Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true;
      return card.dataset[key]?.split(" ").join(" ").includes(value);
    });

    card.hidden = !matches;
    if (matches) visible += 1;
  });

  const hasFilters = filters.some((filter) => filter.value);
  controls?.classList.toggle("has-filters", hasFilters);
  filters.forEach((filter) => filter.classList.toggle("has-value", Boolean(filter.value)));
  if (resultCount) resultCount.textContent = String(visible);
  if (emptyState) emptyState.hidden = visible !== 0;
}

function resetFilters() {
  filters.forEach((filter) => {
    filter.value = "";
  });
  applyFilters();
}

filters.forEach((filter) => filter.addEventListener("change", applyFilters));
resetButton?.addEventListener("click", resetFilters);
emptyResetButton?.addEventListener("click", resetFilters);

function setLanguageMenu(open) {
  if (!languageButton || !languageMenu) return;
  languageButton.setAttribute("aria-expanded", String(open));
  languageMenu.setAttribute("aria-hidden", String(!open));
  languageMenu.classList.toggle("is-open", open);
}

languageButton?.addEventListener("click", () => {
  setLanguageMenu(languageButton.getAttribute("aria-expanded") !== "true");
});

languageMenu?.addEventListener("click", (event) => {
  const option = event.target.closest("[data-language]");
  if (!option || !languageButton) return;
  languageButton.querySelector("span").textContent = option.dataset.language;
  setLanguageMenu(false);
});

document.addEventListener("click", (event) => {
  if (
    languageButton &&
    languageMenu &&
    !languageButton.contains(event.target) &&
    !languageMenu.contains(event.target)
  ) {
    setLanguageMenu(false);
  }
});
