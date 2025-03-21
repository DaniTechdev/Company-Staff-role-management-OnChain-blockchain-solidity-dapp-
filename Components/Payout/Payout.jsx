import React, { useState } from "react";

//Internal import
import Style from "./Payout.module.css";

const Payout = ({ withdrawal }) => {
  const [amount, setamount] = useState();
  return (
    <div>
      <h1>TOKEN WITHDRAWAL</h1>

      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input type="number" onChange={(e) => setamount(e.target.value)} />

        <button onClick={() => withdrawal(amount)}>Withdraw</button>
        <button onClick={() => withdrawal("partPayment")}>
          Withdraw all rewards
        </button>
      </form>
    </div>
  );
};

export default Payout;
