import React, { useCallback, useEffect, useState } from "react";
import DeliveryOptions from "./steps/DeliveryOptions";
import PersonalInfo from "./steps/PersonalInfo";
import PickupPoints from "./steps/PickupPoints";
import TermsOfDelivery from "./steps/TermsOfDelivery";
import AddressDetails from "./steps/AddressDetails";
import PhoneNumber from "./steps/PhoneNumber";
import PhoneConfirmation from "./steps/PhoneConfirmation";
import Button, { CircleButton } from "components/Button";
import ConfirmOrder from "./steps/ConfirmOrder";
import { DeliveryType, OrderType } from "store/ducks/orders/types.d";

//Assets
import { closeIcon } from "assets/icons";

//Styles
import "./AddOrder.scss";
import Api from "api";
import { useDispatch } from "react-redux";
import { createOrder } from "store/ducks/orders";
import FailedCreated from "./steps/FailedCreated";
import SuccessCreated from "./steps/SuccessCreated";

enum AddOrderSteps {
  Terms,
  PersonalInfo,
  DeliveryOption,
  PickupPointSelect,
  Confirm,
  Created,
  Failed,
  AddressDetails,
  ValidatePhone,
  ConfirmPhone,
}

type FieldType =
  | "accepted"
  | "phone"
  | "firstName"
  | "secondName"
  | "deliveryOption"
  | "street"
  | "city"
  | "phoneNumber";

export type FormErrorsType = {
  [key in FieldType]?: string;
};

type ValidateFormType = {
  success: boolean;
  errors?: FormErrorsType;
};

const ADD_ORDER_STEPS_CONFIG: any = {
  [AddOrderSteps.Terms]: {
    title: "Terms of delivery",
    Component: TermsOfDelivery,
    nextStep: AddOrderSteps.PersonalInfo,
    isNextStepBlocked: (data) => {
      return !data.accepted;
    },
    validate: (data): ValidateFormType => {
      if (data.accepted) {
        return { success: true };
      }
      return { success: false, errors: { accepted: "required" } };
    },
  },
  [AddOrderSteps.PersonalInfo]: {
    title: "Personal information",
    Component: PersonalInfo,
    nextStep: AddOrderSteps.DeliveryOption,
    validate: (data): ValidateFormType => {
      if (!data.firstName) {
        return {
          success: false,
          errors: {
            firstName: "required",
          },
        };
      }
      if (!data.secondName) {
        return {
          success: false,
          errors: {
            secondName: "required",
          },
        };
      }
      return { success: true };
    },
  },
  [AddOrderSteps.DeliveryOption]: {
    title: "Delivery options",
    Component: DeliveryOptions,
    nextStep: (data) => {
      return data.deliveryOption === DeliveryType.Courier
        ? AddOrderSteps.AddressDetails
        : AddOrderSteps.PickupPointSelect;
    },
    isNextStepBlocked: (data) => {
      return !data.deliveryOption;
    },
    validate: (data): ValidateFormType => {
      if (!data.deliveryOption) {
        return {
          success: false,
          errors: {
            deliveryOption: "required",
          },
        };
      }

      return { success: true };
    },
  },
  [AddOrderSteps.PickupPointSelect]: {
    title: "Pickup points",
    Component: PickupPoints,
    nextStep: AddOrderSteps.Confirm,
    isNextStepBlocked: (data) => {
      return !data.pickupPoint;
    },
  },
  [AddOrderSteps.AddressDetails]: {
    title: "Adress details",
    Component: AddressDetails,
    nextStep: AddOrderSteps.ValidatePhone,
    validate: (data): ValidateFormType => {
      if (!data.city) {
        return {
          success: false,
          errors: {
            city: "required",
          },
        };
      }
      if (!data.street) {
        return {
          success: false,
          errors: {
            street: "required",
          },
        };
      }
      return { success: true };
    },
  },
  [AddOrderSteps.ValidatePhone]: {
    title: "Phone number",
    Component: PhoneNumber,
    nextStep: AddOrderSteps.ConfirmPhone,
    onAsyncSubmit: async (data) => {
      try {
        await Api.sendPhoneConfirmation(data.phoneNumber);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject({ phoneNumber: error.message });
      }
    },
    validate: (data): ValidateFormType => {
      if (
        !/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g.test(data.phoneNumber)
      ) {
        return {
          success: false,
          errors: {
            phoneNumber: "Invalid number",
          },
        };
      }
      return {
        success: true,
      };
    },
  },
  [AddOrderSteps.ConfirmPhone]: {
    title: "Phone confiramtion",
    Component: PhoneConfirmation,
    nextStep: AddOrderSteps.Confirm,
    onAsyncSubmit: async (data) => {
      try {
        await Api.confirmPhone(data.phoneNumber, data.confirmationCode);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject({ confirmationCode: error.message });
      }
    },
  },
  [AddOrderSteps.Confirm]: {
    title: "Confirm order",
    Component: ConfirmOrder,
    nextStep: (data) => {
      return data.createdSuccess ? AddOrderSteps.Created : AddOrderSteps.Failed;
    },
    nextButtonTitle: "Submit",
    isFinalStep: true,
  },
  [AddOrderSteps.Created]: {
    title: "",
    modalTitle: "Order created",
    Component: SuccessCreated,
  },
  [AddOrderSteps.Failed]: {
    title: "",
    modalTitle: "Failed to create order",
    Component: FailedCreated,
  },
};

export interface AddOrderProps {
  close: () => void;
}

export const FormContext = React.createContext<{
  values: any;
  errors: any;
  updateField: (name: string, value: string | boolean) => void;
}>({ values: {}, errors: {}, updateField: () => {} });

const AddOrder: React.FC<AddOrderProps> = ({ close }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrorsType>({});
  const [prevSteps, setPrevSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(AddOrderSteps.Terms);
  const [data, setData] = useState<any>({});
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
        id: 123,
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

  const updateField = useCallback((name: string, value: string | boolean) => {
    setErrors((errors) => ({ ...errors, [name]: null }));
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  }, []);

  const isNextStepDisabled =
    isSubmitting ||
    (typeof isNextStepBlocked === "function" && isNextStepBlocked(data));

  return (
    <div className="AddOrder">
      <div className="AddOrder__header">
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
        <FormContext.Provider value={{ updateField, values: data, errors }}>
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
