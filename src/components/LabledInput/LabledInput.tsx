import React, { FC, CSSProperties, ChangeEvent } from "react";
import cn from "classnames";

// Styles
import "./LabledInput.scss";
import { InputProps } from "components/Input/Input";

export type LabledInputProps = {};

const LabledInput: FC<LabledInputProps> = ({}) => {
  return null;
  // <div className={cn("InputWrapper", `InputWrapper--type-${type}`)}>
  //   <input
  //     type={type}
  //     value={value}
  //     onChange={onChange}
  //     placeholder={placeholder}
  //     disabled={disabled}
  //     name={name}
  //     className={cn("Input", { "Input--error": error })}
  //     style={style}
  //   />
  //   {error && <div className="InputError">{error}</div>}
  // </div>
};

export default LabledInput;
