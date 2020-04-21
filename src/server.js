const express = require("express");
const pokeData = require("./data");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/api/pokemon", (request, response) => {
    const number = request.query.number;

    if (!number) {
      response.send(pokeData.pokemon);
    } else {
      for (let i = 0; i < number; i++) {
        response.send(pokeData.pokemon[i]);
      }
    }
  });

  app.post("/api/pokemon", (request, response) => {
    const newPokemon = request.query;
    pokeData.pokemon.push(newPokemon);
    response.send(pokeData.pokemon);
  });

  app.get("/api/pokemon/:id", (request, response) => {
    const id = request.params.id;
    const chosenPokemon = pokeData.pokemon[id - 1];

    response.send(chosenPokemon);
  });

  app.get("/api/pokemon/:name", (request, response) => {
    console.log("ITS BEING CALLED");
    const name = request.params.name;
    const chosenPokemon = pokeData.pokemon.name === "Mew";
    console.log(chosenPokemon, "ASDSADFSFDFDSFDSFDAFDS");
    response.send(chosenPokemon);
  });

  // app.patch("/api/pokemon/:idOrName", (request, response) => {

  //   console.log(request.body, "BOOOOOODY")
  //   console.log(request.params, "aaaaaaaaa")
  // if (request.query.name){
  //   let selector = request.query.name;
  //   response.send(pokeData.pokemon.)
  // } else {
  //   let selector = request.query.id
  // };

  //   response.send(pokeData.pokemon)

  // })

  app.delete("/api/pokemon/:idOrName", (request, response) => {
    // console.log("BBBBBBBB")
    if (typeof request.query.name === "string") {
      const selector = request.query.name;
      const itemIndex = pokeData.pokemon.indexOf(
        selector === pokeData.pokemon.name
      );
      pokeData.pokemon.splice(itemIndex, 1);
    } else {
      const selector = request.query.id;
      const itemIndex = pokeData.pokemon.indexOf(
        selector === pokeData.pokemon.id
      );
      // console.log(itemIndex, "AAAAA")
      pokeData.pokemon.splice(itemIndex, 1);
    }
    response.send(pokeData.pokemon);
  });

  return app;

  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
};

module.exports = { setupServer };
