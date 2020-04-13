pragma solidity >=0.4.22 <0.6.0;
import "./TournamentData.sol";
import "./GolferData.sol";

contract LeagueData is TournamentData, GolferData {

    struct League{
        uint tournamentID;
        uint moneyPot;
        string leagueName;
    }

    struct Bet {
        uint16[6] golferIDs;
        uint32 leagueID;
        int totalScore;
    }


    League[] public leagues;
    Bet[] public bets;
    mapping(address => uint) userToBet; //Implies that an address will only be able to have 1 active bet.
    mapping(address => uint) ownerToLeagueID;
    mapping(uint => address) leagueIDtoOwner;
    mapping(uint => uint) leagueIDtoTournamentID;



    function updateUserScores(uint _tournamentID) external{
        for (uint i = 0 ; i < bets.length; i++){
            Bet memory bet = bets[i];
            League memory league = leagues[bet.leagueID];
            int score = bet.totalScore;
            if(league.tournamentID == _tournamentID ){
                for (uint j = 0; j < bet.golferIDs.length; j++ )
                    score += GolferData.getGolferScore(bet.golferIDs[j], _tournamentID);
            }

            bets[i].totalScore = score;
        }


    }

    function updateGolferTournamentScore(uint _golferID, uint _tournamentID, int _score) public onlyOwner{
        golferIDtoGolfer[_golferID].tournamentIDtoScore[_tournamentID] = _score;
    }



}
