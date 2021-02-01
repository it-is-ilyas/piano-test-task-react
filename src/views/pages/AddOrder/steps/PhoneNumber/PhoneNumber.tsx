import Input from "components/Input";
import React, { useContext } from "react";
import { FormContext } from "../../AddOrder";

import "./PhoneNumber.scss";

export interface PhoneNumberProps {}

const PhoneNumber: React.FC<PhoneNumberProps> = () => {
  const { values, errors, handleInputChange } = useContext(FormContext);

  const { phoneNumber } = values;

  return (
    <div className="PhoneNumber">
      <label htmlFor="phoneNumber">Phone</label>
      <Input
        onChange={handleInputChange}
        placeholder=""
        id="phoneNumber"
        name="phoneNumber"
        value={phoneNumber}
        error={errors.phoneNumber}
      />
    </div>
  );
};

export default PhoneNumber;
