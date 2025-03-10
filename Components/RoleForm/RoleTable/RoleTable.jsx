import React from "react";

// Internal import
import Style from "./RoleTable.module.css";

// Internal import
// import { roleData } from "../../constantData"; // Assuming RoleData is imported from constantData

const RoleTable = ({ roleData }) => {
  return (
    <div className={Style.tableDiv}>
      <table>
        <thead>
          <tr>
            <th className={Style.table_th}>Role Name</th>
            <th className={Style.table_th}>Staff Address</th>
            <th className={Style.table_th}>Status</th>
            <th className={Style.table_th}>Token Reward</th>
            <th className={Style.table_th_mdremove}>Created At</th>
            <th className={Style.table_th_mdremove}>Pending At</th>
            <th className={Style.table_th_mdremove}>Completed At</th>
            <th className={Style.table_th}></th>
          </tr>
        </thead>
        <tbody>
          {roleData?.map((role, index) => {
            console.log("role", role);

            // Format timestamps to readable dates
            const createdAt = new Date(role.createdAt * 1000).toLocaleString();
            const pendingAt = new Date(role.pendingAt * 1000).toLocaleString();
            const completedAt = role.completedAt.toNumber()
              ? new Date(role.completedAt * 1000).toLocaleString()
              : "Not Completed";

            return (
              <tr key={index}>
                <td className={Style.table_th}>
                  <p>{role.roleName}</p>
                </td>
                <td className={Style.table_th}>
                  <p>0x4537739809e...</p>
                </td>
                <td className={Style.table_th}>
                  <p>{role.status}</p>
                </td>
                <td className={Style.table_th}>
                  <p>{role.tokenReward.toNumber()}</p>
                </td>
                <td className={Style.table_th_mdremove}>
                  <p>{createdAt}</p>
                </td>
                <td className={Style.table_th_mdremove}>
                  <p>{pendingAt}</p>
                </td>
                <td className={Style.table_th_mdremove}>
                  <p>{completedAt}</p>
                </td>
                <td className={Style.table_th}>
                  <button>See details</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
