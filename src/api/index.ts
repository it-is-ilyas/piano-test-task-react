const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const randomDelay = () => delay(Math.round(Math.random() * 1000 * 5));

const probability = (n: number) => Math.random() <= n;

export default class Api {
  static async getPickupPoints(): Promise<string[]> {
    await randomDelay();

    if (probability(0.01)) {
      throw new Error("Something went wrong");
    }

    return [
      "Centre point",
      "East point",
      "West point",
      "North point",
      "South point",
    ];
  }

  static async sendPhoneConfirmation(phoneNumber: string): Promise<boolean> {
    await randomDelay();

    if (phoneNumber.includes("88") || phoneNumber.length > 14) {
      throw new Error("Incorrect phone number");
    }

    return true;
  }

  static async confirmPhone(
    phoneNumber: string,
    code: string
  ): Promise<boolean> {
    await randomDelay();

    if (code.includes("0")) {
      throw new Error("Confirmation code is incorrect");
    }

    return true;
  }

  static async createOrder<T>(data: T): Promise<T> {
    await randomDelay();

    if (probability(1)) {
      throw new Error("Your order was not created because something broke.");
    }

    return data;
  }
}
