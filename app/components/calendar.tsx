"use client";

import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/style.css";
import Button from "./button";
import Image from "next/image";

interface CalendarComponentProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  className?: string;
}

export function CalendarComponent({ value = null, onChange, className = "" }: CalendarComponentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value || undefined);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && onChange) {
      onChange(date);
    }
  };

  return (
    <div className={className}>
      {/* 달력 */}
      <div className="bg-white w-[280px] h-[310px] md:w-[330px] md:h-[370px]">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          locale={ko}
          showOutsideDays={true}
          className="font-pretendard!"
          classNames={{
            root: "px-4 py-5 relative",
            months: "flex flex-col",
            month: "w-full",
            month_caption: "flex justify-start items-center py-4 relative",
            caption_label: "text-[16px] font-semibold text-black",
            nav: "flex items-center gap-[2px] absolute top-8 right-4",
            button_previous: "h-8 w-8 bg-white border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center",
            button_next: "h-8 w-8 bg-white border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center",
            month_grid: "w-full border-collapse border-spacing-0",
            weekdays: "flex mb-3",
            weekday: "text-black font-semibold text-[16px] flex-1 text-center py-2",
            week: "flex w-full",
            day: "flex-1 text-center flex items-center justify-center [&[aria-selected='true']_button]:hover:bg-[#03C124]!",
            day_button: "w-full h-10 flex items-center justify-center text-[18px] font-medium rounded-lg hover:bg-[#f5f5f5]",
            selected: "bg-[#03C124]! text-white! font-bold! rounded-lg z-10",
            today: "text-[#03C124] font-semibold",
            outside: "text-[#8f8f8f]",
            disabled: "text-[#8f8f8f] opacity-50",
          }}
          components={{
            Chevron: ({ orientation }) => {
              if (orientation === "left") {
                return <Image src="/icon/chevron-left.svg" width={20} height={20} alt="이전" />;
              }
              return <Image src="/icon/chevron-right.svg" width={20} height={20} alt="다음" />;
            },
          }}
        />
      </div>

      {/* 선택 완료 버튼 */}
      <div className="px-4 py-4  w-[280px] md:w-[330px]">
        <Button text="선택 완료" variant="primary" className="w-full" disabled={!selectedDate} />
      </div>
    </div>
  );
}

export default CalendarComponent;
