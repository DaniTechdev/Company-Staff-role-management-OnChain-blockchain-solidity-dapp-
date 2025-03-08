import React from "react";
import Image from "next/image";

//Internal import
import Style from "./Style.module.css";

const Card = ({ StaffData }) => {
  console.log("StaffData", StaffData);

  return (
    <div className={Style.container}>
      {StaffData.map((Staff, index) => {
        return (
          <div className={Style.containerCard}>
            <div className={Style.imgCard}>
              <Image
                src={"/download.jpg"}
                alt="profile image"
                width={50}
                height={50}
                className={Style.imgCard1}
              />
            </div>
            <h1>Staff (1)</h1>
            <div className={Style.CardComponent}>
              <div>
                <p>Staff name: </p> <p>{Staff.name}</p>
              </div>
              <div>
                <p> Staff address:</p> <p>{Staff.address.slice(0, 10)}...</p>
              </div>
              <div>
                <p>Gender:</p> <p>{Staff.gender}</p>
              </div>
              <div>
                <p> Staff Role count:</p> <p>{Staff.roleCount}</p>
              </div>
              <div>
                <p>Registered Date:</p> <p>{Staff.registeredAt}</p>
              </div>
              <div>
                <p>Total Token Earned:</p> <p>{Staff.totalTokenEarned}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
