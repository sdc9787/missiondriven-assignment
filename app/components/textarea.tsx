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

// 기본 스타일
const baseClasses = `
  w-full px-4 py-3 rounded-lg resize-none
  text-[16px] leading-relaxed
  transition-colors duration-200
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-thumb]:rounded-full
`;

// 기본 색상 스타일
const defaultColorClasses = `
  text-textarea-fg
  placeholder:text-textarea-placeholder
  border-2 border-textarea-border
  caret-textarea-fg

  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-textarea-border
`;

// 포커스 스타일
const focusClasses = `
  focus:outline-none
  focus:border-textarea-focus
  focus:caret-textarea-focus
  focus:[&::-webkit-scrollbar-thumb]:bg-textarea-focus
`;

// 에러 스타일 (important로 focus 덮어쓰기)
const errorClasses = `
  !border-textarea-error
  !caret-textarea-error
  [&::-webkit-scrollbar-thumb]:!bg-textarea-error
  focus:[&::-webkit-scrollbar-thumb]:!bg-textarea-error
`;

export function Textarea({ maxLength = 80, minLength = 8, errorMessage = "", placeholder = "텍스트를 입력해주세요", className = "", value, onChange, ...rest }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 에러 조건: 길이가 0이 아니면서 minLength 미만일 때
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
        <textarea ref={textareaRef} value={value} onChange={handleChange} placeholder={placeholder} maxLength={maxLength} className={`${baseClasses} ${defaultColorClasses} ${focusClasses} ${hasError ? errorClasses : ""}`.trim().replace(/\s+/g, " ")} {...rest} />
        {/* 글자수 카운터 */}
        <div className="absolute bottom-3 right-4 text-[14px] text-textarea-placeholder pointer-events-none">
          {value.length} / {maxLength}자 (최소 {minLength}자)
        </div>
      </div>

      {/* 에러 메시지 */}
      {hasError && errorMessage && <p className="mt-2 font-medium text-[16px] text-textarea-error">{errorMessage}</p>}
    </div>
  );
}

export default Textarea;
