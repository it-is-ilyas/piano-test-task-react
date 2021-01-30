import * as React from "react";
import cn from "classnames";
import "./Checkbox.scss";
import { checkIcon } from "assets/icons";

export type CheckboxProps = {
  name?: string;
  value?: string;
  active?: string;
  children: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  children,
  value,
  checked = false,
  disabled = false,
  onChange,
}) => {
  return (
    <label className={cn("Checkbox", { "Checkbox--disabled": disabled })}>
      <span className="Checkbox__input">
        <input
          checked={checked}
          disabled={disabled}
          value={value}
          type="checkbox"
          name={name}
          onChange={onChange}
        />
        <span className="Checkbox__control">
          <img src={checkIcon} alt="" />
        </span>
      </span>
      <span className="Checkbox__label">{children}</span>
    </label>
  );
};

export default Checkbox;
