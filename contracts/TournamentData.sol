pragma solidity >=0.4.22 <0.6.0;
import "./Ownable.sol";

contract OracleInterface{

}

contract TournamentData is Ownable {

  address golfDataOracleAddress = 0x5b0C9dC0AFE417858DcC8dB5269E47ABc572AA77 ;

  OracleInterface golfDataOracleContract = OracleInterface(golfDataOracleAddress);

  event TournamentCreated(uint tournamentID, string name, uint startTime, uint endTime);

  struct Tournament {
  uint32 startTime;
  uint32 endTime;
  mapping(uint => int) golferIDToScore;
  string tournamentName;

  }


  mapping(uint => Tournament) tournamentIDtoTournament;



  function createTournament(uint _tournamentID, string memory _name, uint32 _startTime, uint32 _endTime) public onlyOwner tournamentDNE(_tournamentID){
      require(now < _startTime);
      require(_endTime > _startTime);
      require(_tournamentID > 0);
      tournamentIDtoTournament[_tournamentID] = Tournament(_startTime, _endTime, _name);
      emit TournamentCreated(_tournamentID, _name, _startTime, _endTime);
  }


  function updateTournamentStartTime(uint _tournamentID,uint32 _newStartTime) public onlyOwner tournamentExists(_tournamentID){
      tournamentIDtoTournament[_tournamentID].startTime = _newStartTime;
  }

   function updateTournamentEndTime(uint _tournamentID,uint32 _newEndTime) public onlyOwner tournamentExists(_tournamentID){
      tournamentIDtoTournament[_tournamentID].endTime = _newEndTime;
  }

  modifier tournamentExists(uint _tournamentID){
    //TODO
    _;
  }

  modifier tournamentDNE(uint _tournamentID){
    require(bytes(tournamentIDtoTournament[_tournamentID].tournamentName).length == 0);
    require(tournamentIDtoTournament[_tournamentID].startTime == 0);
    _;
  }

}
