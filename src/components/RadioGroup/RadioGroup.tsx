import React, { ReactNode, ReactNodeArray } from "react";

type RadioGroupProps = {
  items?: Array<{ value: string; label: string | ReactNode }>;
  className?: string;
  children?: ReactNodeArray;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  items = [],
  children = [],
}) => {
  return <div className="RadioGroup"></div>;
};

export default RadioGroup;
