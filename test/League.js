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
    it("should be able to create a new league", async () => {
        let tournamentID = 0;
        let leagueName = "Test League";
        const result = await contractInstance.createLeague(tournamentID, leagueName, {from: alice});

        assert.equal(result.receipt.status, true);
        console.log(result.logs);
    })

    it("test createLeague - user should not be able to create two leagues", async () => {
        let tournamentID = 0;
        let leagueName = "Test League";
        const result = await contractInstance.createLeague(tournamentID++, leagueName, {from: alice});

        await utils.shouldThrow(contractInstance.createLeague(tournamentID, "Not the Same", {from: alice}));

    })

})
