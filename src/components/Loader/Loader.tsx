import React from "react";
import cn from "classnames";
import { loaderIcon } from "assets/icons";

import "./Loader.scss";

export interface LoaderProps {
  className?: string;
  isActive: boolean;
}

const Loader: React.FC<LoaderProps> = ({ className, isActive }) => {
  return (
    <div
      className={cn(
        "Loader",
        { [className]: className },
        { "Loader--active": isActive }
      )}
    >
      <img src={loaderIcon} alt="" className="rotate-loader" />
    </div>
  );
};

export default Loader;
