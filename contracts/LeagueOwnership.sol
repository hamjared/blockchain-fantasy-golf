pragma solidity >=0.4.22 <0.6.0;
import "./LeagueData.sol";


contract LeagueOwnership is LeagueData {
    mapping(address => uint) ownerToLeagueID;
    mapping(uint => address) leagueIDtoOwner;
    mapping(uint => uint) leagueIDtoTournamentID;


    function createLeague(uint _tournamentID, string memory _leagueName) public noDuplicateLeageOwner{
        uint id = leagues.push(League(_tournamentID, _leagueName));
        ownerToLeagueID[msg.sender] = id;
        leagueIDtoOwner[id] = msg.sender;
        leagueIDtoTournamentID[id] = _tournamentID;

    }

    modifier noDuplicateLeageOwner(){
        require(ownerToLeagueID[msg.sender] == 0);
        _;
    }


}
