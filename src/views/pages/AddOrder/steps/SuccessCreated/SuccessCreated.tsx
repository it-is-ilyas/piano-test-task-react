import { checkSuccessIcon } from "assets/icons";
import React from "react";

import "./SuccessCreated.scss";

export interface SuccessCreatedProps {}

const SuccessCreated: React.FC<SuccessCreatedProps> = () => {
  return (
    <div className="SuccessCreated">
      <div className="SuccessCreated__success-logo">
        <img src={checkSuccessIcon} alt="" />
      </div>
      Your order has been created successfully!
    </div>
  );
};

export default SuccessCreated;
