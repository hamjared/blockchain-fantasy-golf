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

  function createGolfers(bytes32[] memory _names, uint[] memory _ids, uint[] memory _costs) public onlyOwner{
    require(_names.length == _ids.length);
    require(_names.length == _costs.length);

    for(uint i = 0 ; i < _names.length; i++){
      createGolfer(bytes32ToString(_names[i]), _ids[i], _costs[i]);
    }
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

  function getGolferName(uint _golferID) public golferExists(_golferID) view returns(string memory) {
    return golferIDtoGolfer[_golferID].name;
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

  function bytes32ToString(bytes32 x) private pure returns (string memory) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    for (uint j = 0; j < 32; j++) {
        byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
        if (char != 0) {
            bytesString[charCount] = char;
            charCount++;
        }
    }
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (uint j = 0; j < charCount; j++) {
        bytesStringTrimmed[j] = bytesString[j];
    }
    return string(bytesStringTrimmed);
}
}
