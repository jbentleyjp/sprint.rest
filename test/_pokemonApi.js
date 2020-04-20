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
      const res = await request.get("/api/pokemon"); //.query({ n : 1 }); //maybe ../data/pokemon??
      res.should.be.json;
      JSON.parse(res.text).should.eql(pokeData.pokemon);
    });
  });

  // describe("GET api/pokemon - should return a full list ", () => {
  //   it("should be able to limit the number of pokemon listed", async () => {
  //     const res = await request.get("api/pokemon") //.query({ n : 1 }); //maybe ../data/pokemon??
  //     res.should.be.json;
  //     res.json.should.equal(`pokeData.pokemon[0]`);
  //   });
  // });
});
