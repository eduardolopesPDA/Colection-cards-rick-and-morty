window.RickMortyCards = (function () {
  const RARITY_LABELS = {
    legendary: "Lendária",
    epic: "Épica",
    rare: "Rara",
    common: "Comum",
  };

  function getRarity(character) {
    const name = (character.name || "").toLowerCase();
    if (name === "rick sanchez" || name.includes("smith")) {
      return "legendary";
    }
    const bucket = character.id % 10;
    if (bucket < 2) return "epic";
    if (bucket < 5) return "rare";
    return "common";
  }

  function padNumber(id) {
    return String(id).padStart(3, "0");
  }

  function statusChipClass(status) {
    if (status === "Alive") return "chip chip--alive";
    if (status === "Dead") return "chip chip--dead";
    return "chip chip--unknown";
  }

  function createSwirlSVG() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("card__cover-swirl");

    const path = document.createElementNS(ns, "path");
    path.setAttribute(
      "d",
      "M100 90 A15 15 0 0 1 120 100 A25 25 0 0 1 100 130 A35 35 0 0 1 60 100 A45 45 0 0 1 100 50 A55 55 0 0 1 160 100 A65 65 0 0 1 100 170 A75 75 0 0 1 20 100"
    );
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "7");
    path.setAttribute("stroke-linecap", "round");
    svg.appendChild(path);

    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", "100");
    circle.setAttribute("cy", "100");
    circle.setAttribute("r", "6");
    circle.setAttribute("fill", "currentColor");
    svg.appendChild(circle);

    return svg;
  }

  function createCover() {
    const cover = document.createElement("div");
    cover.className = "card__cover";
    cover.setAttribute("aria-hidden", "true");

    const mark = document.createElement("span");
    mark.className = "card__cover-mark";
    mark.textContent = "?";

    cover.append(createSwirlSVG(), mark);
    return cover;
  }

  function createRevealButton(article, character) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card__reveal";
    button.setAttribute("aria-label", "Revelar carta");

    button.addEventListener("click", function () {
      article.classList.add("is-revealed");
      button.hidden = true;
      window.RickMortyProgress.reveal(character.id);
      article.focus({ preventScroll: true });
    });

    return button;
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
      document.dispatchEvent(new CustomEvent("favoriteschange"));
    });

    sync();
    return button;
  }

  function createCard(character) {
    const rarity = getRarity(character);

    const article = document.createElement("article");
    article.className = "card";
    article.dataset.rarity = rarity;
    article.dataset.id = String(character.id);
    article.tabIndex = -1;

    const face = document.createElement("div");
    face.className = "card__face";

    const art = document.createElement("div");
    art.className = "card__art";

    const number = document.createElement("span");
    number.className = "card__number";
    number.textContent = "#" + padNumber(character.id);

    const rarityBadge = document.createElement("span");
    rarityBadge.className = "card__rarity card__rarity--" + rarity;
    rarityBadge.textContent = RARITY_LABELS[rarity];

    const image = document.createElement("img");
    image.className = "card__image";
    image.src = character.image;
    image.alt = "Retrato de " + character.name;
    image.loading = "lazy";
    image.width = 300;
    image.height = 300;

    art.append(number, rarityBadge, image);

    const body = document.createElement("div");
    body.className = "card__body";

    const name = document.createElement("h2");
    name.className = "card__name";
    name.textContent = character.name;

    const meta = document.createElement("p");
    meta.className = "card__meta";
    meta.textContent = character.origin ? character.origin.name : "Origem desconhecida";

    const chips = document.createElement("div");
    chips.className = "card__chips";

    const statusChip = document.createElement("span");
    statusChip.className = statusChipClass(character.status);
    statusChip.textContent = character.status || "Unknown";

    const speciesChip = document.createElement("span");
    speciesChip.className = "chip";
    speciesChip.textContent = character.species;

    chips.append(statusChip, speciesChip);

    const footer = document.createElement("div");
    footer.className = "card__footer";

    const link = document.createElement("a");
    link.className = "card__link";
    link.href = "detalhes.html?id=" + character.id;
    link.textContent = "Ver detalhes";

    footer.append(link, createFavoriteButton(character));
    body.append(name, meta, chips, footer);
    face.append(art, body);

    const cover = createCover();

    if (window.RickMortyProgress.has(character.id)) {
      article.classList.add("is-revealed");
      article.append(face, cover);
    } else {
      article.append(face, cover, createRevealButton(article, character));
    }

    return article;
  }

  function renderCards(characters, container) {
    const fragment = document.createDocumentFragment();
    characters.forEach(function (character) {
      fragment.appendChild(createCard(character));
    });
    container.appendChild(fragment);
  }

  return { createCard, renderCards, getRarity, RARITY_LABELS };
})();
