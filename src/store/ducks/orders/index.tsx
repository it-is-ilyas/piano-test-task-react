import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import Api from "api";
import { RootState } from "store";

import { OrderType } from "./types";

type InitialStateType = OrderType[];

// Action types
type AddNewOrderPayloadType = OrderType;

const initialState: InitialStateType = [];

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addNewOrderSuccess(
      state: InitialStateType,
      { payload }: PayloadAction<AddNewOrderPayloadType>
    ): InitialStateType {
      return [...state, payload];
    },
    addNewOrderFailure(
      state: InitialStateType,
      { payload }: PayloadAction<AddNewOrderPayloadType>
    ): InitialStateType {
      return [...state];
    },
  },
});

const { addNewOrderSuccess, addNewOrderFailure } = orderSlice.actions;

export const ordersSelector = (state: RootState) => state.orders;

export const createOrder = (data: OrderType) => async (
  dispatch: Dispatch
): Promise<any> => {
  try {
    await Api.createOrder(data);
    dispatch(addNewOrderSuccess(data));
    return Promise.resolve();
  } catch (err) {
    dispatch(addNewOrderFailure(err.message));
    return Promise.reject(err.message);
  }
};

export default orderSlice.reducer;
