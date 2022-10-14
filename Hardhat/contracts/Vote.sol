// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;
import "./Ownable.sol";

contract Vote is Ownable {
    uint256[] public winningProposalID;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
    }

    struct Proposal {
        string description;
        uint256 voteCount;
    }

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping(address => Voter) voters;

    event VoterRegistered(address voterAddress);
    event WorkflowStatusChange(WorkflowStatus newStatus);
    event ProposalRegistered(uint256 proposalId);
    event Voted(address voter, uint256 proposalId);

    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // on peut faire un modifier pour les états

    // ::::::::::::: GETTERS ::::::::::::: //

    function getVoter(address _addr)
        external
        view
        onlyVoters
        returns (Voter memory)
    {
        return voters[_addr];
    }

    function getOneProposal(uint256 _id)
        external
        view
        onlyVoters
        returns (Proposal memory)
    {
        return proposalsArray[_id];
    }

    // ::::::::::::: REGISTRATION ::::::::::::: //

    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    // ::::::::::::: PROPOSAL ::::::::::::: //

    function addProposal(string memory _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        );

        proposalsArray.push(Proposal(_desc, 0));
        emit ProposalRegistered(proposalsArray.length - 1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    function setVote(uint256 _id) external onlyVoters {
        if (workflowStatus != WorkflowStatus.VotingSessionStarted)
            revert("Voting session havent started yet");
        if (voters[msg.sender].hasVoted) {
            revert("You have already voted");
        }
        if (_id >= proposalsArray.length)
            revert("Cette proposition n'existe pas !");
        if (
            keccak256(abi.encodePacked(proposalsArray[_id].description)) ==
            keccak256(abi.encodePacked(""))
        ) {
            revert("This proposal is empty.");
        }
        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted);
    }

    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded);
    }

    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted);
    }

    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded);
    }

    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );

        uint256 _winningProposalId;

        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (
                proposalsArray[p].voteCount >
                proposalsArray[_winningProposalId].voteCount
            ) {
                _winningProposalId = p;
            }
        }

        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (
                proposalsArray[p].voteCount ==
                proposalsArray[_winningProposalId].voteCount
            ) {
                winningProposalID.push(p);
            }
        }
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(WorkflowStatus.VotesTallied);
    }

    function reset(address[] memory voter) external onlyOwner {
        if (winningProposalID.length == 1) {
            for (uint256 v = 0; v < voter.length; v++) {
                voters[voter[v]] = Voter(false, false, 0);
            }
            delete winningProposalID;
            delete proposalsArray;
            workflowStatus = WorkflowStatus.RegisteringVoters;
            emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters);
        } else {
            for (uint256 v = 0; v < voter.length; v++) {
                voters[voter[v]] = Voter(true, false, 0);
            }
            uint256 vote = proposalsArray[winningProposalID[0]].voteCount;
            for (uint256 p = 0; p < proposalsArray.length; p++) {
                if (vote > proposalsArray[p].voteCount) {
                    proposalsArray[p] = Proposal("", 0);
                } else proposalsArray[p].voteCount = 0;
            }
            delete winningProposalID;
            workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
            emit WorkflowStatusChange(
                WorkflowStatus.ProposalsRegistrationEnded
            );
        }
    }
}
