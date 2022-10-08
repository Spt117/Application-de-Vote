// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Vote {
    uint data;
    
    function setData(uint _data) public {
        data = _data;
    }

    function getData() public view returns(uint) {
        return data;
    }
}
