"use client";

import React, { useRef } from "react";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  minLength?: number;
  errorMessage?: string;
  placeholder?: string;
}

export function Textarea({ maxLength = 80, minLength = 8, errorMessage = "", placeholder = "텍스트를 입력해주세요", className = "", value, onChange, ...rest }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 에러 조건: 0이 아니면서 minLength 미만일 때
  const hasError = value.length > 0 && value.length < minLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className={`${className}`}>
      {/* Textarea 영역 */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 rounded-[8px] resize-none
            text-[var(--textarea-fg)] text-[16px] leading-relaxed
            placeholder:text-[var(--textarea-placeholder)]
            border-2 border-[var(--textarea-border)]
            focus:border-[var(--textarea-focus)]
            ${hasError ? "!border-[var(--textarea-error)]" : ""}
            caret-[var(--textarea-fg)]
            focus:caret-[var(--textarea-focus)]
            ${hasError ? "!caret-[var(--textarea-error)]" : ""}
            transition-colors duration-200
            focus:outline-none
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[var(--textarea-border)]
            [&::-webkit-scrollbar-thumb]:rounded-full
            focus:[&::-webkit-scrollbar-thumb]:bg-[var(--textarea-focus)]
            ${hasError ? "[&::-webkit-scrollbar-thumb]:!bg-[var(--textarea-error)] focus:[&::-webkit-scrollbar-thumb]:!bg-[var(--textarea-error)]" : ""}
          `
            .trim()
            .replace(/\s+/g, " ")}
          {...rest}
        />
        {/* 글자수 카운터 */}
        <div className="absolute bottom-3 right-4 text-[14px] text-[var(--textarea-placeholder)] pointer-events-none">
          {value.length} / {maxLength}자 (최소 {minLength}자)
        </div>
      </div>

      {/* 에러 메시지 */}
      {hasError && errorMessage && <p className="mt-2 font-medium text-[16px] text-[var(--textarea-error)]">{errorMessage}</p>}
    </div>
  );
}

export default Textarea;
