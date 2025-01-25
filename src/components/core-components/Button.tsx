import React, { FC } from "react";
import { DEFAULT_SIZES, COLOR_VARIANT } from "../../constants/commonContant";

import style from "./button.module.scss";

interface iButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant: COLOR_VARIANT;
  size: DEFAULT_SIZES;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: FC<iButtonProps> = ({
  className,
  variant = COLOR_VARIANT.DEFAULT,
  size = DEFAULT_SIZES.SMALL,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`${style.btn} ${style[variant]} ${style[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
