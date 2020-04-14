pragma solidity >=0.4.22 <0.6.0;
import "./LeagueData.sol";


contract LeagueOwnership is LeagueData {
  event NewLeague(uint leagueID, string leagueName, uint tournamentID);

    mapping(address => uint) userToLeagueOwnershipCount;
    

    function createLeague(uint _tournamentID, string memory _leagueName) public noDuplicateLeagueOwner tournamentExists(_tournamentID) {
        uint id = leagues.push(League(_tournamentID,0, _leagueName)) - 1;
        ownerToLeagueID[msg.sender] = id;
        userToLeagueOwnershipCount[msg.sender] += 1;
        leagueIDtoOwner[id] = msg.sender;
        leagueIDtoTournamentID[id] = _tournamentID;
        emit NewLeague(id, _leagueName, _tournamentID);

    }

    modifier noDuplicateLeagueOwner(){
        require(userToLeagueOwnershipCount[msg.sender] == 0);
        _;
    }






}
