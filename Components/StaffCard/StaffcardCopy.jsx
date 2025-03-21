import React, { useEffect, useState, useContext } from "react";

//Internal Import
// import Style from "../../Components/Card/Style.module.css";
import Style from "./Staffcopy.module.css";
import { ManagementContext } from "../../context/ManagementContext";

const StaffcardCopy = ({ staffDataU, attendanReward }) => {
  function convertTime(timestamp) {
    const date = new Date(timestamp); // Create a new Date object from the timestamp

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0"); // Ensure day is 2 digits (e.g., 01, 02)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
    const year = date.getFullYear(); // Get the full year (e.g., 2025)

    // Return the formatted date in "day/month/year"
    return `${day}/${month}/${year}`;
  }

  const {
    checkIfWalletIsConnected,
    connectWallet,
    getUserBalance,
    currentAccount,
    balance,
    registerStaff,
    asynRoleToStaff,
    getAllregStaff,
    getAllRoles,
    getSingleStaffProfile,
    Staffdetails,
    staffList,
    textName,
    signAttendance,
  } = useContext(ManagementContext);

  console.log("CURRENT ACCOUTN", currentAccount);

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  // }, []);

  useEffect(() => {
    checkIfWalletIsConnected();

    const getStaffData = getSingleStaffProfile(currentAccount);

    // console.log("getStaffData", getStaffData);
    // setStaffData(getStaffData);

    // console.log("Get all getCampaignsData", getStaffData);

    return async () => {
      const allData = await getStaffData;
      //   console.log("allData", allData);

      //   setStaffData(allData);
    };
  }, []);
  // console.log("Staffdetails", Staffdetails);

  console.log("staffList", staffList);

  return (
    <div className={Style.container}>
      <h3>
        Reward for attendance in each 24hours: {""} {attendanReward?.toNumber()}{" "}
        CTK Token
      </h3>
      <table>
        <thead>
          <tr>
            <th className={Style.table_th}>Unique ID</th>
            <th className={Style.table_th}>Staff name</th>
            <th className={Style.table_th}>Earned Token</th>
            {/* <th className={Style.table_th}>staff address</th> */}
            <th className={Style.table_th_mdremove}>gender</th>
            {/* <th className={Style.table_th}>Task count</th> */}
            <th className={Style.table_th}>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {staffDataU?.map((staff, index) => {
            return (
              <tr key={index}>
                <td className={Style.table_th}>
                  <p>{index + 1}</p>
                </td>

                <td className={Style.table_th}>
                  <p>{staff.name}</p>
                </td>
                <td className={Style.table_th}>
                  <p>{staff.tokensEarned.toNumber()}</p>
                </td>
                {/* <td className={Style.table_th}>
                  <p>{staff.staffAddress.slice(0, 9)}...</p>
                </td> */}
                <td className={Style.table_th_mdremove}>
                  <p>{staff.gender}</p>
                </td>
                {/* <td className={Style.table_th}>
                  <p>{staff.taskIds.length}</p>
                </td> */}
                <td className={Style.table_th}>
                  <button onClick={() => signAttendance()}>
                    Sign Attendance
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile view */}
    </div>
  );
};

export default StaffcardCopy;
