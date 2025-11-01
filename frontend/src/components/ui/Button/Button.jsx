const Button = ({ children, variant = "default", onClick }) => {
  const base =
    "px-5 py-2.5 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const styles = {
    default: "bg-[var(--nmda-gray)] text-[var(--nmda-text)] border border-gray-300",
    primary: `bg-[var(--nmda-primary)] text-white hover:opacity-90 focus:ring-[var(--nmda-primary)]`,
    secondary: `bg-[var(--nmda-secondary)] text-white hover:opacity-90 focus:ring-[var(--nmda-secondary)]`,
    outline: `border border-[var(--nmda-border)] text-[var(--nmda-text)] hover:bg-[var(--nmda-card)]`,
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default Button; 

// src/components/Button.jsx
/*
const Button = ({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}) => {
  const base =
    "px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-nmda-primary text-white hover:bg-nmda-accent focus:ring-nmda-primary dark:bg-nmda-accent dark:hover:bg-nmda-primary",
    secondary:
      "bg-nmda-secondary text-white hover:bg-nmda-primary focus:ring-nmda-secondary dark:bg-nmda-darkCard dark:hover:bg-nmda-primary",
    outline:
      "border border-nmda-primary text-nmda-primary hover:bg-nmda-primary hover:text-white dark:border-nmda-accent dark:text-nmda-accent dark:hover:bg-nmda-accent dark:hover:text-white",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 
*/


/*import React from "react";
import { twMerge } from "tailwind-merge";

const variantClasses = {
  default: "bg-gray-100 text-secondary border border-gray-300",
  primary: "bg-primary text-light-text dark:text-dark-text dark:bg-dark-bg border border-primary dark:border-dark-border",
  outline: "bg-transparent text-light-text dark:text-dark-text border border-light-border dark:border-dark-border",
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
*/