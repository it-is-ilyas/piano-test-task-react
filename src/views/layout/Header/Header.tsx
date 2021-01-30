import * as React from "react";
import logoImg from "assets/images/logo.svg";

//Styles
import "./Header.scss";
import Button from "components/Button";
import { plusIcon } from "assets/icons";
import Modal from "components/Modal";
import AddOrder from "views/pages/AddOder";
import useModal from "hooks/useModal";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const [isOpen, toggle] = useModal();

  return (
    <div className="Header">
      <div className="Header__logo-container">
        <img className="Header__logo-img" src={logoImg} alt="" /> Orders
      </div>

      <Button
        onClick={toggle}
        type="rounded"
        size="small"
        className="Header__add-order-button"
      >
        Add order
        <img src={plusIcon} alt="" />
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <AddOrder close={toggle} />
      </Modal>
    </div>
  );
};

export default Header;
