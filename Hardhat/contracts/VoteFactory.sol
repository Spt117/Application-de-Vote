// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./Vote.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VoteFactory {
   //    address immutable myWallet;

   Vote[] public Contrats;

   event newContract(Vote contrat, uint256 id);

   //    constructor(address _myWallet) {
   //       myWallet = _myWallet;
   //    }

   function createVote(bool _isVoterProposal) public {
      Vote voting = new Vote(_isVoterProposal);
      Contrats.push(voting);
      emit newContract(voting, Contrats.length - 1);
   }

   //    function paid(address _token, uint256 _decimales) public {
   //       bool result = IERC20(_token).transferFrom(msg.sender, myWallet, 50 * _decimales);
   //       require(result, "Transfer from error");
   //    }
}
