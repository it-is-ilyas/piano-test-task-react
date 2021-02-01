import * as React from "react";

// Components
import AddOrder from "views/pages/AddOrder";
import Button from "components/Button";
import Modal from "components/Modal";

// Hooks
import useModal from "hooks/useModal";

// Assets
import logoImg from "assets/images/logo.svg";
import { plusIcon } from "assets/icons";

//Styles
import "./Header.scss";

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
      <Modal isOpen={isOpen}>
        <AddOrder close={toggle} />
      </Modal>
    </div>
  );
};

export default Header;
