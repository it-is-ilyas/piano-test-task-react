import React, { useContext } from "react";
import { FormContext } from "../../AddOrder";
import "./ConfirmOrder.scss";

export interface ConfirmOrderProps {}

const ConfirmOrder: React.FC<ConfirmOrderProps> = () => {
  const { values } = useContext(FormContext);

  const {
    firstName,
    secondName,
    deliveryOption,
    pickupPoint,
    city,
    street,
    phoneNumber,
  } = values;

  return (
    <div className="ConfirmOrder">
      <div className="ConfirmOrder__value-row">
        <div className="ConfirmOrder__key-field">Personal info</div>
        <div className="ConfirmOrder__value-field">{`${firstName} ${secondName}`}</div>
      </div>
      <div className="ConfirmOrder__value-row">
        <div className="ConfirmOrder__key-field">Delivety option</div>
        <div className="ConfirmOrder__value-field">{deliveryOption}</div>
      </div>
      {pickupPoint && (
        <div className="ConfirmOrder__value-row">
          <div className="ConfirmOrder__key-field">Pickup point</div>
          <div className="ConfirmOrder__value-field">{pickupPoint}</div>
        </div>
      )}
      {city && street && (
        <div className="ConfirmOrder__value-row">
          <div className="ConfirmOrder__key-field">Address</div>
          <div className="ConfirmOrder__value-field">{`${city}, ${street}`}</div>
        </div>
      )}
      {phoneNumber && (
        <div className="ConfirmOrder__value-row">
          <div className="ConfirmOrder__key-field">Phone number</div>
          <div className="ConfirmOrder__value-field">{phoneNumber}</div>
        </div>
      )}
    </div>
  );
};

export default ConfirmOrder;
