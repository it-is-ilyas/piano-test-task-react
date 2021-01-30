import { useState } from "react";

const useModal = (initialState = false): [boolean, () => void] => {
  const [isOpen, setOpen] = useState(initialState);

  function toggle() {
    setOpen((prevState) => !prevState);
  }

  return [isOpen, toggle];
};

export default useModal;
