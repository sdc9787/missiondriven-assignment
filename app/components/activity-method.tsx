"use client";

import React from "react";
import Button from "./button";

interface ActivityMethodProps {
  value?: "online" | "offline" | null;
  onChange?: (value: "online" | "offline") => void;
  className?: string;
}

export function ActivityMethod({ value = null, onChange, className = "" }: ActivityMethodProps) {
  const handleSelect = (method: "online" | "offline") => {
    if (onChange) {
      onChange(method);
    }
  };

  return (
    <div className={`${className}`}>
      {/* 제목 */}
      <h2 className="text-[22px] md:text-[28px] font-bold mb-2">활동 방식 선택</h2>

      {/* 설명 */}
      <p className="text-[16px] md:text-[18px] text-[#666666] mb-3">만남을 어떤 방식으로 진행하시겠어요?</p>

      {/* 버튼 그룹 */}
      <div className="flex gap-2">
        {/* 온라인 버튼 */}
        <Button variant="outline" text="온라인" active={value === "online"} onClick={() => handleSelect("online")} className="flex-1" />

        {/* 직접 만나기 버튼 */}
        <Button variant="outline" text="직접 만나기" active={value === "offline"} onClick={() => handleSelect("offline")} className="flex-1" />
      </div>
    </div>
  );
}

export default ActivityMethod;
