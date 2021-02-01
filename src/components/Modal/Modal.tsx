import React, { ReactNode } from "react";
import ModalWrapper from "./ModalWrapper";

export interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  children = null,
  className,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} className={className}>
      <div className="modal modal--modal">{children}</div>
    </ModalWrapper>
  );
};

export default Modal;
