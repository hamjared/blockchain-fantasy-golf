pragma solidity >=0.4.22 <0.6.0;
import "./Ownable.sol";



contract GolferData is Ownable {
  event NewGolfer(uint golferID, string name, uint cost);
  event GolferCostUpdated(uint golferID, uint newCost);

  struct Golfer {
      string name;
      uint golferID;
      mapping(uint => int) tournamentIDtoScore;
      uint cost;
  }


  mapping(uint => Golfer) golferIDtoGolfer;


  function createGolfer(string memory _name, uint _id, uint _cost) public onlyOwner golferDNE(_id){
      require(bytes(_name).length > 0);
      require(_id > 0);
      require(_cost > 0);
      golferIDtoGolfer[_id] = Golfer(_name, _id, _cost * 1 ether);
      emit NewGolfer(_id, _name, _cost);
  }

  function modifyGolferCost(uint _golferID, uint _newCost) public onlyOwner golferExists(_golferID) {
    golferIDtoGolfer[_golferID].cost = _newCost;
    emit GolferCostUpdated(_golferID, _newCost);
  }



  function getGolferScore(uint _golferID, uint _tournamentID) public view returns(int){
      return golferIDtoGolfer[_golferID].tournamentIDtoScore[_tournamentID];

  }

  function getGolfer(uint _id) public view returns (string memory, uint){
      return (golferIDtoGolfer[_id].name,golferIDtoGolfer[_id].cost) ;
  }

  function getGolferCost(uint _golferID) public golferExists(_golferID) view returns(uint){
      return golferIDtoGolfer[_golferID].cost;

  }

  modifier golferExists(uint _golferID){
    require(golferIDtoGolfer[_golferID].golferID == _golferID);
    _;
  }

  modifier golferDNE(uint _golferID){
    require(golferIDtoGolfer[_golferID].cost == 0);
    require(golferIDtoGolfer[_golferID].golferID == 0);
    require(bytes(golferIDtoGolfer[_golferID].name).length == 0);
    _;
  }
}
