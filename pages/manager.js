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

const manager = () => {
  const [index, setindex] = useState(null);
  const [openHandburger, setopenHandburger] = useState(false);
  const [allStaffData, setallStaffData] = useState();
  // console.log("StaffData", StaffData);

  // console.log("All staff Data", allStaffData);

  const handleIndex = (index) => {
    setindex(index);

    // console.log("Index", index);
  };

  useEffect(() => {
    const getStaffData = getAllregStaff();

    console.log("getStaffData", getStaffData);

    console.log("Get all getCampaignsData", getStaffData);

    return async () => {
      const allData = await getStaffData;
      setallStaffData(allData);
    };
  }, []);
  const {
    checkIfWalletIsConnected,
    connectWallet,
    getUserBalance,
    currentAccount,
    balance,
    registerStaff,
    asynRoleToStaff,
    getAllregStaff,
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
              <button onClick={() => setindex(button.index)}>
                {button.label}
              </button>
            </div>
          ))}
        </div>

        {index == 1 ? (
          <Forms registerStaff={registerStaff} setindex={index} />
        ) : index == 2 ? (
          <Card StaffData={StaffData} allStaffData={allStaffData} />
        ) : (
          ""
        )}
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
