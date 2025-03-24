import React, { useState } from "react";

//Internal import
import Style from "./AsignmentModal.module.css";

const AsignmentModal = ({
  asynRoleToStaff,
  currentStaffAddress,
  setAsignmentModal,
}) => {
  const [roleData, setroleData] = useState({
    roleName: "",
    staffAddress: currentStaffAddress,
    tokenReward: "",
  });

  const [staffAddress, setstaffAddress] = useState(currentStaffAddress);

  console.log("roleData", roleData);

  const handleSubmit = async () => {
    console.log("submittion clicked");

    try {
      await asynRoleToStaff(roleData);

      console.log("submittion clicked");

      //   setroleData({
      //     ...roleData,
      //     roleName: "",
      //     staffAddress: "",
      //     tokenReward: "",
      //   });
    } catch (error) {
      console.log("Error in assigning role to staff");
    }
  };
  return (
    <div className={Style.formContainer}>
      <div className={Style.formDiv}>
        <p className={Style.close} onClick={() => setAsignmentModal(false)}>
          x
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={Style.formGroup}>
            <label htmlFor="rolename">Task info:</label>
            <input
              type="text"
              id="rolename"
              placeholder="task info"
              onChange={(e) =>
                setroleData({
                  ...roleData,
                  roleName: e.target.value,
                })
              }
            />
          </div>

          <div className={Style.formGroup}>
            <label htmlFor="token">Reward Token Amount:</label>
            <input
              type="number"
              placeholder="Reward Token amount"
              id="token"
              onChange={(e) =>
                setroleData({
                  ...roleData,
                  tokenReward: e.target.value,
                })
              }
            />
          </div>

          {/* <label htmlFor="address">Staff Address:</label> */}
          <input
            type="hidden"
            placeholder="Staff address"
            id="address"
            onChange={(e) =>
              setroleData({
                ...roleData,
                staffAddress: e.target.value,
              })
            }
            value={roleData.staffAddress}
          />

          <button onClick={() => handleSubmit()}>Asign Task</button>
        </form>
      </div>
    </div>
  );
};

export default AsignmentModal;
