import Input from "components/Input";
import React, { useContext } from "react";
import { FormContext } from "../../AddOrder";

import "./AddressDetails.scss";

export interface AddressDetailsProps {}

const AddressDetails: React.FC<AddressDetailsProps> = () => {
  const { values, errors, handleInputChange } = useContext(FormContext);

  const { city, street } = values;

  return (
    <div className="AddressDetails">
      <label htmlFor="city">City</label>
      <Input
        onChange={handleInputChange}
        placeholder="Moscow"
        id="city"
        name="city"
        value={city}
        error={errors.city}
      />
      <label htmlFor="street">Street</label>
      <Input
        onChange={handleInputChange}
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
