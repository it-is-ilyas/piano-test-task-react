import React, { FC, CSSProperties, MouseEvent } from "react";
import cn from "classnames";

// Styles
import "./Button.scss";

export type CircleButtonProps = {
  htmlType?: "button" | "submit" | "reset";
  size?: "default" | "small" | "big";

  className?: string;

  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const CircleButton: FC<CircleButtonProps> = ({
  size = "default",
  className = "",
  htmlType = "button",
  children,
  disabled = false,

  ...props
}) => {
  return (
    <button
      className={cn(
        "Button",
        "Button--circle",
        {
          "Button--disabled": disabled,
        },
        { [className]: className }
      )}
      {...props}
      disabled={disabled}
      type={htmlType}
    >
      {children}
    </button>
  );
};

export default CircleButton;
