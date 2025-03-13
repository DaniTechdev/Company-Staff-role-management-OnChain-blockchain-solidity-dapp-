import React, { useState, useEffect } from "react";
import Image from "next/image";

//Internal import
import Style from "./Style.module.css";

const Card = ({ StaffData, allStaffData }) => {
  function convertTime(timestamp) {
    const date = new Date(timestamp); // Create a new Date object from the timestamp

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0"); // Ensure day is 2 digits (e.g., 01, 02)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
    const year = date.getFullYear(); // Get the full year (e.g., 2025)

    // Return the formatted date in "day/month/year"
    return `${day}/${month}/${year}`;
  }

  // useEffect(() => {
  //   const getStaffData = getAllregStaff();

  //   console.log("getStaffData", getStaffData);

  //   console.log("Get all getCampaignsData", getStaffData);

  //   return async () => {
  //     const allData = await getStaffData;
  //     setallStaffData(allData);
  //   };
  // }, []);

  // useEffect(async () => {
  //   const alDatta = await getAllregStaff();

  //   setallStaffData(alDatta);
  // }, []);

  return (
    <div className={Style.container}>
      <table>
        <thead>
          <tr>
            <th className={Style.table_th}>Unique ID</th>
            <th className={Style.table_th}>Staff name</th>
            <th className={Style.table_th}>Earned Token</th>
            <th className={Style.table_th}>staff address</th>
            <th className={Style.table_th_mdremove}>gender</th>
            <th className={Style.table_th}>role count</th>
            <th className={Style.table_th}></th>
          </tr>
        </thead>
        <tbody>
          {allStaffData?.map((staff, index) => {
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
                <td className={Style.table_th}>
                  <p>{staff.staffAddress.slice(0, 9)}...</p>
                </td>
                <td className={Style.table_th_mdremove}>
                  <p>{staff.gender}</p>
                </td>
                <td className={Style.table_th}>
                  <p>{staff.roleIds.length}</p>
                </td>
                <td className={Style.table_th}>
                  <button>See details</button>
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

export default Card;
