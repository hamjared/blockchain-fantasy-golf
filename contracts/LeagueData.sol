pragma solidity >=0.4.22 <0.6.0;

contract OracleInterface{
    function getGolferScore(uint _golferID, uint _tournamentID) public view returns(int);
    function getGolferCost(uint _golferID) public view returns (uint);
}

contract LeagueData {

    address golfDataOracleAddress = 0x5b0C9dC0AFE417858DcC8dB5269E47ABc572AA77 ;

    OracleInterface golfDataOracleContract = OracleInterface(golfDataOracleAddress);


    struct League{
        uint tournamentID;
        string leagueName;
    }

    struct Bet {
        uint16[6] golferIDs;
        uint32 leagueID;
        int totalScore;
    }


    League[] public leagues;
    Bet[] public bets;


    function updateUserScores(uint _tournamentID) external{
        for (uint i = 0 ; i < bets.length; i++){
            Bet memory bet = bets[i];
            League memory league = leagues[bet.leagueID];
            int score = bet.totalScore;
            if(league.tournamentID == _tournamentID ){
                for (uint j = 0; j < bet.golferIDs.length; j++ )
                    score += golfDataOracleContract.getGolferScore(bet.golferIDs[j], _tournamentID);
            }

            bets[i].totalScore = score;
        }


    }

    function getGolferCostWei(uint _golferID) internal view returns(uint) {
        return golfDataOracleContract.getGolferCost(_golferID);
    }


}
