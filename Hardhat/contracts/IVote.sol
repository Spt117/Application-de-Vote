// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

interface IVote {
   enum WorkflowStatus {
      RegisteringVoters,
      ProposalsRegistrationStarted,
      ProposalsRegistrationEnded,
      VotingSessionStarted,
      VotingSessionEnded,
      VotesTallied
   }

   struct Voter {
      bool isRegistered;
      bool hasVoted;
      uint256 votedProposalId;
   }

   struct Proposal {
      string description;
      uint256 voteCount;
   }

   event VoterRegistered(address voterAddress);
   event WorkflowStatusChange(WorkflowStatus newStatus);
   event ProposalRegistered(uint256 proposalId);
   event Voted(address voter, uint256 proposalId);
   event GetWinning(uint256[] winningProposal);

   function getVoter(address _addr) external view returns (Voter memory);

   function getOneProposal(uint256 _id) external view returns (Proposal memory);

   function addVoter(address _addr) external;

   function addProposal(string memory _desc) external;

   function setVote(uint256 _id) external;

   function startProposalsRegistering() external;

   function endProposalsRegistering() external;

   function startVotingSession() external;

   function endVotingSession() external;

   function tallyVotes() external;

   function reset() external;
}
