//Internal import
import ManagementJson from "./CompanyManagement.json";
import TokenJson from "./CompanyToken.json";

export const managerAccount = process.env.MANAGERADDRESS;

//Contract addresss of token and management contract
export const companyTokenContract =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const companyManagementContract =
  "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

//Token abi and management abi
export const companyTokenAbi = TokenJson.abi;
export const MgtcontractAbi = ManagementJson.abi;

//Token and management contract bytecodess
export const companyTokenBytecode = TokenJson.bytecode;
export const companyManagementBytecode = ManagementJson.bytecode;
