import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center justify-center gap-2 bg-ninja-orange text-ninja-black border-[3px] border-ninja-black shadow-naruto hover:bg-ninja-orange-dark hover:translate-y-0.5 hover:shadow-none focus:ring-ninja-orange/50 disabled:opacity-50",
  secondary:
    "bg-ninja-navy text-scroll border-[3px] border-ninja-orange hover:bg-ninja-blue focus:ring-ninja-orange/30 disabled:opacity-50",
  outline:
    "border-[3px] border-ninja-orange bg-transparent text-ninja-orange hover:bg-ninja-orange/10 focus:ring-ninja-orange/30 disabled:opacity-50",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className = "", variant = "primary", children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-8 py-3.5 font-display text-sm uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ninja-black disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
