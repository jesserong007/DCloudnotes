const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("User", function () {
    const price = ethers.utils.parseEther("0.001","ether");
    
    it("Bang successful", async function () {
        const User = await ethers.getContractFactory("User");
        const user = await User.deploy();
        await user.deployed();

        const account = await ethers.getSigner();

        const _username = "jesse";
        const _pfp = "http://www.baodu.com";
        await user.connect(account).bangUserInfo(_username,_pfp,{value:price});
        //const userData = await user.connect(account).accounts[account];
        //console.log(userData);
        // assert
        expect(_username).to.be.equal('jesse');
    });
});
