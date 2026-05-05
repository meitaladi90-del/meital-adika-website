"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95";

    const variants = {
      primary:
        "bg-brown text-cream hover:bg-brown-light focus:ring-brown shadow-sm hover:shadow-md hover:-translate-y-0.5",
      secondary:
        "border-2 border-gold text-brown hover:bg-gold hover:text-cream focus:ring-gold hover:shadow-md hover:-translate-y-0.5",
      gold: "bg-gold text-cream hover:bg-gold-dark focus:ring-gold shadow-sm hover:shadow-md hover:-translate-y-0.5",
      ghost:
        "text-brown hover:bg-brown/10 focus:ring-brown hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "px-5 py-2 text-sm gap-1.5",
      md: "px-7 py-3 text-base gap-2",
      lg: "px-9 py-4 text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
