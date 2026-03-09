"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-heading font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sendara-bright focus:ring-offset-2";

    const variants = {
      primary: "bg-sendara-teal text-white hover:bg-sendara-bright",
      secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20",
      outline: "bg-transparent text-sendara-teal border-2 border-sendara-teal hover:bg-sendara-teal hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
