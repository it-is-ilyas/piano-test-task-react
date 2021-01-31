import { useState } from "react";

const useModal = (initialState: boolean = false): [boolean, () => void] => {
  const [isOpen, setOpen] = useState<boolean>(initialState);

  function toggle(): void {
    setOpen((prevState) => !prevState);
  }

  return [isOpen, toggle];
};

export default useModal;
