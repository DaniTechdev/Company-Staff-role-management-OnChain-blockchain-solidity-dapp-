import React, { useState } from "react";
import Link from "next/link";

//Internal import
import Style from "./Navbar.module.css";

const Navbar = ({ connectWallet, currentAccount }) => {
  const [copied, setcopied] = useState(false);

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    // notifySuccess("Address copied successfully!");
  };

  return (
    <div className={Style.container}>
      <div className={Style.container_links}>
        <h1>Welcome</h1>
        <h1>Home</h1>
        <Link href={"/staff"}> Staff Dashboard</Link>
        <Link href={"/manager"}> Manager Dashboard</Link>
        {currentAccount ? (
          <p onClick={() => copyAddress(currentAccount)}>
            User account: {currentAccount.slice(0, 6)}....
          </p>
        ) : (
          <p onClick={() => connectWallet()}>Connect Wallet</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
