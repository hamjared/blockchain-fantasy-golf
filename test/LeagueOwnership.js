const League = artifacts.require("League");
const utils = require("./helpers/utils");
// const { time } = require('@openzeppelin/test-helpers');
//TODO: import expect into our project
const tournamentName = "The Masters";
const tournamentID = 1;
const tournamentStartTime = parseInt(new Date().getTime()/1000 + 3600);
const tournamentEndTime = tournamentStartTime + 3600;
contract("League", (accounts) => {
    let [alice, bob, carol, dave, ed, fred] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await League.new();
        await contractInstance.createTournament(tournamentID, tournamentName, tournamentStartTime, tournamentEndTime, {from:alice})
    });
    it("should be able to create a new league", async () => {
        let leagueName = "Test League";
        const result = await contractInstance.createLeague(tournamentID, leagueName, [alice, bob, carol, dave, ed, fred], {from: alice});

        assert.equal(result.receipt.status, true);
        console.log(result.logs);
    })

    it("test createLeague - user should not be able to create two leagues", async () => {
        let leagueName = "Test League";
        await contractInstance.createLeague(tournamentID, leagueName,[alice, bob, carol, dave, ed, fred], {from: alice});

        await utils.shouldThrow(contractInstance.createLeague(tournamentID + 1, "Not the Same", [alice, bob, carol, dave, ed, fred], {from: alice}));

    })

})
