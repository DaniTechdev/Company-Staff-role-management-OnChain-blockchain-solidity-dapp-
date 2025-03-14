// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const companymanagement = await hre.ethers.getContractFactory(
//     "CompanyManagement"
//   );
//   const Companymanagement = await companymanagement.deploy();

//   await Companymanagement.deployed();

//   console.log("Lock with 1 ETH deployed to:", Companymanagement.address);

//   // console.log("Companymanagement", Companymanagement);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Deploy Token Contract (Manager: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)
  const Token = await hre.ethers.getContractFactory("CompanyToken");
  const token = await Token.deploy(
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  );
  await token.deployed();

  // Deploy Management Contract
  const Management = await hre.ethers.getContractFactory("CompanyManagement");
  const management = await Management.deploy(token.address);
  await management.deployed();

  // Grant MINTER_ROLE to Management Contract
  await token.grantRole(token.MINTER_ROLE(), management.address);

  console.log("Token deployed to:", token.address);
  console.log("Management deployed to:", management.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
