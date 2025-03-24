import React, { useState } from "react";

//Internal import
import Style from "./Staffrole.module.css";
import RoleDataModal from "./RoleDataModal";

const StaffRole = ({ roleData, StatusChange }) => {
  const [taskId, setTaskId] = useState("");
  const [openStatusModal, setopenStatusModal] = useState(false);

  console.log("taskId", taskId);

  return (
    <div className={Style.tableDiv}>
      <table>
        <thead>
          <tr>
            <th className={Style.table_th}>Task Name</th>
            <th className={Style.table_th}>Staff Name</th>
            <th className={Style.table_th}>Status</th>
            <th className={Style.table_th}>Token Reward</th>
            <th className={Style.table_th}>Action</th>
            <th className={Style.table_th_mdremove}>Created At</th>
            <th className={Style.table_th_mdremove}>Pending At</th>
            <th className={Style.table_th_mdremove}>Completed At</th>
            <th className={Style.table_th}></th>
          </tr>
        </thead>
        <tbody>
          {roleData?.map((task, index) => {
            console.log("task", task);

            // Format timestamps to readable dates
            const createdAt = new Date(task.createdAt * 1000).toLocaleString();
            const pendingAt = new Date(task.pendingAt * 1000).toLocaleString();
            const completedAt = task.completedAt.toNumber()
              ? new Date(task.completedAt * 1000).toLocaleString()
              : "Not Completed";

            return (
              <tr key={index}>
                <td className={Style.table_th}>
                  <p>{task.taskName}</p>
                </td>
                <td className={Style.table_th}>
                  <p>{task.taskAssignedToName}</p>
                </td>
                <td className={Style.table_th}>
                  <p>{task.status}</p>
                </td>
                <td className={Style.table_th}>
                  <p>{task.tokenReward.toNumber()}</p>
                </td>
                <td className={Style.table_th}>
                  {task.status == "Completed" ? (
                    <input className={Style.checkBox} type="checkbox" checked />
                  ) : task.status == "review" ? (
                    <button className={Style.statusBtn}>Review</button>
                  ) : (
                    <button
                      className={Style.statusBtn}
                      onClick={() => (
                        setopenStatusModal(true), setTaskId(task.taskId)
                      )}
                    >
                      Accept Task
                    </button>
                  )}
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
      {openStatusModal && (
        <RoleDataModal
          setopenStatusModal={setopenStatusModal}
          StatusChange={StatusChange}
          taskId={taskId}
        />
      )}
    </div>
  );
};

export default StaffRole;
