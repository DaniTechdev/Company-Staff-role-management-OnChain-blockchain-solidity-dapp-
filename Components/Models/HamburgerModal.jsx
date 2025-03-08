import React from "react";

//Internal imports
import { buttons } from "../constantData";
import Style from "../../styles/manager.module.css";

const MobileModel = ({ handleIndex, setindex }) => {
  return (
    <div className={Style.container2_mob}>
      <div className={Style.mob_lists}>
        {buttons.map((button) => (
          <div key={button.index}>
            <button onClick={() => handleIndex(button.index)}>
              {button.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileModel;
