import Input from "components/Input";
import React, { ChangeEvent, useContext } from "react";
import { FormContext } from "../../AddOder";
import { FormFieldType } from "../../types";

import "./AddressDetails.scss";

export interface AddressDetailsProps {}

const AddressDetails: React.FC<AddressDetailsProps> = () => {
  const { values, errors, updateField } = useContext(FormContext);

  const { city, street } = values;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    updateField(name as keyof FormFieldType, value);
  };

  return (
    <div className="AddressDetails">
      <label htmlFor="city">City</label>
      <Input
        onChange={handleChange}
        placeholder="Moscow"
        id="city"
        name="city"
        value={city}
        error={errors.city}
      />
      <label htmlFor="street">Street</label>
      <Input
        onChange={handleChange}
        placeholder="Lenina street"
        id="street"
        name="street"
        value={street}
        error={errors.street}
      />
    </div>
  );
};

export default AddressDetails;
