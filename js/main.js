(function () {
  const grid = document.getElementById("cards-grid");
  const status = document.getElementById("cards-status");

  function done() {
    grid.setAttribute("aria-busy", "false");
  }

  async function init() {
    try {
      const characters = await window.RickMortyAPI.listPages([1, 2]);
      window.RickMortyCards.renderCards(characters, grid);
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
