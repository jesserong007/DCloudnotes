// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async function main() {
  const User = await ethers.getContractFactory("User");
  const user = await User.deploy();
  await user.deployed();

  // 0xe62B8312B46704d3fa3c53edB2DbFc392B6ed72a
  console.log("User deployed to:", user.address);

  const UserNotes = await ethers.getContractFactory("UserNotes");
  const userNotes = await UserNotes.deploy();
  await userNotes.deployed();

  // 0x0c0789CBB453Bca1e67A899f2643aec2E5E25d8D
  console.log("UserNotes deployed to:", userNotes.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
