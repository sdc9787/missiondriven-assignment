"use client";

import React, { useRef, useEffect } from "react";

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
  bg-white
  min-h-[90px] max-h-[350px] rounded-t-lg
  w-full resize-none overflow-y-auto
  text-[18px] leading-relaxed font-medium
  [&::-webkit-scrollbar]:w-[2px]
  [&::-webkit-scrollbar-thumb]:rounded-full
`;

// 기본 색상 스타일
const defaultColorClasses = `
  text-textarea-fg
  placeholder:text-textarea-placeholder
  caret-textarea-fg
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-textarea-border
`;

// 포커스 스타일
const focusClasses = `
  focus:outline-none
  focus:caret-textarea-focus
  focus:[&::-webkit-scrollbar-thumb]:bg-textarea-focus
`;

// 에러 스타일 (important로 focus 덮어쓰기)
const errorClasses = `
  !caret-textarea-error
  [&::-webkit-scrollbar-thumb]:!bg-textarea-error
  focus:[&::-webkit-scrollbar-thumb]:!bg-textarea-error
`;

// 컨테이너 border 스타일
const containerDefaultClasses = `
  px-4 py-2 bg-white border-2 border-textarea-border rounded-lg 
  transition-colors duration-200
`;

const containerFocusClasses = `
  focus-within:border-textarea-focus
`;

const containerErrorClasses = `
  !border-textarea-error
`;

export function Textarea({ maxLength = 80, minLength = 8, errorMessage = "", placeholder = "텍스트를 입력해주세요", className = "", value, onChange, ...rest }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 에러 조건: 길이가 0이 아니면서 minLength 미만일 때
  const hasError = value.length > 0 && value.length < minLength;

  // textarea 높이 자동 조절
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "90px"; // 최소 높이로 리셋
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, 90), 350); // 90px ~ 350px 사이
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;

    // 연속 공백 방지: 두 개 이상의 공백을 하나로 변환
    newValue = newValue.replace(/\s{2,}/g, " ");

    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className={`${className}`}>
      {/* Textarea 영역 */}
      <div className={`${containerDefaultClasses} ${containerFocusClasses} ${hasError ? containerErrorClasses : ""}`.trim().replace(/\s+/g, " ")}>
        <textarea ref={textareaRef} value={value} onChange={handleChange} placeholder={placeholder} maxLength={maxLength} className={`${baseClasses} ${defaultColorClasses} ${focusClasses} ${hasError ? errorClasses : ""}`.trim().replace(/\s+/g, " ")} {...rest} />
        {/* 글자수 카운터 */}
        <div className=" pb-1 bg-white text-end text-[14px] font-medium rounded-b-lg text-textarea-placeholder">
          {value.length} / {maxLength}자 (최소 {minLength}자)
        </div>
      </div>

      {/* 에러 메시지 */}
      {hasError && errorMessage && <p className="mt-1 font-medium text-[16px] text-textarea-error">{errorMessage}</p>}
    </div>
  );
}

export default Textarea;
