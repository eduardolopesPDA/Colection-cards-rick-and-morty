window.RickMortyFilters = (function () {
  function setup(grid, bar) {
    const buttons = Array.from(bar.querySelectorAll(".filter-chip"));
    const cards = Array.from(grid.querySelectorAll(".card"));

    buttons.forEach(function (button) {
      const rarity = button.dataset.rarity;
      const count =
        rarity === "all"
          ? cards.length
          : cards.filter(function (card) {
              return card.dataset.rarity === rarity;
            }).length;

      const countEl = button.querySelector(".filter-chip__count");
      if (countEl) countEl.textContent = String(count);

      button.addEventListener("click", function () {
        select(rarity);
      });
    });

    function select(rarity) {
      buttons.forEach(function (button) {
        const active = button.dataset.rarity === rarity;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      cards.forEach(function (card) {
        card.hidden = rarity !== "all" && card.dataset.rarity !== rarity;
      });
    }
  }

  return { setup };
})();
