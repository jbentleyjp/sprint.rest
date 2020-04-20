const express = require("express");
const pokeData = require("./data");

const setupServer = () => {
  const app = express();

  app.get("/api/pokemon", (request, response) => {
    response.send(pokeData.pokemon);
  });

  return app;

  // const number = request.query.number;
  //   `https://pokeapi.co/api/v2/pokemon?limit=${n}`
  // `pokeData.pokemon.json?limit=${n - 1}`
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
};

module.exports = { setupServer };
