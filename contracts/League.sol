pragma solidity >=0.4.22 <0.6.0;


import "./LeagueOwnership.sol";

contract League is LeagueOwnership {
    event NewBet(uint betID);

    

    function getLeagueMoneyPot(uint _leagueID) public view returns(uint){
      return leagues[_leagueID].moneyPot;
    }

    function placeBet(uint16[6] memory _golferIDs, uint32 _leagueID) public payable  noActiveBets correctEthValue(_golferIDs) leagueExists(_leagueID){
        uint id = bets.push(Bet(_golferIDs, _leagueID, 0, msg.sender )) - 1;
        userToBet[msg.sender] = id;
        leagues[_leagueID].moneyPot += msg.value;
        emit NewBet(id);
    }

    function placeBetNonArray(uint16 _golferID0, uint16 _golferID1, uint16 _golferID2, uint16 _golferID3, uint16 _golferID4, uint16 _golferID5, uint32 _leagueID ) public payable{
      uint16[6] memory _golferIDs;
      _golferIDs[0] = _golferID0;
      _golferIDs[1] = _golferID1;
      _golferIDs[2] = _golferID2;
      _golferIDs[3] = _golferID3;
      _golferIDs[4] = _golferID4;
      _golferIDs[5] = _golferID5;
      placeBet(_golferIDs, _leagueID);
    }

    function getUserGolferIds() public view returns(uint16[6] memory){
      Bet memory bet = bets[userToBet[msg.sender]];
      return bet.golferIDs;
    }

    function withdrawEther(uint _leagueID) public tournamentOver(leagues[_leagueID].tournamentID)  {
        updateLeagueLeader(_leagueID);
        require(leagueIDtoLeagueLeader[_leagueID] == msg.sender);
        uint valueToSend = leagues[_leagueID].moneyPot;
        leagues[_leagueID].moneyPot = 0;
        msg.sender.transfer(valueToSend);
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
            totalCostInWei += getGolferCost(_golferIDs[i]);
        }

        require(msg.value == totalCostInWei);
        _;
    }

    modifier leagueExists(uint _leagueID){
      //TODO
      _;
    }


}
