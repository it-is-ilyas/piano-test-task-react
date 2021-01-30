import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import "./Modal.scss";

export const WRAPPER_ID = "modal-wrapper";
// const WRAPPER_CLASS_NAME = "modal-wrapper";

type ModalWrapperProps = {
  isOpen: boolean;
  children: ReactNode;
  toggle: () => void;
  className: string;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen = false,
  children = null,
  toggle,
  className = "",
}) => {
  //   const handleWrapperClick = (e) => {
  //     if (e.target.className && e.target.className.includes(WRAPPER_CLASS_NAME))
  //       toggle();

  //     e.stopPropagation();
  //   };

  return isOpen
    ? createPortal(
        <div
          //   onClick={handleWrapperClick}
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
