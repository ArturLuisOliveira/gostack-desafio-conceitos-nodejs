const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const { Repositories } = require("./Repositories");
const app = express();

app.use(express.json());
app.use(cors());

const repositories = new Repositories();

app.get("/repositories", (request, response) => {
  const list = repositories.list();
  return response.status(200).json(list);
});

app.post("/repositories", (request, response) => {
  const {
    body: { title, url, techs },
  } = request;
  const repository = repositories.create({ title, url, techs });

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {
    params: { id },
    body: { title, url, techs },
  } = request;
  const repository = repositories.change({ id, title, url, techs });
  if (!repository) return response.status(400).json();
  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {
    params: { id },
  } = request;
  const repository = repositories.delete(id);
  if (!repository) return response.status(400).json();
  return response.status(204).json(repository);
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {
    params: { id },
  } = request;
  const repository = repositories.like(id);
  if (!repository) return response.status(400).json();

  return response.status(201).json(repository);
});

module.exports = app;
