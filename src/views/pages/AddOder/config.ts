// Steps
import DeliveryOptions from "./steps/DeliveryOptions";
import PersonalInfo from "./steps/PersonalInfo";
import PickupPoints from "./steps/PickupPoints";
import TermsOfDelivery from "./steps/TermsOfDelivery";
import AddressDetails from "./steps/AddressDetails";
import PhoneNumber from "./steps/PhoneNumber";
import PhoneConfirmation from "./steps/PhoneConfirmation";
import FailedCreated from "./steps/FailedCreated";
import SuccessCreated from "./steps/SuccessCreated";
import ConfirmOrder from "./steps/ConfirmOrder";

// Types
import { AddOrderSteps, OrderStepsConfig, ValidateFormType } from "./types.d";
import { DeliveryType } from "store/ducks/orders/types.d";

// Api
import Api from "api";

export const ADD_ORDER_STEPS_CONFIG: OrderStepsConfig = {
  [AddOrderSteps.Terms]: {
    title: "Terms of delivery",
    Component: TermsOfDelivery,
    nextStep: AddOrderSteps.PersonalInfo,
    isNextStepBlocked: (data) => {
      return !data.isTermsAccepted;
    },
    validate: (data): ValidateFormType => {
      if (data.isTermsAccepted) {
        return { success: true };
      }
      return { success: false, errors: { isTermsAccepted: "required" } };
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
