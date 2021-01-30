export enum DeliveryType {
  Courier = "Courier delivery",
  Pickup = "Pickup point",
}

export type OrderType = {
  id: number;
  firstName: string;
  secondName: string;
  deliveryOption: DeliveryType;
  pickupPoint?: string;
  deliveryAddress?: {
    city: string;
    address: string;
  };
  phone: string;
};
