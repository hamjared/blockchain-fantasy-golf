pragma solidity >=0.4.22 <0.6.0;

import "./LeagueMembership.sol";
import "./LeagueOwnership.sol";

contract League is LeagueMembership, LeagueOwnership {

    function getContractBalance() public view returns(uint256){
        return address(this).balance ;
    }
}
