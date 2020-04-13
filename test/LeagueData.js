const LeagueData = artifacts.require("LeagueData");
const utils = require("./helpers/utils");
// const { time } = require('@openzeppelin/test-helpers');
//TODO: import expect into our project
const golferNames = ["tiger", "Jordan", "Phil"];
const golferIDs = [1,2,3];
const golferCosts = [2,2,2];

const tournamentName = "The Masters";
const tournamentID = 1;
const tournamentStartTime = parseInt(new Date().getTime()/1000 + 3600);
const tournamentEndTime = tournamentStartTime + 3600;

contract("LeagueData", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await LeagueData.new();
        await contractInstance.createGolfer("Tiger", 1, 2, {from: alice});
        await contractInstance.createGolfer("Jordan", 2, 2, {from: alice});
        await contractInstance.createGolfer("Phil", 3, 2, {from: alice});

        await contractInstance.createTournament(tournamentID, tournamentName, tournamentStartTime, tournamentEndTime, {from: alice});
    });
    it("test updateLeagueTournamentScore", async () => {

          await contractInstance.updateGolferTournamentScore(golferIDs[0], tournamentID, 5,{from: alice} );
          let golferScore = await contractInstance.getGolferScore(golferIDs[0], tournamentID, {from: alice});
          assert.equal(golferScore, 5, golferScore);

    })



})
