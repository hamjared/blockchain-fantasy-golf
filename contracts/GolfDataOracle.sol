pragma solidity >=0.4.22 <0.6.0;
import "./Ownable.sol";
contract GolfDataOracle is Ownable {

    struct Golfer {
        string name;
        uint golferID;
        mapping(uint => int) tournamentIDtoScore;
        uint cost;
    }

    struct Tournament {
    uint32 startTime;
    uint32 endTime;
    mapping(uint => int) golferIDToScore;
    string tournamentName;

    }


    mapping(uint => Golfer) golferIDtoGolfer;
    mapping(uint => Tournament) tournamentIDtoTournament;

    function createGolfer(string memory _name, uint _id, uint _cost) public onlyOwner{
        golferIDtoGolfer[_id] = Golfer(_name, _id, _cost * 1 ether);
    }

    function createTournament(uint _tournamentID, string memory _name, uint32 _startTime, uint32 _endTime) public onlyOwner{
        tournamentIDtoTournament[_tournamentID] = Tournament(_startTime, _endTime, _name);
    }

    function updateTournamentStartTime(uint _tournamentID,uint32 _newStartTime) public onlyOwner{
        tournamentIDtoTournament[_tournamentID].startTime = _newStartTime;
    }

     function updateTournamentEndTime(uint _tournamentID,uint32 _newEndTime) public onlyOwner{
        tournamentIDtoTournament[_tournamentID].endTime = _newEndTime;
    }

    function updateGolferTournamentScore(uint _golferID, uint _tournamentID, int _score) public onlyOwner{
        golferIDtoGolfer[_golferID].tournamentIDtoScore[_tournamentID] = _score;
    }

    function getGolferScore(uint _golferID, uint _tournamentID) public view returns(int){
        return golferIDtoGolfer[_golferID].tournamentIDtoScore[_tournamentID];

    }

    function getGolfer(uint _id) public view returns (string memory, uint){
        return (golferIDtoGolfer[_id].name,golferIDtoGolfer[_id].cost) ;
    }

    function getGolferCost(uint _golferID) public view returns(uint){
        return golferIDtoGolfer[_golferID].cost;

    }


}
