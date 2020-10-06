const { v4: uuid } = require("uuid");

class Repositories {
  constructor() {
    this.map = new Map();
  }

  create({ id = uuid(), likes = 0, title, url, techs }) {
    this.map.set(id, { likes, title, url, techs });
    return { id, ...this.map.get(id) };
  }

  list() {
    const repositories = [];
    this.map.forEach((value, key) => {
      repositories.push({ id: key, ...value });
    });
    return repositories;
  }

  change({ id, title, url, techs }) {
    if (!this.map.get(id)) return null;
    const repository = { ...this.map.get(id), title, url, techs };
    this.map.set(id, repository);
    return { id, ...this.map.get(id) };
  }

  delete(id) {
    const repository = this.map.get(id);
    if (!repository) return null;
    this.map.delete(id);
    return repository;
  }

  like(id) {
    const repository = this.map.get(id);
    if (!repository) return null;

    repository.likes = repository.likes + 1;
    this.map.set(id, repository);
    return repository;
  }
}

module.exports = { Repositories };
