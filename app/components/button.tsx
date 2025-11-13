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
    bg-[var(--btn-neutral-bg)] text-[var(--btn-neutral-fg)] border border-[var(--btn-neutral-border)]
    hover:bg-[var(--btn-neutral-hover-bg)] hover:text-[var(--btn-neutral-hover-fg)]
    active:bg-[var(--btn-neutral-active-bg)] active:text-[var(--btn-neutral-active-fg)]
    disabled:bg-[var(--btn-neutral-disabled-bg)] disabled:text-[var(--btn-neutral-disabled-fg)] disabled:border-[var(--btn-neutral-disabled-border)]
  `,
  primary: `
    bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] border border-[var(--btn-primary-border)]
    hover:bg-[var(--btn-primary-hover-bg)] hover:text-[var(--btn-primary-hover-fg)]
    active:bg-[var(--btn-primary-active-bg)] active:text-[var(--btn-primary-active-fg)]
    disabled:bg-[var(--btn-primary-disabled-bg)] disabled:text-[var(--btn-primary-disabled-fg)] disabled:border-[var(--btn-primary-disabled-border)]
  `,
  outline: `
    bg-[var(--btn-outline-bg)] text-[var(--btn-outline-fg)] border border-[var(--btn-outline-border)]
    hover:bg-[var(--btn-outline-hover-bg)] hover:text-[var(--btn-outline-hover-fg)] hover:border-[var(--btn-outline-hover-border)]
    active:bg-[var(--btn-outline-active-bg)] active:text-[var(--btn-outline-active-fg)] active:border-[var(--btn-outline-active-border)]
    disabled:bg-[var(--btn-outline-disabled-bg)] disabled:text-[var(--btn-outline-disabled-fg)] disabled:border-[var(--btn-outline-disabled-border)]
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
