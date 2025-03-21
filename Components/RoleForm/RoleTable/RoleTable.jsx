import React, { useState } from "react";

// Internal import
import Style from "./RoleTable.module.css";

// Internal import
// import { roleData } from "../../constantData"; // Assuming RoleData is imported from constantData

const RoleTable = ({ roleData, StatusChange }) => {
  const [newStatus, setNewStatus] = useState("");
  const [taskId, setTaskId] = useState("");

  console.log("taskId", taskId);
  console.log("newStatus", newStatus);

  return (
    <div className={Style.tableDiv}>
      <table>
        <thead>
          <tr>
            <th className={Style.table_th}>Task info</th>
            <th className={Style.table_th}>Staff name</th>
            <th className={Style.table_th}>Status</th>
            <th className={Style.table_th}>Action</th>
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
                  <p>{role.taskName}</p>
                </td>
                <td className={Style.table_th}>
                  <p>{role.taskAssignedToName}</p>
                </td>
                <td className={Style.table_th}>
                  <p>{role.status}</p>
                </td>
                <td className={Style.table_th}>
                  <p className={Style.action}>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">select</option>
                      <option value="inProgress">InProgress</option>
                      <option value="review">Review</option>
                      <option value="rejected">Reject</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button
                      onClick={() => StatusChange(role.taskId, newStatus)}
                    >
                      Submit
                    </button>
                  </p>
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
