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
        address user;
    }


    League[] public leagues;
    Bet[] public bets;
    mapping(address => uint) userToBet; //Implies that an address will only be able to have 1 active bet.
    mapping(address => uint) ownerToLeagueID;
    mapping(uint => address) leagueIDtoOwner;
    mapping(uint => uint) leagueIDtoTournamentID;
    mapping( uint => address) leagueIDtoLeagueLeader;




    function updateUserScores(uint _tournamentID) public{
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

    function updateLeagueLeader(uint _leagueID) public {
        updateUserScores(leagues[_leagueID].tournamentID);
        leagueIDtoLeagueLeader[_leagueID] = findLeader(_leagueID);
    }

    function getLeagueLeader(uint _leagueID) public view returns(address){
      return leagueIDtoLeagueLeader[_leagueID];
    }

    function findLeader(uint _leagueID) internal view returns(address){
      int256 INT256_MIN = int256(uint256(1) << 255);
      int maxScore = INT256_MIN;
      address maxScoreUser = address(0);
      for (uint i = 0 ; i < bets.length; i++){
          Bet memory bet = bets[i];
          if(bet.leagueID == _leagueID){
            if(bet.totalScore > maxScore){
              maxScore = bet.totalScore;
              maxScoreUser = bet.user;
            }
          }
        }

        return maxScoreUser;
    }

    function updateGolferTournamentScore(uint _golferID, uint _tournamentID, int _score) public onlyOwner golferExists(_golferID) tournamentExists(_tournamentID){
        golferIDtoGolfer[_golferID].tournamentIDtoScore[_tournamentID] = _score;
    }





}
