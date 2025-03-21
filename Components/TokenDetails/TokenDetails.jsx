import React from "react";

//internal import
import Style from "./TokenDetails.module.css";

const TokenDetails = ({ tokenDetails }) => {
  return (
    <div className={Style.tokenContainer}>
      <h1>TOKENOMICS</h1>
      <p>Token Name: CTK</p>
      <p>Token Cap: Minting On Demand</p>
      <p>Token Total Minted: {tokenDetails.tokenTotalMintedSupply}</p>
      <p>
        Token Staff Withdrawable Balance: {tokenDetails.withdrawableBalance}
      </p>
    </div>
  );
};

export default TokenDetails;
