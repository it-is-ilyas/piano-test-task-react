import React, { ChangeEvent, useContext } from "react";
import RadioButton from "components/RadioButton";

import "./DeliveryOptions.scss";
import { DeliveryType } from "store/ducks/orders/types.d";
import { FormContext } from "../../AddOder";
import { FormFieldType } from "../../types";

export interface DeliveryOptionsProps {}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = () => {
  const { values, updateField } = useContext(FormContext);

  const { deliveryOption } = values;

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof FormFieldType, value);
  };

  return (
    <div className="DeliveryOptions">
      <label htmlFor="deliveryOption">Delivery Options</label>
      <RadioButton
        name="deliveryOption"
        onChange={handleOptionChange}
        value={DeliveryType.Courier}
        checked={deliveryOption === DeliveryType.Courier}
      >
        Courier delivery
      </RadioButton>
      <RadioButton
        onChange={handleOptionChange}
        name="deliveryOption"
        value={DeliveryType.Pickup}
        checked={deliveryOption === DeliveryType.Pickup}
      >
        Pickup point
      </RadioButton>
    </div>
  );
};

export default DeliveryOptions;
