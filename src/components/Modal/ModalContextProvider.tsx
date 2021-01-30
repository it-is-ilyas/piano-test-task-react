import React, { createContext, useContext, useReducer } from "react";
import { ModalTypes } from "./types";

const ModalContext = createContext({
  //   dispatch: (): void => {},
  //   modalProps: {},
  //   modalType: null,
});

export const useModalContext = () => useContext(ModalContext);

type ActionType = {
  type: string;
  modalType: ModalTypes | null;
  modalProps: Object;
};

function modalReducer(state: Object, action: ActionType) {
  switch (action.type) {
    case "hide":
      return {
        modalType: null,
        modalProps: {},
      };
    case "show":
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    default:
      return {
        ...state,
      };
  }
}

const initialState = {
  modalType: null,
  modalProps: {},
};

const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { modalType, modalProps } = state;

  return (
    <ModalContext.Provider value={{ dispatch, modalType, modalProps }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
