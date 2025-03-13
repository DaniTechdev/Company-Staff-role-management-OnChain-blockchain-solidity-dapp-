import React, { useContext, useEffect, useState } from "react";

//Internal import
import { ManagementContext } from "../context/ManagementContext";
import { Staff } from "../Components/constantData";
import Style from "../styles/staaff.module.css";
import Staffcard from "../Components/StaffCard/Staffcard";
import StaffRole from "../Components/Staff/StaffRole";
import RoleTable from "../Components/RoleForm/RoleTable/RoleTable";

const staff = () => {
  const [tab, setTab] = useState("");
  const [staffDataU, setStaffData] = useState(null);
  console.log("staffDataU", staffDataU);

  // console.log("staffDataU", staffDataU[0]);

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
    staffRoleList,
    getAstaffRole,
    textName,
  } = useContext(ManagementContext);

  console.log("CURRENT ACCOUTN", currentAccount);

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  // }, []);

  useEffect(() => {
    checkIfWalletIsConnected();

    const getStaffData = getSingleStaffProfile(currentAccount);
    const getStaffRole = getAstaffRole(currentAccount);

    // console.log("getStaffData", getStaffData);
    // setStaffData(getStaffData);

    // console.log("Get all getCampaignsData", getStaffData);

    return async () => {
      const allData = await getStaffData;
      const allStaffRole = await getStaffRole;
      console.log("allData", allData);
      console.log("allStaffRole", allStaffRole);

      setStaffData(allData);
    };
  }, [tab]);
  // console.log("Staffdetails", Staffdetails);

  console.log("staffList", staffList);

  return (
    <div className={Style.container}>
      <nav>
        <h1>Staff Dashboard</h1>
        <div>
          {" "}
          {staffList?.map((staff, index) => (
            <h1 key={index}>
              {" "}
              Welcome Mr {""}
              {staff.name}
            </h1>
          ))}
        </div>
        <p>Staff waallet: {currentAccount?.slice(0, 12)}...</p>
      </nav>

      <section>
        <div className={Style.leftbar}>
          <div className={Style.leftbarBtnContainer}>
            <button onClick={() => setTab("profile")}>View Profile</button>
          </div>
          <div className={Style.leftbarBtnContainer}>
            <button onClick={() => setTab("roles")}>View Roles/Task</button>
          </div>
          <div className={Style.leftbarBtnContainer}>
            <button>Signal History</button>
          </div>
        </div>
        <div className={Style.rightbar}>
          {tab === "profile" && <Staffcard staffDataU={staffList} />}
          {tab === "roles" && <StaffRole roleData={staffRoleList} />}
        </div>
      </section>
    </div>
  );
};

export default staff;
