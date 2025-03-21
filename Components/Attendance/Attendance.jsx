import React, { useState } from "react";

//Internal Import
import Style from "./Attendance.module.css";

const Attendance = ({ setAttendanceTokenReward, attendanReward }) => {
  const [amount, setAmount] = useState(null);

  return (
    <div className={Style.attendanceContainer}>
      <h1>ATTENDANCE METER</h1>
      <div>
        <h2>SET THE ATTENDANCE TOKEN REWARD</h2>
        <h3>
          Each Attendance Reward is {""}: {attendanReward.toNumber()} CTK Token
        </h3>
      </div>

      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className={Style.inputField}>
          <label htmlFor="attendance"> Amount</label>: {""}
          <input
            type="number"
            placeholder="set attendance amount"
            id="attendance"
            // value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button onClick={() => setAttendanceTokenReward(amount)}>
          Set Attendance Value
        </button>
      </form>
    </div>
  );
};

export default Attendance;
