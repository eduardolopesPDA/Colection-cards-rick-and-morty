window.RickMortyFavorites = (function () {
  const STORAGE_KEY = "rickmorty-favorites";

  function read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (error) {
      return [];
    }
  }

  function write(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }

  function has(id) {
    return read().indexOf(id) !== -1;
  }

  function add(id) {
    const ids = read();
    if (ids.indexOf(id) === -1) {
      ids.push(id);
      write(ids);
    }
  }

  function remove(id) {
    write(read().filter(function (item) {
      return item !== id;
    }));
  }

  function toggle(id) {
    if (has(id)) {
      remove(id);
      return false;
    }
    add(id);
    return true;
  }

  function count() {
    return read().length;
  }

  return { has, add, remove, toggle, count };
})();
