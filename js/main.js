(function () {
  const grid = document.getElementById("cards-grid");
  const status = document.getElementById("cards-status");
  const rarityBar = document.getElementById("rarity-filters");
  const progressLabel = document.getElementById("progress-label");
  const progressFill = document.getElementById("progress-fill");

  function done() {
    grid.setAttribute("aria-busy", "false");
  }

  function updateProgress() {
    const revealed = window.RickMortyProgress.count();
    const total = grid.querySelectorAll(".card").length;
    progressLabel.textContent = "Reveladas: " + revealed + "/" + total;
    progressFill.style.width = total > 0 ? (revealed / total) * 100 + "%" : "0%";
  }

  async function init() {
    try {
      const characters = await window.RickMortyAPI.listPages([1, 2]);
      window.RickMortyCards.renderCards(characters, grid);
      window.RickMortyFilters.setup(grid, rarityBar);
      window.RickMortyProgress.onChange(updateProgress);
      updateProgress();
      status.hidden = true;
      done();
    } catch (error) {
      status.textContent =
        "Não foi possível carregar os personagens. Verifique sua conexão e recarregue a página.";
      done();
      console.error(error);
    }
  }

  init();
})();
