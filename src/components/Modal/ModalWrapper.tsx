import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import "./Modal.scss";

export const WRAPPER_ID: string = "modal-wrapper";

type ModalWrapperProps = {
  isOpen: boolean;
  children: ReactNode;
  className: string;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen = false,
  children = null,

  className = "",
}) => {
  return isOpen
    ? createPortal(
        <div
          // Fix scrolling elements beneath modal wrapper
          onWheel={(e) => e.stopPropagation()}
          id={WRAPPER_ID}
          className={classNames("modal-wrapper", className)}
        >
          {children}
        </div>,
        document.body
      )
    : null;
};

export default ModalWrapper;
