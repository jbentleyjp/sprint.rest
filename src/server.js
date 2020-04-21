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

  app.get("/api/pokemon/:key/evolutions", (request, response) => {
    const key = request.params.key;
    let chosenEvo;
    pInfo.forEach((pokemon) => {
      if (Number(pokemon.id) === Number(key)) {
        chosenEvo = pokemon.evolutions;
        response.send(chosenEvo);
      } else if (pokemon.name === key) {
        chosenEvo = pokemon.evolutions;
        response.send(chosenEvo);
      }
    });
  });

  app.get("/api/pokemon/:key/evolutions/previous", (request, response) => {
    const key = request.params.key;
    let prevEvo;
    pInfo.forEach((pokemon) => {
      if (Number(pokemon.id) === Number(key)) {
        prevEvo = pokemon["Previous evolution(s)"];
        response.send(prevEvo);
      } else if (pokemon.name === key) {
        prevEvo = pokemon["Previous evolution(s)"];
        response.send(prevEvo);
      }
    });
  });

  app.get("/api/types", (request, response) => {
    const number = request.query.number;
    if (!number) {
      response.send(pokeData.types);
    } else {
      for (let i = 0; i < number; i++) {
        response.send(pokeData.types[i]);
      }
    }
  });

  app.post("/api/types", (request, response) => {
    const newType = request.query;
    pokeData.types.push(newType);
    response.send(pokeData.types);
  });

  app.delete("/api/types/:type", (request, response) => {
    const type = request.params.type;
    for (let i = 0; i < pokeData.types.length; i++) {
      if (type === pokeData.types[i]) {
        pokeData.types.splice(i, 1);
        response.send(pokeData.types);
      }
    }
  });

  app.get("/api/types/:type/pokemon", (request, response) => {
    const type = request.params.type;
    const result = [];
    pInfo.forEach((pokemon) => {
      if (pokemon.types.includes(type)) {
        result.push({ id: pokemon.id, name: pokemon.name });
      }
    });
    response.send(result);
  });

  app.get("/api/attacks", (request, response) => {
    const number = request.query.number;
    const attackArr = [];
    for (const atkType in pokeData.attacks) {
      for (let i = 0; i < pokeData.attacks[atkType].length; i++)
        attackArr.push(pokeData.attacks[atkType][i]);
    }
    if (number) {
      response.send(attackArr.slice(0, number));
    } else {
      response.send(attackArr);
    }
  });

  app.get("/api/attacks/fast", (request, response) => {
    const number = request.query.number;
    response.send(pokeData.attacks.fast.slice(0, number));
  });

  app.get("/api/attacks/special", (request, response) => {
    const number = request.query.number;
    response.send(pokeData.attacks.special.slice(0, number));
  });

  app.get("/api/attacks/:name", (request, response) => {
    const name = request.params.name;
    const attackArr = [];
    for (const atkType in pokeData.attacks) {
      for (let i = 0; i < pokeData.attacks[atkType].length; i++)
        attackArr.push(pokeData.attacks[atkType][i]);
    }
    for (const attack of attackArr) {
      if (attack.name === name) {
        response.send(attack);
      }
    }
  });

  app.get("/api/attacks/:name/pokemon", (request, response) => {
    const attackName = request.params.name;
    const result = [];
    pInfo.forEach((pokemon) => {
      for (let type in pokemon.attacks) {
        for (let attack of pokemon.attacks[type]) {
          console.log(pokemon.attacks[type], "SDFSDFDFFFSFDSFDSFDSFS");
          if (attack.name === attackName) {
            result.push({ id: pokemon.id, name: pokemon.name });
          }
        }
      }
    });
    console.log(result, "ZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
    response.send(result);
  });

  return app;

  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
};

module.exports = { setupServer };
