pragma solidity >=0.4.22 <0.6.0;
import "./LeagueData.sol";


contract LeagueOwnership is LeagueData {
  event NewLeague(uint leagueID, string leagueName, uint tournamentID);


    function createLeague(uint _tournamentID, string memory _leagueName) public noDuplicateLeageOwner tournamentExists(_tournamentID) {
        uint id = leagues.push(League(_tournamentID,0, _leagueName));
        ownerToLeagueID[msg.sender] = id;
        leagueIDtoOwner[id] = msg.sender;
        leagueIDtoTournamentID[id] = _tournamentID;
        emit NewLeague(id, _leagueName, _tournamentID);

    }

    modifier noDuplicateLeageOwner(){
        require(ownerToLeagueID[msg.sender] == 0);
        _;
    }

    modifier tournamentExists(uint _tournamentID){
      //TODO
      _;
    }


}
