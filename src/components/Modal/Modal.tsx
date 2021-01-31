import React, { ReactNode } from "react";
import ModalWrapper from "./ModalWrapper";

export interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  toggle?: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  // position = [-1, -1],
  isOpen = false,

  children = null,

  toggle,

  className,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} className={className}>
      <div className="modal modal--modal">{children}</div>
    </ModalWrapper>
  );
};

export default Modal;
