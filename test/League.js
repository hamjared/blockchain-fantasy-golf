const League = artifacts.require("League");
const utils = require("./helpers/utils");
var Web3 = require('web3');
const BigNumber = require('bignumber.js');
// const { time } = require('@openzeppelin/test-helpers');
//TODO: import expect into our project
const golferNames = ["Tiger", "Jordan", "Phil", "Dustin", "Justin", "Xander"];
const golferIDs = [1, 2, 3, 4, 5, 6];
const golferCosts = [2, 2, 2, 2, 2, 2];

const tournamentName = "The Masters";
const tournamentID = 1;
const tournamentStartTime = parseInt(new Date().getTime()/1000 + 3600);
const tournamentEndTime = tournamentStartTime + 3600;
let leagueID = -1;
contract("League", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await League.new();
        for (var i = 0 ; i < golferNames.length; i++){
          await contractInstance.createGolfer(golferNames[i], golferIDs[i], golferCosts[i], {from: alice});
        }

        await contractInstance.createTournament(tournamentID, tournamentName, tournamentStartTime, tournamentEndTime, {from: alice});
        let leagueInfo = await contractInstance.createLeague(tournamentID, "Cool League", {from: alice});
        leagueID = leagueInfo.logs[0].args.leagueID;

    });
    it("test placeBet - should fail because incorrect eth value is passed", async () => {

        let betAmount = new BigNumber( golferCosts.reduce((a,b) => a+b,0));
        betAmount = betAmount.minus(1);
        await utils.shouldThrow(contractInstance.placeBet(golferIDs, leagueID, {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } ));


    })

    it("test placeBet", async () => {

        let betAmount = new BigNumber( golferCosts.reduce((a,b) => a+b,0));
        let result = await contractInstance.placeBet(golferIDs, leagueID, {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );
        assert.equal(result.receipt.status, true);

    })

  

    it("should be able to create a new league", async () => {


    })

    it("test createLeague - user should not be able to create two leagues", async () => {

    })


})
