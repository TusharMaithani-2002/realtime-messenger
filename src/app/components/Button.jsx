"use client";
import {} from "react";

import clsx from "clsx";

function Button({
  children,
  type,
  fullWidth,
  onClick,
  secondary,
  danger,
  disabled,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
    flex
    justify-center
    rounded-md
    px-3
    py-2
    text-sm
    font-semibold
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-purple-700 hover:bg-purple-900 focus-visible:outline-purple-900"
      )}
    >
      {children}
    </button>
  );
}

export default Button;
