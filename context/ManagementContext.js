import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT

import { contractAddresss, contractAbi } from "./constant";

//interact with our smart contract

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(contractAddresss, contractAbi, signerOrProvider);

export const ManagementContext = React.createContext();

export const ManagementProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");
  const [Staffdetails, setsetStaff] = useState();
  const [staffList, setSetStaff] = useState();
  const [staffRoleList, setstaffRoleList] = useState();

  const [tokenContract, setTokenContract] = useState(null);
  const [managementContract, setManagementContract] = useState(second);

  //token  and managemnent contracts functions, deployment and granting minting roles

  useEffect(() => {
    const tokenAddress = localStorage.getItem("tokenAddress");
    const managementAddress = localStorage.getItem("managementAddress");

    if (tokenAddress && managementAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const token = new ethers.Contract(tokenAddress, TokenABI, signer);
      const management = new ethers.Contract(
        managementAddress,
        ManagementABI,
        signer
      );

      setTokenContract(token);
      setManagementContract(management);
    }
  }, []);

  // Deploy Token Contract
  const deployTokenContract = async () => {
    const signer = await providerSigner.signer();

    const TokenFactory = new ethers.ContractFactory(
      TokenABI,
      TokenBytecode,
      signer
    );
    const token = await TokenFactory.deploy(managerAddress);
    await token.deployed();
    setTokenContract(token);
    localStorage.setItem("tokenAddress", token.address); // Save to local storage

    return token.address;
  };

  // Deploy Management Contract
  const deployManagementContract = async (tokenAddress) => {
    const signer = await providerSigner.signer();
    const ManagementFactory = new ethers.ContractFactory(
      ManagementABI,
      ManagementBytecode,
      signer
    );
    const management = await ManagementFactory.deploy(tokenAddress);
    await management.deployed();
    setManagementContract(management);
    localStorage.setItem("managementAddress", management.address); // Save to local storage
    return management.address;
  };

  // Grant Minting Role to Management Contract
  const grantMinterRole = async (tokenAddress, managementAddress) => {
    const signer = await connectWallet();
    const token = new ethers.Contract(tokenAddress, TokenABI, signer);
    await token.grantRole(
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")),
      managementAddress
    );
  };

  //CONNECTING METAMASK

  const providerSigner = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    return provider;
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("please install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      console.log("first account", accounts[0]);
    } else {
      setError("Please Install MetaMask & connect, reload");
    }
  };

  //--CONNECT WALLET
  //we will change the method
  const connectWallet = async () => {
    if (!window.ethereum) return setError("please install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
  };

  //function to for manager to register staff
  const registerStaff = async (user) => {
    const { name, address, gender } = user;

    console.log("staffAddress", address, "name", name, "gender", gender);

    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      console.log("Contract", contract);

      const registeredStaff = await contract.registerStaff(
        address,
        name,
        gender
      );

      registeredStaff.wait();

      window.location.reload();

      console.log("User registered onchain successfully");
    } catch (error) {
      console.log("Error trying to register staff");
    }
  };

  const asynRoleToStaff = async (roleData) => {
    console.log("roleData", roleData);

    // const { staffAddress, roleName, rewardToken } = roleData;

    // const staffAddress = "0xC89bA545a17b9a389F1dEB84E559F2a2C54ABEBB"; // Valid Ethereum address
    // const roleName = "Manager of Interns"; // Non-empty string
    // const rewardToken = "50000"; // Valid number (converted to uint256)

    // const tokenReward = Number(rewardToken);

    // console.log(
    //   "staffAddress",
    //   staffAddress,
    //   "roleName",
    //   roleName,
    //   "rewardToken",
    //   rewardToken
    // );

    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      console.log("contract", contract);

      const registeredStaff = await contract.assigntask(
        roleData.staffAddress,
        roleData.roleName,
        Number(roleData.tokenReward),
        { gasLimit: 500000 }
      );

      registeredStaff.wait();

      // window.location.reload();

      console.log("Role assyned to users successsfully");
    } catch (error) {
      console.log("Error trying to assyn role to users");
    }
  };

  const getUserBalance = async () => {
    try {
      const balance = await provider.getBalance(currentAccount); // Get balance in wei
      const balanceInEther = ethers.utils.formatEther(balance); // Convert wei to Ether
      setBalance(balanceInEther);
    } catch (error) {
      console.log("Error trying to get the balance");
    }
  };

  const getRegStaffDetails = async (userAddress) => {
    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const getRegStaff = await contract.getStaffDetails(userAddress);

      // console.log("getRegStaff", getRegStaff);

      return getRegStaff;
    } catch (error) {
      console.log("Error in getting registered users");
    }
  };

  const getAllregStaff = async () => {
    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      // console.log("contract", contract);

      let userList = [];

      const staffAddrrArray = await contract.getAllRegisteredAddress();
      // const staffAddrCount = await contract.userAddsressCount();
      // console.log("staffAddrrArray", staffAddrrArray);

      for (let i = 0; i < staffAddrrArray.length; i++) {
        const staffAddress = staffAddrrArray[i];
        // console.log("staffAddress", staffAddress);

        const staffDetails = await getRegStaffDetails(staffAddress);
        userList.push(staffDetails);
      }

      // console.log("userList", userList);

      return userList;
    } catch (error) {
      console.log("Error in getting all registered staff");
    }
  };

  const getAllRoles = async () => {
    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      console.log("contract", contract);

      let rolesList = [];

      const roleCounts = await contract.roleCount();
      // const staffAddrCount = await contract.userAddsressCount();
      console.log("roleCounts", roleCounts);

      for (let i = 1; i <= roleCounts; i++) {
        const role = await contract.getRoleDetails(i);
        rolesList.push(role);
      }

      console.log("rolesList", rolesList);

      return rolesList;
    } catch (error) {
      console.log("Error in getting all staff roless");
    }
  };

  const getAstaffRole = async (staffAddress) => {
    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      console.log("contract", contract);

      let staffRolesList = [];

      const staffProfileDetails = await contract.getStaffDetails(staffAddress);

      console.log("staffProfileDetails", staffProfileDetails);

      const staffRoleIdArray = staffProfileDetails.roleIds;
      console.log("staffRoleIdArray", staffRoleIdArray);

      // const staffAddrCount = await contract.userAddsressCount();
      // console.log("roleCounts", roleCounts);

      //using the lenght of the staffId array to get each
      for (let i = 0; i < staffRoleIdArray.length; i++) {
        const role = await contract.getRoleDetails(staffRoleIdArray[i]);
        staffRolesList.push(role);
      }

      console.log("staffRolesList", staffRolesList);
      setstaffRoleList(staffRolesList);

      return staffRolesList;
    } catch (error) {
      console.log("Error in getting a single staff roles");
    }
  };

  // getAstaffRole(currentAccount);

  const checkIfStaffRegistered = async (staffAddress) => {
    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      console.log("contract", contract);

      const staffArray = await contract.registeredStaffAddress();

      console.log("staffArray", staffArray);

      const isRegistered = staffArray.includes(staffAddress);

      return isRegistered;
    } catch (error) {
      console.log("Error in checking if staff is registered");
    }
  };

  // checkIfStaffRegistered("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  // console.log(
  //   checkIfStaffRegistered("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  // );

  const checkIfRegistered = async (staffAddress) => {
    // const staffAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    // Check if staff is registered
    checkIfStaffRegistered(staffAddress).then((isRegistered) => {
      if (isRegistered) {
        console.log("Staff is registered.");

        return true;
      } else {
        console.log("Staff is not registered.");
        return false;
      }
    });
  };

  const getSingleStaffProfile = async (staffAddress) => {
    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      console.log("contract", contract);
      let staffProfileDetail = [];

      const staffProfileDetails = await contract.getStaffDetails(staffAddress);

      console.log("staffProfileDetails", staffProfileDetails);
      staffProfileDetail.push(staffProfileDetails);

      console.log("staffProfileDetail", staffProfileDetail);
      setSetStaff(staffProfileDetail);

      // setsetStaff(staffProfileDetails);

      return staffProfileDetails;
    } catch (error) {
      console.log("Error in getting single staff profile");
    }
  };

  const textName = "My name is NATOCHI";
  return (
    <ManagementContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        getUserBalance,
        currentAccount,
        balance,
        registerStaff,
        asynRoleToStaff,
        textName,
        getRegStaffDetails,
        getAllregStaff,
        getAllRoles,
        checkIfStaffRegistered,
        checkIfRegistered,
        getSingleStaffProfile,
        Staffdetails,
        textName,
        staffList,
        staffRoleList,
        getAstaffRole,
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

// const ToDolistApp = () => {
//   return <div>ToDolistApp</div>;
// };

// export default ToDolistApp;
