import React, { FC, CSSProperties, MouseEvent } from "react";
import cn from "classnames";

// Styles
import "./Button.scss";

export type ButtonProps = {
  htmlType?: "button" | "submit" | "reset";

  type?: "default" | "rounded";
  color?: "primary" | "secondary";
  size?: "default" | "small" | "big";

  className?: string;

  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  type = "default",
  color = "primary",
  size = "default",
  className = "",
  htmlType = "button",
  children,
  disabled = false,
  style = {},

  ...props
}) => {
  return (
    <button
      className={cn(
        "Button",
        `Button--color-${color}`,
        `Button--type-${type}`,
        `Button--size-${size}`,
        { [className]: className },
        {
          "Button--disabled": disabled,
        }
      )}
      {...props}
      disabled={disabled}
      type={htmlType}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
