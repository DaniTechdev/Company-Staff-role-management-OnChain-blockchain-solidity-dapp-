import React, { useState } from "react";

//Internal import
import Style from "./Payout.module.css";
import WithdrawalForm from "./WithdrawalForm";

const Payout = ({ withdrawal }) => {
  const [openWithdrawalMode, setopenWithdrawalMode] = useState(false);

  const [amount, setamount] = useState();
  return (
    <div className={Style.payContainer}>
      <h1>TOKEN WITHDRAWAL</h1>

      <div className={Style.btnContainer}>
        <button
          className={Style.btnFull}
          onClick={() => withdrawal("fullPayment")}
        >
          Withdraw All Tokens
        </button>
        <button
          className={Style.btnPArt}
          onClick={() => setopenWithdrawalMode(true)}
        >
          Withdraw In Part
        </button>
      </div>

      {openWithdrawalMode && (
        <WithdrawalForm
          withdrawal={withdrawal}
          setopenWithdrawalMode={setopenWithdrawalMode}
          setamount={setamount}
          amount={amount}
        />
      )}

      <div className={Style.walletDetails}>
        <h3>My Wallet Address: 0x234555...</h3>
        <h3>Wallet Balance: 8000O OCK</h3>
      </div>
    </div>
  );
};

export default Payout;
