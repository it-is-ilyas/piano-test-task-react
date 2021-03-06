import React, { useContext } from "react";
import Checkbox from "components/Checkbox";

import "./TermsOfDelivery.scss";
import { FormContext } from "../../AddOrder";

export interface TermsOfDeliveryProps {}

const text = `Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum.

Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum.

Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum.`;

const TermsOfDelivery: React.FC<TermsOfDeliveryProps> = () => {
  const { values, updateField } = useContext(FormContext);

  const { isTermsAccepted } = values;

  const toggleTerms = () => {
    updateField("isTermsAccepted", !isTermsAccepted);
  };

  return (
    <div className="Terms">
      <p className="Terms__text"> {text}</p>
      <div className="Terms__checkbox">
        <Checkbox checked={isTermsAccepted} onChange={toggleTerms}>
          I accept the terms of delivery
        </Checkbox>
      </div>
    </div>
  );
};

export default TermsOfDelivery;
