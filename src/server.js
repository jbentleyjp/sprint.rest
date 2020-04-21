const express = require("express");
const pokeData = require("./data");
const pInfo = pokeData.pokemon;

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/api/pokemon", (request, response) => {
    const number = request.query.number;

    if (!number) {
      response.send(pInfo);
    } else {
      for (let i = 0; i < number; i++) {
        response.send(pInfo[i]);
      }
    }
  });

  app.post("/api/pokemon", (request, response) => {
    const newPokemon = request.query;
    pInfo.push(newPokemon);
    response.send(pInfo);
  });

  app.get("/api/pokemon/:key", (request, response) => {
    let chosenPokemon;
    const key = request.params.key;
    pInfo.forEach((pokemon) => {
      if (Number(pokemon.id) === Number(key)) {
        chosenPokemon = pokemon;
      } else if (pokemon.name === key) {
        chosenPokemon = pokemon;
      }
    });
    response.send(chosenPokemon);
  });

  app.patch("/api/pokemon/:key", (request, response) => {
    const key = request.params.key;
    pInfo.forEach((pokemon) => {
      if (Number(pokemon.id) === Number(key)) {
        pokemon = Object.assign(pokemon, request.body);
        response.send(pokemon);
      } else {
        pokemon = Object.assign(pokemon, request.body);
        response.send(pokemon);
      }
    });
  });

  app.delete("/api/pokemon/:key", (request, response) => {
    const key = request.params.key;
    console.log("IM BEING REACHED");
    for (let i = 0; i < pInfo.length; i++) {
      if (Number(pInfo[i].id) === Number(key)) {
        pInfo.splice(i, 1);
        response.send(pInfo);
      } else {
        pInfo.splice(i, 1);
        response.send(pInfo);
      }
    }
  });

  return app;

  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
};

module.exports = { setupServer };
