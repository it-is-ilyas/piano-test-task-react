import React, { useContext } from "react";
import RadioButton from "components/RadioButton";

import "./DeliveryOptions.scss";
import { DeliveryType } from "store/ducks/orders/types.d";
import { FormContext } from "../../AddOrder";

export interface DeliveryOptionsProps {}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = () => {
  const { values, handleInputChange } = useContext(FormContext);

  const { deliveryOption } = values;

  return (
    <div className="DeliveryOptions">
      <label htmlFor="deliveryOption">Delivery Options</label>
      <RadioButton
        name="deliveryOption"
        onChange={handleInputChange}
        value={DeliveryType.Courier}
        checked={deliveryOption === DeliveryType.Courier}
      >
        Courier delivery
      </RadioButton>
      <RadioButton
        onChange={handleInputChange}
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
