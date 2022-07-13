//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract User {
    address public owner;

    constructor() {
        owner   = msg.sender;
    }

    struct Account {
    	string username;
        string pfp;
    	address acount;
    }

    mapping(address => Account) public accounts;

    function bangUserInfo(string memory _username,string memory _pfp) external payable {
        require (msg.value == (0.001 ether),"Please submit 0.001 ether");

    	accounts[msg.sender] = Account (
    		_username,
    		_pfp,
    		msg.sender
    	);

        payable(owner).transfer(msg.value);
    }
    
}