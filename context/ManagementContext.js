import React, { useState, useEffect } from "react";
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
  const registerStaff = async (staffAddress, staffName) => {
    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const registeredStaff = await contract.registerStaff(
        staffAddress,
        staffName
      );

      registeredStaff.wait();

      window.location.reload();

      console.log("User registered onchain successfully");
    } catch (error) {
      console.log("Error trying to register staff");
    }
  };

  const asynRoleToStaff = async (staffAddress, roleName, rewardToken) => {
    try {
      const provider = await providerSigner();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const registeredStaff = await contract.assignRole(
        staffAddress,
        roleName,
        rewardToken
      );

      registeredStaff.wait();

      window.location.reload();

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

  return (
    <ManagementContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        getUserBalance,
        currentAccount,
        balance,
        registerStaff,
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
