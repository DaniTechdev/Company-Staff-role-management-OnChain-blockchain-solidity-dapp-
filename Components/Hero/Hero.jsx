import React, { useState, useEffect } from "react";
import Link from "next/link";
//internal import
import Style from "./Hero.module.css";

const Hero = ({
  checkIfStaffRegistered,
  checkIfRegistered,
  currentAccount,
}) => {
  const [registered, setregistered] = useState(false);

  const checkIfStaffisReg = async () => {
    const res = await checkIfRegistered(currentAccount);

    console.log("res", res);

    if (res) {
      setregistered(true);
    }
  };

  useEffect(() => {
    checkIfStaffisReg();
  }, []);

  // checkIfStaffRegistered();

  return (
    <div className={Style.hero_container}>
      <h1> GREAT COMPANY STAFF MANAGEMENT SYSTEM ONCHAIN</h1>
      <div className={Style.hero_content}>
        <div>
          <p>ARE YOU A REGISTERED STAFF OF THE GREAT COMPANY?</p>
          <p>
            <button>
              {registered ? (
                <Link href={"/staff"}> Click here to Staff DashBoard</Link>
              ) : (
                <Link href={"/"}> Click here to Staff DashBoard</Link>
              )}
            </button>
          </p>
        </div>
        <div>
          <p>Are you a staff but not yet REGISTERED?</p>
          <p>
            {" "}
            <button>
              <Link href={"/manager"}> Contact the company's management</Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
