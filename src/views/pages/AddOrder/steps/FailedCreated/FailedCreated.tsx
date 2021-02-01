import React, { useContext } from "react";
import { closeIcon } from "assets/icons";
import { FormContext } from "../../AddOrder";

import "./FailedCreated.scss";

export interface FailedCreatedProps {}

const FailedCreated: React.FC<FailedCreatedProps> = () => {
  const { errors } = useContext(FormContext);

  return (
    <div className="FailedCreated">
      <div className="FailedCreated__failed-logo">
        <img src={closeIcon} alt="" />
      </div>
      {errors.failedError}
    </div>
  );
};

export default FailedCreated;
