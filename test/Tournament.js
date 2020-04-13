const TournamentData = artifacts.require("TournamentData");
const utils = require("./helpers/utils");
// const { time } = require('@openzeppelin/test-helpers');
//TODO: import expect into our project

contract("TournamentData", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await TournamentData.new();
    });
    it("test createTournament", async () => {
        let name = "The Masters 2020";
        let id = 1;
        startTime = new Date().getTime()/1000 + 3600;
        startTime = parseInt(startTime);
        endTime = startTime + 3600;
        let result = await contractInstance.createTournament(id, name,startTime, endTime, {from: alice});
        assert.equal(result.receipt.status, true);

        assert.equal(result.logs[0].args.tournamentID, id);
        assert.equal(result.logs[0].args.name, name);

    })

    it("test createTournament - should fail because startTime is in the past", async () => {
        let name = "The Masters 2020";
        let id = 1;
        startTime = new Date().getTime()/1000 - 3600;
        startTime = parseInt(startTime);
        endTime = startTime + 3600;
        await utils.shouldThrow( contractInstance.createTournament(id, name,startTime, endTime, {from: alice}));

    })

    it("test createTournament - should fail because endTime is before startTim", async () => {
        let name = "The Masters 2020";
        let id = 1;
        startTime = new Date().getTime()/1000 + 3600;
        startTime = parseInt(startTime);
        endTime = new Date().getTime()/1000 + 3599;
        endTime = parseInt(endTime);
        await utils.shouldThrow( contractInstance.createTournament(id, name,startTime, endTime, {from: alice}));

    })









})
