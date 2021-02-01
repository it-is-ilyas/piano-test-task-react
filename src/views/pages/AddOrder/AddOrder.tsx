import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";

// Components
import Button, { CircleButton } from "components/Button";

// Action
import { createOrder } from "store/ducks/orders";

// Utils
import { generateId } from "utils";

// Types
import { AddOrderSteps, ErrorFieldType, FormFieldType } from "./types.d";
import { OrderType } from "store/ducks/orders/types.d";

// Config
import { ADD_ORDER_STEPS_CONFIG } from "./config";

//Assets
import { closeIcon, arrowLeftIcon } from "assets/icons";

//Styles
import "./AddOrder.scss";

export interface AddOrderProps {
  close: () => void;
}

export const FormContext = React.createContext<{
  values: FormFieldType;
  errors: ErrorFieldType;
  updateField: (name: keyof FormFieldType, value: string | boolean) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}>({
  values: {},
  errors: {},
  updateField: () => {},
  handleInputChange: () => {},
});

const AddOrder: React.FC<AddOrderProps> = ({ close }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorFieldType>({});
  const [prevSteps, setPrevSteps] = useState<AddOrderSteps[]>([]);
  const [currentStep, setCurrentStep] = useState<AddOrderSteps>(
    AddOrderSteps.Terms
  );
  const [data, setData] = useState<FormFieldType>({});
  const {
    title,
    Component,
    nextStep,
    modalTitle,
    validate,
    onAsyncSubmit,
    isNextStepBlocked,
    isFinalStep,
    nextButtonTitle,
  } = ADD_ORDER_STEPS_CONFIG[currentStep];

  useEffect(() => {
    setSubmitting(false);
  }, [currentStep]);

  const handleNextStep = async () => {
    setSubmitting(true);
    if (typeof validate === "function") {
      const { success, errors } = validate(data);

      if (!success) {
        setErrors({ ...errors });

        setSubmitting(false);
        return;
      }
    }

    if (isFinalStep) {
      const orderInfo: OrderType = {
        id: generateId(),
        firstName: data.firstName,
        secondName: data.secondName,
        deliveryOption: data.deliveryOption,
        pickupPoint: data.pickupPoint,
        deliveryAddress: {
          city: data.city,
          address: data.street,
        },
        phone: data.phoneNumber,
      };

      try {
        await dispatch(createOrder(orderInfo));
        setCurrentStep(AddOrderSteps.Created);
        return;
      } catch (error) {
        setErrors((errors) => ({ ...errors, failedError: error }));
        setCurrentStep(AddOrderSteps.Failed);
        return;
      }
    }

    if (typeof onAsyncSubmit === "function") {
      try {
        await onAsyncSubmit(data);
      } catch (errors) {
        setErrors({ ...errors });
        setSubmitting(false);
        return;
      }
    }

    setPrevSteps([...prevSteps, currentStep]);
    setErrors({});
    if (typeof nextStep === "function") {
      setCurrentStep(nextStep(data));
      return;
    }

    setCurrentStep(nextStep);
  };

  const handlePrevStep = () => {
    setCurrentStep(prevSteps[prevSteps.length - 1]);
    setPrevSteps(prevSteps.slice(0, prevSteps.length - 1));
  };

  const updateField = useCallback(
    (name: keyof FormFieldType, value: string | boolean): void => {
      setErrors((errors) => ({ ...errors, [name]: null }));
      setData((data) => ({
        ...data,
        [name]: value,
      }));
    },
    []
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      updateField(name as keyof FormFieldType, value);
    },
    [updateField]
  );

  const isNextStepDisabled: boolean =
    isSubmitting ||
    (typeof isNextStepBlocked === "function" && isNextStepBlocked(data));

  return (
    <div className="AddOrder">
      <div className="AddOrder__header">
        <div
          onClick={handlePrevStep}
          className={cn("AddOrder__header-back-button", {
            "AddOrder__header-back-button--hidden": !prevSteps.length,
          })}
        >
          <img src={arrowLeftIcon} alt="" />
        </div>
        <div className="AddOrder__headline">
          <span>{modalTitle || "Add Order"}</span>
          {title && (
            <span className="AddOrder__headline-subtitle">{title}</span>
          )}
        </div>
        <CircleButton onClick={close} className="AddOrder__close-button">
          <img src={closeIcon} alt="" />
        </CircleButton>
      </div>
      <div className="AddOrder__body">
        <FormContext.Provider
          value={{ updateField, handleInputChange, values: data, errors }}
        >
          <Component />
        </FormContext.Provider>
      </div>
      {nextStep && (
        <div className="AddOrder__footer">
          <Button
            disabled={!prevSteps.length}
            onClick={handlePrevStep}
            color="secondary"
          >
            Back
          </Button>
          <Button disabled={isNextStepDisabled} onClick={handleNextStep}>
            {nextButtonTitle || "Next step"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddOrder;
