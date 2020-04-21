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

  describe.only("GET /api/pokemon/:id - getting a pokemon by it's id ", () => {
    it("should get a pokemon by entering its id", async () => {
      const expected = {
        id: "151",
        name: "Mew",
        classification: "New Species Pokémon",
        types: ["Psychic"],
        resistant: ["Fighting", "Psychic"],
        weaknesses: ["Bug", "Ghost", "Dark"],
        weight: {
          minimum: "3.5kg",
          maximum: "4.5kg",
        },
        height: {
          minimum: "0.35m",
          maximum: "0.45m",
        },
        fleeRate: 0.1,
        "Pokémon Class": "This is a MYTHIC Pokémon.",
        MYTHIC: "Pokémon Class",
        maxCP: 3087,
        maxHP: 3299,
        attacks: {
          fast: [
            {
              name: "Pound",
              type: "Normal",
              damage: 7,
            },
          ],
          special: [
            {
              name: "Dragon Pulse",
              type: "Dragon",
              damage: 65,
            },
            {
              name: "Earthquake",
              type: "Ground",
              damage: 100,
            },
            {
              name: "Fire Blast",
              type: "Fire",
              damage: 100,
            },
            {
              name: "Hurricane",
              type: "Flying",
              damage: 80,
            },
            {
              name: "Hyper Beam",
              type: "Normal",
              damage: 120,
            },
            {
              name: "Moonblast",
              type: "Fairy",
              damage: 85,
            },
            {
              name: "Psychic",
              type: "Psychic",
              damage: 55,
            },
            {
              name: "Solar Beam",
              type: "Grass",
              damage: 120,
            },
            {
              name: "Thunder",
              type: "Electric",
              damage: 100,
            },
          ],
        },
      };

      let actual = await request.get("/api/pokemon/:id").query({ id: 151 });
      // console.log({actual})
      actual.should.be.eql(expected);
    });
  });

  describe("GET /api/pokemon/:name - getting a pokemon by it's name ", () => {
    it("should get a pokemon by entering its name", async () => {
      const expected = {
        id: "151",
        name: "Mew",
        classification: "New Species Pokémon",
        types: ["Psychic"],
        resistant: ["Fighting", "Psychic"],
        weaknesses: ["Bug", "Ghost", "Dark"],
        weight: {
          minimum: "3.5kg",
          maximum: "4.5kg",
        },
        height: {
          minimum: "0.35m",
          maximum: "0.45m",
        },
        fleeRate: 0.1,
        "Pokémon Class": "This is a MYTHIC Pokémon.",
        MYTHIC: "Pokémon Class",
        maxCP: 3087,
        maxHP: 3299,
        attacks: {
          fast: [
            {
              name: "Pound",
              type: "Normal",
              damage: 7,
            },
          ],
          special: [
            {
              name: "Dragon Pulse",
              type: "Dragon",
              damage: 65,
            },
            {
              name: "Earthquake",
              type: "Ground",
              damage: 100,
            },
            {
              name: "Fire Blast",
              type: "Fire",
              damage: 100,
            },
            {
              name: "Hurricane",
              type: "Flying",
              damage: 80,
            },
            {
              name: "Hyper Beam",
              type: "Normal",
              damage: 120,
            },
            {
              name: "Moonblast",
              type: "Fairy",
              damage: 85,
            },
            {
              name: "Psychic",
              type: "Psychic",
              damage: 55,
            },
            {
              name: "Solar Beam",
              type: "Grass",
              damage: 120,
            },
            {
              name: "Thunder",
              type: "Electric",
              damage: 100,
            },
          ],
        },
      };
      const res = await request.get("/api/pokemon/").query({ name: "Mew" });
      expected.should.be.eql(pokeData.pokemon[150]);
    });
  });

  xdescribe("PATCH /api/pokemon/:idOrName - allow partial modifications of pokemon", () => {
    it("should...", async () => {
      const res = await request.patch("/api/pokemon");
      request.get("/api/pokemon").query({ id: 4 });
      request.get("/api/pokemon").query({ classification: "dragon" });
    });
  });

  describe("DELETE /api/pokemon/:idOrName", () => {
    it("should delete the given pokemon", async () => {
      await request.delete("/api/pokemon").query({ id: 006 });
      pokeData.pokemon.length.should.equal(150);
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

  // describe(" ... ", () => {
  //   it("should...", async () => {
  //     const res = await

  //   });
  // });
});
