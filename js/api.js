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

  return { listPage, listPages };
})();
