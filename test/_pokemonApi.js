const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();
const pokeData = require("../src/data");

//  * This sprint you will have to create all tests yourself, TDD style.
//  * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
//  * The same kind of structure that you encountered in lecture.express will be provided here.

const server = setupServer();
describe("Pokemon API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });
  //Making a get request to /greet .query is used to pass data into a get requesst. /greet?name=Mia

  describe("GET /api/pokemon - should return a full list ", () => {
    it("should return a full list of pokemon", async () => {
      const res = await request.get("/api/pokemon");
      res.should.be.json;
      JSON.parse(res.text).should.eql(pokeData.pokemon);
    });
    it("should be able to limit the number of pokemon listed", async () => {
      const res = await request.get("/api/pokemon").query({ number: 1 });
      JSON.parse(res.text).should.eql(pokeData.pokemon[0]);
    });
  });

  describe("POST / api/pokemon - should add a pokemon to the end of the list", () => {
    it("should add a pokemon and increase length of array by 1", async () => {
      await request.post("/api/pokemon").query({
        id: "201",
        name: "Bulbasaur",
        classification: "Seed Pokémon",
        types: ["Grass", "Poison"],
        resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
        weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
        weight: {
          minimum: "6.04kg",
          maximum: "7.76kg",
        },
        height: {
          minimum: "0.61m",
          maximum: "0.79m",
        },
        fleeRate: 0.1,
        evolutionRequirements: {
          amount: 25,
          name: "Bulbasaur candies",
        },
        evolutions: [
          {
            id: 2,
            name: "Ivysaur",
          },
          {
            id: 3,
            name: "Venusaur",
          },
        ],
        maxCP: 951,
        maxHP: 1071,
        attacks: {
          fast: [
            {
              name: "Tackle",
              type: "Normal",
              damage: 12,
            },
            {
              name: "Vine Whip",
              type: "Grass",
              damage: 7,
            },
          ],
          special: [
            {
              name: "Power Whip",
              type: "Grass",
              damage: 70,
            },
            {
              name: "Seed Bomb",
              type: "Grass",
              damage: 40,
            },
            {
              name: "Sludge Bomb",
              type: "Poison",
              damage: 55,
            },
          ],
        },
      });
      pokeData.pokemon.length.should.equal(152);
    });
  });

  describe("GET /api/pokemon/:key - getting a pokemon by it's id or name ", () => {
    it("should get a pokemon by entering its id", async () => {
      const res = await request.get("/api/pokemon/151");
      res.should.be.json;
      res.body.should.eql(pokeData.pokemon[150]);
    });
    it("should get a pokemon by entering its name", async () => {
      const res = await request.get("/api/pokemon/Mew");
      res.should.be.json;
      res.body.name.should.equal("Mew");
    });
  });

  describe("PATCH /api/pokemon/:idOrName - allow partial modifications of pokemon", () => {
    it("should allow editing of key value pairs", async () => {
      const res = await request
        .patch("/api/pokemon/6")
        .send({ classification: "dragon" });
      res.should.be.json;
      res.body.classification.should.equal("dragon");
    });
  });

  describe("DELETE /api/pokemon/:idOrName", () => {
    it("should delete the given pokemon", async () => {
      const res = await request.delete("/api/pokemon/25");
      res.should.be.json;
      res.body.length.should.equal(151);
    });
  });
  describe("GET /api/pokemon/idOrName/evolutions", () => {
    it("should return the evolutions that a Pokemon has", async () => {
      const res = await request.get("/api/pokemon/Staryu/evolutions");
      res.should.be.json;
      res.body.should.eql([{ id: 121, name: "Starmie" }]);
    });
  });

  describe("GET /api/pokemon/idOrName/evolutions/prevoius", () => {
    it("should get the previous evolutions that a pokemon has", async () => {
      const res = await request.get("/api/pokemon/17/evolutions/previous");
      res.should.be.json;
      res.body.should.eql([{ id: 16, name: "Pidgey" }]);
    });
  });

  describe("GET /api/types", () => {
    it("should return all the pokemon types", async () => {
      const res = await request.get("/api/types");
      res.should.be.json;
      res.body.should.eql(pokeData.types);
    });
    it("should be able to limit the number of types listed", async () => {
      const res = await request.get("/api/types").query({ number: 1 });
      res.text.should.eql(pokeData.types[0]);
    });
  });

  describe("POST /api/types", () => {
    it("should add a type to the types list", async () => {
      const res = await request.post("/api/types").query("Otaku");
      res.body.length.should.eql(18);
    });
  });

  describe("DELETE /api/types", () => {
    it("should delete types that no one cares about", async () => {
      const res = await request.delete("/api/types/Poison");
      res.body.length.should.eql(17);
    });
  });

  describe("GET /api/types/:type/pokemon", () => {
    it("should list the pokemon which have the requested type", async () => {
      const res = await request.get("/api/types/Ghost/pokemon");
      res.body.length.should.eql(3);
    });
  });

  describe("GET /api/attacks", () => {
    it("should return all the pokemon attacks", async () => {
      const res = await request.get("/api/attacks");
      res.should.be.json;
      res.body.length.should.equal(124);
    });
    it("should be able to limit the number of attacks listed", async () => {
      const res = await request.get("/api/attacks").query({ number: 6 });
      // console.log(pokeData.attacks["fast"], "AAAAAAAAAAAAA")
      res.body.length.should.eql(6);
    });
  });

  describe("GET /api/attacks/fast", () => {
    it("should return the number of fast attacks requests", async () => {
      const res = await request.get("/api/attacks/fast").query({ number: 3 });
      res.body.length.should.eql(3);
    });
  });

  describe("GET /api/attacks/special", () => {
    it("should return the number of fast special requests", async () => {
      const res = await request
        .get("/api/attacks/special")
        .query({ number: 6 });
      res.body.length.should.eql(6);
    });
  });

  describe("GET /api/attacks/:name", () => {
    it("should get a specific attack by name, no matter if its fast or slow", async () => {
      const res = await request.get("/api/attacks/Ember");
      res.should.be.json;
      res.body.name.should.eql("Ember");
    });
  });

  describe("GET /api/attacks/:name/pokemon", () => {
    it("should return all pokemon that have that attack", async () => {
      const res = await request.get("/api/attacks/Ember/pokemon");
      res.should.be.json;
      console.log(res.body, "AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      JSON(res.body).length.should.eql(99);
    });
  });

  // describe(" ... ", () => {
  //   it("should...", async () => {
  //     const res = await

  //   });
  // });

  // describe(" ... ", () => {
  //   it("should...", async () => {
  //     const res = await

  //   });
  // });
});
