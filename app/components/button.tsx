import React from "react";

export type ButtonVariant = "neutral" | "primary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text: string;
}

// 기본 스타일 + 상태별(hover/active/disabled) Tailwind 클래스
const baseClasses = "font-semibold transition-all";

// variant별 색상 매핑
const variantClasses: Record<ButtonVariant, string> = {
  neutral: `
    bg-btn-neutral-bg text-btn-neutral-fg border border-btn-neutral-border
    hover:bg-btn-neutral-hover-bg hover:text-btn-neutral-hover-fg
    active:bg-btn-neutral-active-bg active:text-btn-neutral-active-fg
    disabled:bg-btn-neutral-disabled-bg disabled:text-btn-neutral-disabled-fg disabled:border-btn-neutral-disabled-border
  `,
  primary: `
    bg-btn-primary-bg text-btn-primary-fg border border-btn-primary-border
    hover:bg-btn-primary-hover-bg hover:text-btn-primary-hover-fg
    active:bg-btn-primary-active-bg active:text-btn-primary-active-fg
    disabled:bg-btn-primary-disabled-bg disabled:text-btn-primary-disabled-fg disabled:border-btn-primary-disabled-border
  `,
  outline: `
    bg-btn-outline-bg text-btn-outline-fg border border-btn-outline-border
    hover:bg-btn-outline-hover-bg hover:text-btn-outline-hover-fg hover:border-btn-outline-hover-border
    active:bg-btn-outline-active-bg active:text-btn-outline-active-fg active:border-btn-outline-active-border
    disabled:bg-btn-outline-disabled-bg disabled:text-btn-outline-disabled-fg disabled:border-btn-outline-disabled-border
  `,
};

// size별 padding + text-size 설정 (px/py + 폰트 크기)
const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-[16px] rounded-[4px]",
  md: "px-5 py-3 text-[18px] rounded-[6px]",
  lg: "px-5 py-4 text-[20px] rounded-[8px]",
};

export function Button({ variant = "neutral", size = "md", disabled = false, className = "", text, ...rest }: ButtonProps) {
  return (
    <button type="button" disabled={disabled} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "cursor-not-allowed" : ""} ${className}`.trim().replace(/\s+/g, " ")} {...rest}>
      {text}
    </button>
  );
}

export default Button;
