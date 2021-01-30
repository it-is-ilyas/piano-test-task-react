import Input from "components/Input";
import React, { ChangeEvent, useContext } from "react";
import { FormContext } from "../../AddOder";

import "./PersonalInfo.scss";

export interface PersonalInfoProps {}

const PersonalInfo: React.FC<PersonalInfoProps> = () => {
  const { values, errors, updateField } = useContext(FormContext);

  const { firstName, secondName } = values;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value);
  };
  return (
    <div className="PersonalInfo">
      <label htmlFor="firstName">First name</label>
      <Input
        placeholder="Jhon"
        id="firstName"
        name="firstName"
        value={firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <label htmlFor="secondName">Second name</label>
      <Input
        placeholder="Doe"
        id="secondName"
        name="secondName"
        value={secondName}
        onChange={handleChange}
        error={errors.secondName}
      />
    </div>
  );
};

export default PersonalInfo;
