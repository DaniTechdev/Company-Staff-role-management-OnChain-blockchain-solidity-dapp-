import React, { useState, useEffect } from "react";
import Style from "./RoleForm.module.css";
import RoleTable from "./RoleTable/RoleTable";

const RoleForm = ({ asynRoleToStaff, allStaffRoles }) => {
  const [roleData, setroleData] = useState({
    roleName: "",
    staffAddress: "",
    tokenReward: "",
  });

  console.log("roleData", roleData);

  const handleSubmit = async () => {
    try {
      await asynRoleToStaff(roleData);
      setroleData({
        ...roleData,
        roleName: "",
        staffAddress: "",
        tokenReward: "",
      });
    } catch (error) {
      console.log("Error in assigning role to staff");
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.formDiv} onSubmit={(e) => e.preventDefault()}>
        <form>
          <div className={Style.formGroup}>
            <label htmlFor="rolename">Role Name:</label>
            <input
              type="text"
              id="rolename"
              placeholder="Rolename"
              onChange={(e) =>
                setroleData({
                  ...roleData,
                  roleName: e.target.value,
                })
              }
            />
          </div>
          <div className={Style.formGroup}>
            <label htmlFor="address">Staff Address to assign role to:</label>
            <input
              type="text"
              placeholder="Staff address"
              id="address"
              onChange={(e) =>
                setroleData({
                  ...roleData,
                  staffAddress: e.target.value,
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
          <button onClick={() => handleSubmit()}>Asign Role</button>
        </form>
      </div>

      <RoleTable roleData={allStaffRoles} />
    </div>
  );
};

export default RoleForm;
