import Api from "api";
import Loader from "components/Loader";
import RadioButton from "components/RadioButton";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormContext } from "../../AddOder";

import "./PickupPoints.scss";

export interface PickupPointsProps {}

const PickupPoints: React.FC<PickupPointsProps> = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setLoadingState] = useState(true);

  const getPoints = async () => {
    try {
      const res = await Api.getPickupPoints();
      setOptions(res);
      setLoadingState(false);
    } catch (error) {
      setOptions([]);
      setLoadingState(false);
    }
  };

  useEffect(() => {
    getPoints();
  }, []);

  const { values, updateField } = useContext(FormContext);

  const { pickupPoint } = values;

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateField("pickupPoint", value);
  };

  return (
    <div className="PickupPoints">
      <Loader isActive={isLoading} />
      <label htmlFor="options">Avalible pickup points</label>
      {options.map((option) => {
        return (
          <RadioButton
            key={option}
            name="pickupPoint"
            value={option}
            checked={option === pickupPoint}
            onChange={handleOptionChange}
          >
            {option}
          </RadioButton>
        );
      })}
    </div>
  );
};

export default PickupPoints;
