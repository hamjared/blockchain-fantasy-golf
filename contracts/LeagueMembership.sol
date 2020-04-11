pragma solidity >=0.4.22 <0.6.0;
import "./LeagueData.sol";

contract LeagueMembership is LeagueData {
    event NewBet(uint betID);

    mapping(address => uint) userToBet; //Implies that an address will only be able to have 1 active bet.



    function placeBet(uint16[6] memory _golferIDs, uint32 _leagueID) public payable noActiveBets correctEthValue(_golferIDs){
        uint id = bets.push(Bet(_golferIDs, _leagueID, 0 )) - 1;
        userToBet[msg.sender] = id;
        emit NewBet(id);
    }

    function placeBet(uint16 _golferID0, uint16 _golferID1, uint16 _golferID2, uint16 _golferID3, uint16 _golferID4, uint16 _golferID5, uint32 _leagueID ) public payable{
      uint16[6] memory _golferIDs;
      _golferIDs[0] = _golferID0;
      _golferIDs[1] = _golferID1;
      _golferIDs[2] = _golferID2;
      _golferIDs[3] = _golferID3;
      _golferIDs[4] = _golferID4;
      _golferIDs[5] = _golferID5;
      this.placeBet(_golferIDs, _leagueID);
    }

    function getBet() public view returns (uint16[6] memory, uint32, int){
        Bet memory bet = bets[userToBet[msg.sender]];
        return (bet.golferIDs, bet.leagueID, bet.totalScore);
    }

    modifier noActiveBets()  {
        require(userToBet[msg.sender] == 0);
        _;
    }

    modifier correctEthValue(uint16[6] memory _golferIDs){

        uint totalCostInWei = 0;
        for (uint i = 0; i < _golferIDs.length; i++){
            totalCostInWei += LeagueData.getGolferCostWei(_golferIDs[i]);
        }

        require(msg.value == totalCostInWei);
        _;
    }


}
