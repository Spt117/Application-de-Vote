// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

import "./Vote.sol";
import "./VotePropositions.sol";

contract VoteFactory {
    Vote[] public VoteArray;
    VotePropositions[] public VotePropositionsArray;

    function createVote() public returns(Vote) {
        Vote voting = new Vote();
        return voting;
    }

    function createVotePropositions() public returns(VotePropositions) {
        VotePropositions voting = new VotePropositions();
        return voting;
    }

}