import Input from "components/Input";
import React, { ChangeEvent, useContext } from "react";
import { FormContext } from "../../AddOder";
import { FormFieldType } from "../../types";

import "./PhoneNumber.scss";

export interface PhoneNumberProps {}

const PhoneNumber: React.FC<PhoneNumberProps> = () => {
  const { values, errors, updateField } = useContext(FormContext);

  const { phoneNumber } = values;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof FormFieldType, value);
  };

  return (
    <div className="PhoneNumber">
      <label htmlFor="phoneNumber">Phone</label>
      <Input
        onChange={handleChange}
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
