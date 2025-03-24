import React, { useState } from "react";

//Internal import
import Style from "./RoleDataModal.module.css";

const RoleDataModal = ({ setopenStatusModal, StatusChange, taskId }) => {
  const [newStatus, setNewStatus] = useState("");

  console.log("newStatus", newStatus);

  return (
    <div className={Style.statusModal}>
      <div className={Style.action}>
        <p onClick={() => setopenStatusModal(false)}>X</p>
        <select name="" id="" onChange={(e) => setNewStatus(e.target.value)}>
          <option value="">select</option>
          <option value="inProgress">InProgress</option>
          <option value="review">Review</option>
          <option value="rejected">Reject</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={() => StatusChange(taskId, newStatus)}>Submit</button>
      </div>
    </div>
  );
};

export default RoleDataModal;
