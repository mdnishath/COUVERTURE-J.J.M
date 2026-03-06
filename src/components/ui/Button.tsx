import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  icon,
  style,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-secondary text-white hover:bg-secondary-light shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    white:
      "bg-white text-secondary hover:bg-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    ghost:
      "bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-primary",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles} style={style}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      style={style}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
