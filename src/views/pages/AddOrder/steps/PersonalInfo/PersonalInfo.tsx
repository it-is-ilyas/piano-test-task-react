import Input from "components/Input";
import React, { useContext } from "react";
import { FormContext } from "../../AddOrder";

import "./PersonalInfo.scss";

export interface PersonalInfoProps {}

const PersonalInfo: React.FC<PersonalInfoProps> = () => {
  const { values, errors, handleInputChange } = useContext(FormContext);

  const { firstName, secondName } = values;

  return (
    <div className="PersonalInfo">
      <label htmlFor="firstName">First name</label>
      <Input
        placeholder="Jhon"
        id="firstName"
        name="firstName"
        value={firstName}
        onChange={handleInputChange}
        error={errors.firstName}
      />
      <label htmlFor="secondName">Second name</label>
      <Input
        placeholder="Doe"
        id="secondName"
        name="secondName"
        value={secondName}
        onChange={handleInputChange}
        error={errors.secondName}
      />
    </div>
  );
};

export default PersonalInfo;
