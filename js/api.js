window.RickMortyAPI = (function () {
  const BASE_URL = "https://rickandmortyapi.com/api/character";

  async function listPage(page) {
    const response = await fetch(`${BASE_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  }

  async function listPages(pages) {
    const results = await Promise.all(pages.map(listPage));
    return results.flat();
  }

  async function getCharacter(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    return response.json();
  }

  async function getEpisodes(urls, limit) {
    const list = urls || [];
    const slice = list.slice(0, limit);
    const episodes = await Promise.all(
      slice.map(async function (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        return response.json();
      })
    );
    return { episodes, remaining: Math.max(list.length - slice.length, 0) };
  }

  return { listPage, listPages, getCharacter, getEpisodes };
})();
