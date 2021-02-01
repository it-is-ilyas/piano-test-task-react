import React, { useContext } from "react";
import Input from "components/Input";
import { FormContext } from "../../AddOrder";

import { infoIcon } from "assets/icons";

import "./PhoneConfirmation.scss";

export interface PhoneConfirmationProps {}

const PhoneConfirmation: React.FC<PhoneConfirmationProps> = () => {
  const { values, errors, handleInputChange } = useContext(FormContext);

  const { phoneNumber, confirmationCode } = values;

  return (
    <div className="PhoneConfirmation">
      <div className="PhoneConfirmation__input-row">
        <label htmlFor="confirmationCode">Confirmation code:</label>
        <div className="PhoneConfirmation__input-column">
          <Input
            onChange={handleInputChange}
            placeholder=""
            id="confirmationCode"
            name="confirmationCode"
            value={confirmationCode}
            error={errors.confirmationCode}
          />
          <div className="PhoneConfirmation__info-block">
            <img src={infoIcon} alt="" />
            We sent you confiramtion code on {phoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneConfirmation;
