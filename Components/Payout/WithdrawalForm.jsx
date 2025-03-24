import React from "react";

//Internal import
import Style from "./Withdrawal.module.css";

const WithdrawalForm = ({
  withdrawal,
  setamount,
  setopenWithdrawalMode,
  amount,
}) => {
  return (
    <div className={Style.withdrawalContainer}>
      <div className={Style.formDiv}>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <p onClick={() => setopenWithdrawalMode(false)}>X</p>

          <div className={Style.inputContainers}>
            <label htmlFor="amount"> Amount</label>
            <input
              type="number"
              onChange={(e) => setamount(e.target.value)}
              placeholder="withdraw amount"
              id="amount"
            />
          </div>
          <button onClick={() => withdrawal(amount)}>Withdraw</button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalForm;
