import React from "react";
import Link from "next/link";
//internal import
import Style from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={Style.hero_container}>
      <h1> GREAT COMPANY STAFF MANAGEMENT SYSTEM ONCHAIN</h1>
      <div className={Style.hero_content}>
        <div>
          <p>ARE YOU A REGISTERED STAFF OF THE GREAT COMPANY?</p>
          <p>
            <button>
              <Link href={"/staff"}> Click here to Staff DashBoard</Link>
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
