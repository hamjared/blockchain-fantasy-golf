const League = artifacts.require("League");
const utils = require("./helpers/utils");
var Web3 = require('web3');
const BigNumber = require('bignumber.js');
// const { time } = require('@openzeppelin/test-helpers');
//TODO: import expect into our project
const golferNames = ["Tiger", "Jordan", "Phil", "Dustin", "Justin", "Xander", "Jack", "Rory", "Zach"];
const golferIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const golferCosts = [2, 2, 2, 2, 2, 2, 2, 2, 2];

const tournamentName = "The Masters";
const tournamentID = 1;
const tournamentStartTime = parseInt(new Date().getTime()/1000 + 3600);
const tournamentEndTime = tournamentStartTime + 3600;
let leagueID = -1;
contract("League", (accounts) => {
    let [alice, bob, carol, dave, ed, fred] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await League.new();
        for (var i = 0 ; i < golferNames.length; i++){
          await contractInstance.createGolfer(golferNames[i], golferIDs[i], 2, {from: alice});
        }

        await contractInstance.createTournament(tournamentID, tournamentName, tournamentStartTime, tournamentEndTime, {from: alice});
        let leagueInfo = await contractInstance.createLeague(tournamentID, "Cool League", [alice, bob, carol, dave, ed, fred], {from: alice});
        leagueID = leagueInfo.logs[0].args.leagueID;


    });
    it("test placeBet - should fail because incorrect eth value is passed", async () => {

        let betAmount = new BigNumber( golferCosts.reduce((a,b) => a+b,0));
        betAmount = betAmount.minus(1);
        await utils.shouldThrow(contractInstance.placeBet(golferIDs, leagueID, {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } ));


    })

    it("test placeBet", async () => {
        let aliceGolferIDs = [1,2,3,4,5,6];
        let betAmount = new BigNumber( 12);
        let result = await contractInstance.placeBet(aliceGolferIDs, leagueID,  {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );
        assert.equal(result.receipt.status, true);

    })

    it("test placeBet", async () => {
        let aliceGolferIDs = [1,2,3,4,5,6];
        let betAmount = new BigNumber( 12);
        let result = await contractInstance.placeBetNonArray(aliceGolferIDs[0], aliceGolferIDs[1], aliceGolferIDs[2], aliceGolferIDs[3], aliceGolferIDs[4], aliceGolferIDs[5], leagueID, {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );
        assert.equal(result.receipt.status, true);

    })

    it("test get user players", async () => {
        const web3_eth_abi = require("web3-eth-abi");
        let aliceGolferIDs = [1,2,3,4,5,6];
        let betAmount = new BigNumber( 12);
        let result = await contractInstance.placeBetNonArray(aliceGolferIDs[0], aliceGolferIDs[1], aliceGolferIDs[2], aliceGolferIDs[3], aliceGolferIDs[4], aliceGolferIDs[5], leagueID, {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );
        assert.equal(result.receipt.status, true);
        result = await contractInstance.getUserGolferIds({from: alice});
        let resultArray = [];
        for (let i = 0 ; i < result.length; i++){
          let curID = new BigNumber(result[i]);
          curID = curID.toNumber();
          assert.equal(curID, aliceGolferIDs[i]);
        }



    })

    it("test updateUserScores", async () => {
        //bob should be the winner
        let aliceGolferIDs = [1,2,3,4,5,6];
        let betAmount = new BigNumber(12);
        let betID = await contractInstance.placeBet(aliceGolferIDs, leagueID, {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );
        betID = betID.logs[0].args.betID;
        //now update all of the golfer scores
        let scoreSum = 0;
        for (var i = 0 ; i < aliceGolferIDs.length; i++){
          await contractInstance.updateGolferTournamentScore(aliceGolferIDs[i], tournamentID, i);
          scoreSum += i;
        }

        await contractInstance.updateUserScores(tournamentID);
        let bet = await contractInstance.getBet( {from: alice});
        assert.equal(scoreSum, bet[2], bet[2]);



    })

    it("test updateLeagueLeader", async () => {
        //bob should be the winner
        let aliceGolferIDs = [1,2,3,4,5,6];
        let bobGolferIDs = [1,2,3,7,8,9];
        let betAmount = new BigNumber(12);
        await contractInstance.placeBet(aliceGolferIDs, leagueID, {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );
        await contractInstance.placeBet(bobGolferIDs, leagueID, {from: bob, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );

        //now update all of the golfer scores
        for (var i = 0 ; i < golferIDs.length; i++){
          await contractInstance.updateGolferTournamentScore(golferIDs[i], tournamentID, i);
        }


        await contractInstance.updateLeagueLeader(leagueID);

        let leagueLeader = await contractInstance.getLeagueLeader(leagueID);
        assert.equal(bob, leagueLeader);


    })

    it("test getLeagueMoneyPot", async () => {
      let aliceGolferIDs = [1,2,3,4,5,6];
      let betAmount = new BigNumber( 12);
      let result = await contractInstance.placeBet(aliceGolferIDs, leagueID, {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );
      let moneyPot = await contractInstance.getLeagueMoneyPot(leagueID);
      assert.equal(Web3.utils.toWei(betAmount.toString(), 'ether'), moneyPot.toString());

    })

    it("test withdrawEther - should fail since person withdrawing is not winner", async () => {
        //bob should be the winner
        let aliceGolferIDs = [1,2,3,4,5,6];
        let bobGolferIDs = [1,2,3,7,8,9];
        let betAmount = new BigNumber(12);
        await contractInstance.placeBet(aliceGolferIDs, leagueID, {from: alice, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );
        await contractInstance.placeBet(bobGolferIDs, leagueID, {from: bob, value:Web3.utils.toWei(betAmount.toString(), 'ether') } );

        //now update all of the golfer scores
        for (var i = 0 ; i < golferIDs.length; i++){
          await contractInstance.updateGolferTournamentScore(golferIDs[i], tournamentID, i);
        }


        await utils.shouldThrow(contractInstance.withdrawEther(leagueID, {from:alice}));

    })




})
