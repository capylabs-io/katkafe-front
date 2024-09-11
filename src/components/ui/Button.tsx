// Button.tsx
import React, { ReactNode } from "react";
import classNames from "classnames";

type Props = {
  children: ReactNode;
  onClick?: Function;
  disabled?: boolean;
  customClassNames?: string;
};

const Button = ({
  children,
  onClick,
  customClassNames,
  disabled = false,
}: Props) => {
  const handleOnClick = () => {
    onClick?.();
  };

  return (
    <button
      // style={{
      //   boxShadow: "0px -4px 0px 0px #cccbbd inset",
      //   cursor: disabled ? "not-allowed" : "pointer",
      //   opacity: disabled ? "0.5" : "1",
      // }}
      className={classNames(
        "border-orange-90 border-2 w-full h-full rounded-lg text-orange-90 flex items-center justify-center shadow-bottom-2xl",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer opacity-100",
        customClassNames
      )}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
