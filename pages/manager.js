import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";

//Internal import
import Style from "../styles/manager.module.css";
import { buttons } from "../Components/constantData";
import MobileModel from "../Components/Models/HamburgerModal";
import { StaffData } from "../Components/constantData";

import { ManagementContext } from "../context/ManagementContext";
import managerAccount from "../context/constant";
import Forms from "../Components/Form/Form";
import Card from "../Components/Card/Card";
import RoleForm from "../Components/RoleForm/RoleForm";
import Attendance from "../Components/Attendance/Attendance";
import TokenDetails from "../Components/TokenDetails/TokenDetails";

const manager = () => {
  const [index, setindex] = useState(null);
  const [openHandburger, setopenHandburger] = useState(false);
  const [allStaffData, setallStaffData] = useState();
  const [allStaffRoles, setallStaffRoles] = useState();
  const [AttendanceRewaard, setAttendanceRewaard] = useState();
  // console.log("openHandburger Clicked", openHandburger);

  console.log("allStaffRoles", allStaffRoles);

  console.log("All staff Data", allStaffData);

  console.log("AttendanceRewaard", AttendanceRewaard);

  const handleIndex = (index) => {
    setindex(index);

    // console.log("Index", index);
  };

  useEffect(() => {
    const getStaffData = getAllregStaff();
    const allStaffRole = getAllRoles();
    const attendanceReward = getAttendanceReward();
    const tokenDetails = getTokenDetails();

    console.log("getStaffData", getStaffData);
    console.log("allStaffRole", allStaffRole);
    // console.log("attendanceReward", attendanceReward);

    // console.log("Get all getCampaignsData", getStaffData);

    return async () => {
      const allRoleData = await allStaffRole;
      const allData = await getStaffData;
      const allAttendReward = attendanceReward;
      setallStaffRoles(allRoleData);
      setallStaffData(allData);
      // setAttendanceRewaard(allAttendReward);
    };
  }, [index]);

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
    StatusChange,
    setAttendanceTokenReward,
    getAttendanceReward,
    attendanReward,
    getTokenDetails,
    tokenDetails,
  } = useContext(ManagementContext);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return currentAccount == 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 ? (
    <div className={Style.container}>
      <nav>
        <h1>Manager Dashboard</h1>

        <div>Manager account :{currentAccount.slice(0, 9)}...</div>
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

      <div className={Style.container2}>
        <div className={Style.leftbar}>
          {buttons.map((button) => (
            <div className={Style.leftbarBtnContainer} key={button.index}>
              <button
                onClick={() => {
                  setopenHandburger(false);
                  setindex(button.index);
                }}
              >
                {button.label}
              </button>
            </div>
          ))}
        </div>

        {index == 1 && (
          <Forms
            registerStaff={registerStaff}
            setindex={index}
            setopenHandburger={setopenHandburger}
          />
        )}

        {index == 2 && (
          <Card
            StaffData={StaffData}
            allStaffData={allStaffData}
            asynRoleToStaff={asynRoleToStaff}
          />
        )}
        {index == 3 && (
          <RoleForm
            asynRoleToStaff={asynRoleToStaff}
            allStaffRoles={allStaffRoles}
            StatusChange={StatusChange}
          />
        )}

        {index == 4 && (
          <Attendance
            setAttendanceTokenReward={setAttendanceTokenReward}
            attendanReward={attendanReward}
          />
        )}
        {index == 5 && <TokenDetails tokenDetails={tokenDetails} />}
      </div>

      {/* MOBILE VIEW */}

      {openHandburger ? (
        <div className={Style.ModalModel}>
          <MobileModel handleIndex={handleIndex} />
        </div>
      ) : (
        ""
      )}
    </div>
  ) : null;
};

export default manager;
