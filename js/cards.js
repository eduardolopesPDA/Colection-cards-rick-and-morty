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

  function createCard(character) {
    const rarity = getRarity(character);

    const article = document.createElement("article");
    article.className = "card";
    article.dataset.rarity = rarity;

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
    body.append(name, meta, chips);
    article.append(art, body);

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
