import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";

//Internal import
import { ManagementContext } from "../context/ManagementContext";
import { Staff } from "../Components/constantData";
import Style from "../styles/staaff.module.css";
import Staffcard from "../Components/StaffCard/Staffcard";
import StaffRole from "../Components/Staff/StaffRole";
import RoleTable from "../Components/RoleForm/RoleTable/RoleTable";
import StaffcardCopy from "../Components/StaffCard/StaffcardCopy";
import Payout from "../Components/Payout/Payout";

const staff = () => {
  const [tab, setTab] = useState("");
  const [staffDataU, setStaffData] = useState(null);
  const [staffTask, setStaffTask] = useState(null);
  const [openHandburger, setopenHandburger] = useState(false);

  // console.log("staffDataU", staffDataU);
  console.log("staffTask", staffTask);

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
    staffTaskList,
    getAstaffRole,
    textName,
    signAttendance,
    attendanReward,
    getAttendanceReward,
    withdrawal,
  } = useContext(ManagementContext);

  console.log("CURRENT ACCOUTN", currentAccount);
  // console.log("staffList", staffList);

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  // }, []);

  useEffect(() => {
    checkIfWalletIsConnected();

    const getStaffData = getSingleStaffProfile(currentAccount);
    const getStaffRole = getAstaffRole(currentAccount);
    const attendanceReward = getAttendanceReward();

    // console.log("getStaffData", getStaffData);
    // setStaffData(getStaffData);

    // console.log("Get all getCampaignsData", getStaffData);

    return async () => {
      const allData = await getStaffData;
      const allStaffRole = await getStaffRole;
      console.log("allData", allData);
      console.log("allStaffRole", allStaffRole);

      setStaffData(allData);
      setStaffTask(allStaffRole);
    };
  }, [tab]);
  // console.log("Staffdetails", Staffdetails);

  console.log("staffList", staffList);

  return (
    <div className={Style.container}>
      <nav>
        <h1>Staff Dashboard</h1>
        <div className={Style.staff_name}>
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
        <div className={Style.hanbuger_icon}>
          {!openHandburger ? (
            <GiHamburgerMenu
              size={25}
              onClick={() => setopenHandburger(true)}
            />
          ) : (
            <FaWindowClose size={25} onClick={() => setopenHandburger(false)} />
          )}
        </div>
      </nav>

      <section>
        <div className={Style.leftbar}>
          <div className={Style.leftbarBtnContainer}>
            <button onClick={() => setTab("profile")}>View Profile</button>
          </div>
          <div className={Style.leftbarBtnContainer}>
            <button onClick={() => setTab("Assigned Tasks")}>
              View Roles/Task
            </button>
          </div>
          <div className={Style.leftbarBtnContainer}>
            <button onClick={() => setTab("Attendance")}>
              Sign Attendance
            </button>
          </div>
          <div className={Style.leftbarBtnContainer}>
            <button onClick={() => setTab("withdraw")}>
              Withdraw Reward Token
            </button>
          </div>
        </div>
        <div className={Style.rightbar}>
          {tab === "profile" && <Staffcard staffDataU={staffList} />}
          {tab === "Assigned Tasks" && <StaffRole roleData={staffTaskList} />}
          {tab === "Attendance" && (
            <StaffcardCopy
              staffDataU={staffList}
              signAttendance={signAttendance}
              attendanReward={attendanReward}
            />
          )}
          {tab == "withdraw" && <Payout withdrawal={withdrawal} />}
        </div>

        {openHandburger ? (
          <div className={Style.ModalModel}>
            <div className={Style.leftbarBtnContainer}>
              <button onClick={() => setTab("profile")}>View Profile</button>
            </div>
            <div className={Style.leftbarBtnContainer}>
              <button onClick={() => setTab("Assigned Tasks")}>
                View Roles/Task
              </button>
            </div>
            <div className={Style.leftbarBtnContainer}>
              <button onClick={() => setTab("Attendance")}>
                Sign Attendance
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </section>

      {/* MOBILE VIEW */}
    </div>
  );
};

export default staff;
