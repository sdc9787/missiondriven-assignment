"use client";

import { useRef } from "react";

interface DateSelectButtonProps {
  sessionId: number;
  date: Date | null;
  onDateClick: (sessionId: number, buttonRef: React.RefObject<HTMLButtonElement | null>) => void;
  formatDate: (date: Date | null) => string;
}

export function DateSelectButton({ sessionId, date, onDateClick, formatDate }: DateSelectButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onDateClick(sessionId, buttonRef)}
      className={`flex-1 text-center px-4 py-3.5 text-[16px] md:text-[20px] md:font-medium bg-white border border-[#e5e5e5] rounded-lg ${
        date ? "text-[#323232]" : "text-[#8f8f8f]"
      }`}>
      {formatDate(date)}
    </button>
  );
}
