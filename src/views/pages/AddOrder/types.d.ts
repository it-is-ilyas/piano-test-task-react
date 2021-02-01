type ErrorsType =
  | "isTermsAccepted"
  | "phone"
  | "firstName"
  | "secondName"
  | "deliveryOption"
  | "street"
  | "city"
  | "phoneNumber"
  | "pickupPoint"
  | "confirmationCode"
  | "createdSuccess"
  | "failedError";

export type ErrorFieldType = {
  [key in ErrorsType]?: string;
};

export type FormFieldType = {
  isTermsAccepted?: boolean;
  phone?: string;
  firstName?: string;
  secondName?: string;
  deliveryOption?: DeliveryType;
  street?: string;
  city?: string;
  phoneNumber?: string;
  pickupPoint?: string;
  confirmationCode?: string;
  createdSuccess?: string;
};

export enum AddOrderSteps {
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

export type ValidateFormType = {
  success: boolean;
  errors?: ErrorFieldType;
};

export type OrderStepConfig = {
  title: string;
  Component: React.FC;
  nextStep?: ((data: FormFieldType) => AddOrderSteps) | AddOrderSteps;
  isNextStepBlocked?: (data: FormFieldType) => boolean | boolean;
  validate?: (data: FormFieldType) => ValidateFormType;
  onAsyncSubmit?: (data: FormFieldType) => Promise<FormFieldType | any>;
  isFinalStep?: boolean;
  modalTitle?: string;
  nextButtonTitle?: string;
};

export type OrderStepsConfig = {
  [key in AddOrderSteps]: OrderStepConfig;
};
