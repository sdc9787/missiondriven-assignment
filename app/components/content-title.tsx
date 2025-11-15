"use client";

import { useState } from "react";
import Textarea from "./textarea";

export interface ContentTitleProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function ContentTitle({ value: externalValue, onChange: externalOnChange, className = "" }: ContentTitleProps) {
  const [internalValue, setInternalValue] = useState("");

  // Controlled vs Uncontrolled
  const value = externalValue !== undefined ? externalValue : internalValue;
  const onChange = externalOnChange || setInternalValue;

  return (
    <div className={className}>
      {/* 타이틀 */}
      <h3 className="text-[22px] md:text-[28px] font-bold text-foreground mb-3">콘텐츠 제목</h3>

      {/* Textarea */}
      <Textarea value={value} onChange={onChange} placeholder="제목을 입력해주세요" maxLength={80} minLength={8} errorMessage="8자 이상 입력해주세요" />
    </div>
  );
}

export default ContentTitle;
