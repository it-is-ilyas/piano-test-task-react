import * as React from "react";
import cn from "classnames";
import "./RadioButton.scss";

export type RadioButtonProps = {
  name: string;
  value?: string;
  children: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  children,
  value,
  checked = false,
  disabled = false,
  onChange,
}) => {
  return (
    <label className={cn("RadioButton", { "RadioButton--disabled": disabled })}>
      <span className="RadioButton__input">
        <input
          checked={checked}
          disabled={disabled}
          value={value}
          type="radio"
          name={name}
          onChange={onChange}
        />
        <span className="RadioButton__control" />
      </span>
      <span className="RadioButton__label">{children}</span>
    </label>
  );
};

export default RadioButton;
