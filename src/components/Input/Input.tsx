import React, { FC, CSSProperties, ChangeEvent } from "react";
import cn from "classnames";

// Styles
import "./Input.scss";

export type InputProps = {
  name: string;
  value: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: "text" | "number";
  style?: CSSProperties;
  error?: string;
  id?: string;
};

const Input: FC<InputProps> = ({
  name,
  value = "",
  placeholder,
  onChange,
  disabled = false,
  type = "text",
  style,
  error,
  id,
}) => {
  return (
    <div className={cn("InputWrapper", `InputWrapper--type-${type}`)}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        className={cn("Input", { "Input--error": error })}
        style={style}
      />
      {error && <div className="InputError">{error}</div>}
    </div>
  );
};

export default Input;
