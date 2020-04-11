const League = artifacts.require("League");
const utils = require("./helpers/utils");
// const { time } = require('@openzeppelin/test-helpers');
//TODO: import expect into our project

contract("League", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await League.new();
    });
    it("test placeBet - user should be able to place bet", async () => {

        assert(false);

    })

    it("test getBet - should be able to retrieve users bet", async () => {

        assert(false);

    })

})
