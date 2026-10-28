window.RickMortyProgress = (function () {
  const STORAGE_KEY = "rickmorty-revealed";
  const listeners = [];

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

  function notify() {
    listeners.forEach(function (callback) {
      callback();
    });
  }

  function has(id) {
    return read().indexOf(id) !== -1;
  }

  function reveal(id) {
    const ids = read();
    if (ids.indexOf(id) === -1) {
      ids.push(id);
      write(ids);
      notify();
    }
  }

  function count() {
    return read().length;
  }

  function onChange(callback) {
    listeners.push(callback);
  }

  return { has, reveal, count, onChange };
})();
