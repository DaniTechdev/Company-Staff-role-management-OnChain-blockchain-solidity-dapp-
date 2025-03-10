import React, { useState } from "react";

//Internal import
import Style from "./Form.module.css";

const Forms = ({ registerStaff }) => {
  const [user, setuser] = useState({
    name: "",
    address: "",
    gender: "",
  });

  // console.log("user", user);

  const registerUser = async () => {
    try {
      registerStaff(user);
      // console.log("user", user);
    } catch (error) {
      console.log("Problem in registering user");
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.form_container}>
        <div className={Style.form_class}>
          <h1>REGISTERATION FORM</h1>

          <div className={Style.input_1}>
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              placeholder="What is the staff name"
              id="name"
              onChange={(e) =>
                setuser({
                  ...user,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className={Style.input_1}>
            <label htmlFor="address">Wallet Address :</label>
            <input
              type="Text"
              placeholder="Type in the staff wallet Address"
              id="address"
              name="address"
              onChange={(e) =>
                setuser({
                  ...user,
                  address: e.target.value,
                })
              }
            />
          </div>

          <div className={Style.input_1}>
            <label htmlFor="gender">Gender :</label>
            <select
              name="gender"
              id="gender"
              className={Style.select1}
              onChange={(e) =>
                setuser({
                  ...user,
                  gender: e.target.value,
                })
              }
            >
              <option value="">Select genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button onClick={registerUser}>Register Staff</button>
        </div>
      </div>
    </div>
  );
};

export default Forms;
