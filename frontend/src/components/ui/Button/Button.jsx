import React from "react";
import { twMerge } from "tailwind-merge";

const variantClasses = {
  default: "bg-gray-100 text-secondary border border-gray-300",
  primary: "bg-primary text-white border border-primary",
  outline: "bg-transparent text-primary border border-primary",
};

export default function Button({ children, variant = "default", icon: Icon, disabled, className, ...props }) {
  return (
    <button
      className={twMerge(
        `inline-flex items-center justify-center 
         px-4 py-2 text-[0.95rem] font-medium rounded-lg 
         border-2 cursor-pointer transition-all duration-200 ease-in-out         
         font-sans
         hover:opacity-90 hover:scale-105
         disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none`,
        variantClasses[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="mr-2 text-base" />}
      {children}
    </button>
  );
}
