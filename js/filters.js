window.RickMortyFilters = (function () {
  function setup(grid, bar) {
    const buttons = Array.from(bar.querySelectorAll(".filter-chip"));
    const cards = Array.from(grid.querySelectorAll(".card"));
    let currentMode = "all";

    function modeOf(button) {
      return button.dataset.filter || button.dataset.rarity;
    }

    function updateCounts() {
      buttons.forEach(function (button) {
        const countEl = button.querySelector(".filter-chip__count");
        if (!countEl) return;

        const mode = modeOf(button);
        let count;

        if (mode === "all") {
          count = cards.length;
        } else if (mode === "favorites") {
          count = window.RickMortyFavorites.count();
        } else {
          count = cards.filter(function (card) {
            return card.dataset.rarity === mode;
          }).length;
        }

        countEl.textContent = String(count);
      });
    }

    function select(mode) {
      currentMode = mode;

      buttons.forEach(function (button) {
        const active = modeOf(button) === mode;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      cards.forEach(function (card) {
        let show = true;
        if (mode === "favorites") {
          show = window.RickMortyFavorites.has(Number(card.dataset.id));
        } else if (mode !== "all") {
          show = card.dataset.rarity === mode;
        }
        card.hidden = !show;
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        select(modeOf(button));
      });
    });

    document.addEventListener("favoriteschange", function () {
      updateCounts();
      if (currentMode === "favorites") {
        select("favorites");
      }
    });

    updateCounts();
  }

  return { setup };
})();
