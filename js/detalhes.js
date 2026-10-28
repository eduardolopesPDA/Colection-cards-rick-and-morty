(function () {
  const container = document.getElementById("details");
  const status = document.getElementById("details-status");
  const EPISODE_LIMIT = 6;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  function showError(message) {
    status.textContent = message;
    container.setAttribute("aria-busy", "false");
  }

  function statusChipClass(statusName) {
    if (statusName === "Alive") return "chip chip--alive";
    if (statusName === "Dead") return "chip chip--dead";
    return "chip chip--unknown";
  }

  function createHeartSVG() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS(ns, "path");
    path.setAttribute(
      "d",
      "M12 21s-7-4.5-9.5-8.5C.5 9 2.5 5 6.5 5c2 0 3.5 1.2 5.5 3.2C14 6.2 15.5 5 17.5 5c4 0 6 4 4 7.5C19 16.5 12 21 12 21z"
    );
    svg.appendChild(path);

    return svg;
  }

  function createFavoriteButton(character) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card__favorite";
    button.appendChild(createHeartSVG());

    function sync() {
      const active = window.RickMortyFavorites.has(character.id);
      button.classList.toggle("is-fav", active);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute(
        "aria-label",
        active ? "Remover dos favoritos" : "Adicionar aos favoritos"
      );
    }

    button.addEventListener("click", function () {
      window.RickMortyFavorites.toggle(character.id);
      sync();
    });

    sync();
    return button;
  }

  function createRow(label, value) {
    const row = document.createElement("div");
    row.className = "details__row";

    const term = document.createElement("dt");
    term.textContent = label;

    const description = document.createElement("dd");
    description.textContent = value;

    row.append(term, description);
    return row;
  }

  function render(character, episodeData) {
    const rarity = window.RickMortyCards.getRarity(character);
    const rarityLabel = window.RickMortyCards.RARITY_LABELS[rarity];

    const art = document.createElement("div");
    art.className = "details__art";

    const image = document.createElement("img");
    image.src = character.image;
    image.alt = "Retrato de " + character.name;
    image.width = 300;
    image.height = 300;

    const badge = document.createElement("span");
    badge.className = "card__rarity card__rarity--" + rarity;
    badge.textContent = rarityLabel;

    art.append(image, badge);

    const info = document.createElement("div");
    info.className = "details__info";

    const name = document.createElement("h1");
    name.className = "details__name";
    name.textContent = character.name;

    const chips = document.createElement("div");
    chips.className = "details__chips";

    const statusChip = document.createElement("span");
    statusChip.className = statusChipClass(character.status);
    statusChip.textContent = character.status || "Unknown";

    const speciesChip = document.createElement("span");
    speciesChip.className = "chip";
    speciesChip.textContent = character.species;

    const genderChip = document.createElement("span");
    genderChip.className = "chip";
    genderChip.textContent = character.gender;

    chips.append(statusChip, speciesChip, genderChip);

    const favoriteWrap = document.createElement("div");
    favoriteWrap.className = "details__favorite";
    favoriteWrap.append(createFavoriteButton(character));

    const rows = document.createElement("dl");
    rows.className = "details__rows";
    rows.append(
      createRow("Origem", character.origin ? character.origin.name : "Desconhecida"),
      createRow("Localização atual", character.location ? character.location.name : "Desconhecida"),
      createRow("Episódios", String(character.episode ? character.episode.length : 0))
    );

    const episodesTitle = document.createElement("h2");
    episodesTitle.className = "details__episodes-title";
    episodesTitle.textContent = "Últimos episódios listados";

    const episodes = document.createElement("ul");
    episodes.className = "details__episodes";

    episodeData.episodes.forEach(function (episode) {
      const item = document.createElement("li");
      item.textContent = episode.episode + " — " + episode.name;
      episodes.appendChild(item);
    });

    if (episodeData.remaining > 0) {
      const more = document.createElement("li");
      more.className = "details__episodes-more";
      more.textContent = "+ " + episodeData.remaining + " episódios";
      episodes.appendChild(more);
    }

    info.append(name, chips, favoriteWrap, rows, episodesTitle, episodes);
    container.append(art, info);
  }

  async function init() {
    if (!Number.isInteger(id) || id < 1) {
      showError("Personagem não encontrado. Volte para as cartas e tente de novo.");
      return;
    }

    try {
      const character = await window.RickMortyAPI.getCharacter(id);
      const episodeData = await window.RickMortyAPI.getEpisodes(character.episode, EPISODE_LIMIT);

      document.title = character.name + " | Colection Cards Rick and Morty";
      render(character, episodeData);
      status.hidden = true;
      container.setAttribute("aria-busy", "false");
    } catch (error) {
      showError("Não foi possível carregar o personagem. Verifique sua conexão e recarregue a página.");
      console.error(error);
    }
  }

  init();
})();
