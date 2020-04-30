const GolfApi = require('../client/src/GolfApi.js');


contract("GolfApi", () => {
    it("test GolfApi", async() => {
        let tournamentName = "BMW Championship";
        let playerName = "Justin Thomas";
        let playerRank = 0;
        let numRounds = 4;

        let tournament = await GolfApi.getTournamentData();
        print(tournament);
    })
})

