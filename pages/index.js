import React, { useState, useEffect, useContext } from "react";

//Internal imports
import { ManagementContext } from "../context/ManagementContext";

//Components import
import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";

const Home = () => {
  //context
  const {
    checkIfWalletIsConnected,
    connectWallet,
    getUserBalance,
    currentAccount,
    balance,
    registerStaff,
    asynRoleToStaff,
    getAllregStaff,
    checkIfStaffRegistered,
    checkIfRegistered,
  } = useContext(ManagementContext);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // checkIfWalletIsConnected();

  return (
    <div>
      <Navbar connectWallet={connectWallet} currentAccount={currentAccount} />
      <Hero
        checkIfStaffRegistered={checkIfStaffRegistered}
        checkIfRegistered={checkIfRegistered}
        currentAccount={currentAccount}
      />
    </div>
  );
};

export default Home;
