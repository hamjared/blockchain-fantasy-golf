pragma solidity >=0.4.22 <0.6.0;
import "./LeagueData.sol";


contract LeagueOwnership is LeagueData {
  event NewLeague(uint leagueID, string leagueName, uint tournamentID);

    mapping(address => uint) userToLeagueOwnershipCount;
    mapping(address => uint) userToLeagueID;
    mapping(uint => address[6]) leagueIDtoUsers;

    function createLeague(uint _tournamentID, string memory _leagueName, address[6] memory userAddresses) public noDuplicateLeagueOwner tournamentExists(_tournamentID) {
        uint id = leagues.push(League(_tournamentID,0, _leagueName)) - 1;
        ownerToLeagueID[msg.sender] = id;
        userToLeagueOwnershipCount[msg.sender] += 1;
        leagueIDtoOwner[id] = msg.sender;
        leagueIDtoTournamentID[id] = _tournamentID;
        for (uint i = 0; i < 6; i++){
          userToLeagueID[userAddresses[i]] = id;
        }
        leagueIDtoUsers[id] = userAddresses;
        emit NewLeague(id, _leagueName, _tournamentID);


    }

    function createLeagueNonArray(uint _tournamentID, string memory _leagueName, address _userAddress0, address _userAddress1, address _userAddress2, address _userAddress3, address _userAddress4, address _userAddress5) public{
      address[6] memory _userAddresses;
      _userAddresses[0] = _userAddress0;
      _userAddresses[1] = _userAddress1;
      _userAddresses[2] = _userAddress2;
      _userAddresses[3] = _userAddress3;
      _userAddresses[4] = _userAddress4;
      _userAddresses[5] = _userAddress5;
      createLeague(_tournamentID, _leagueName, _userAddresses);
    }

    modifier noDuplicateLeagueOwner(){
        require(userToLeagueOwnershipCount[msg.sender] == 0);
        _;
    }

    function getLeagueID() public view returns(uint){
      return userToLeagueID[msg.sender];
    }






}
