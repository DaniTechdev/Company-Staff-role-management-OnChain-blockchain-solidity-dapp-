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

const hre = require("hardhat");

async function main() {
  console.log("Deploying Token Contract 1...");
  const Token = await hre.ethers.getContractFactory("CompanyToken");
  const token = await Token.deploy({
    gasLimit: 5000000, // Increase gas limit
  });
  await token.deployed();
  console.log("Token deployed to:", token.address);

  console.log("Deploying Management Contract 2...");
  const Management = await hre.ethers.getContractFactory("CompanyManagement");
  const management = await Management.deploy(token.address, {
    gasLimit: 5000000, // Increase gas limit
  });
  await management.deployed();
  console.log("Management deployed to:", management.address);

  console.log("Granting MINTER_ROLE to Management Contract...");
  await token.grantRole(token.MINTER_ROLE(), management.address);
  console.log("MINTER_ROLE granted successfully");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
