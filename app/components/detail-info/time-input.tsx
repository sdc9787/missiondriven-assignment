"use client";

import { TimeData, isStartAfterEnd, addOneHour } from "./time-utils";
import toast from "react-hot-toast";

interface TimeInputProps {
  label: string;
  time: TimeData;
  onUpdate: (time: TimeData) => void;
  isEndTime?: boolean;
  startTime?: TimeData;
  endTime?: TimeData;
  onEndTimeUpdate?: (time: TimeData) => void;
}

export function TimeInput({ label, time, onUpdate, isEndTime = false, startTime, endTime, onEndTimeUpdate }: TimeInputProps) {
  // 시간 검증 함수
  const validateAndUpdate = (newTime: TimeData) => {
    // 종료 시간인 경우: 시작 시간보다 빠르면 안됨
    if (isEndTime && startTime && isStartAfterEnd(startTime, newTime)) {
      toast.error("시작 시간보다 종료시간은 빠를 수 없습니다.");
      onUpdate(addOneHour(startTime));
    } else {
      onUpdate(newTime);
    }
  };

  return (
    <div className="flex items-center gap-3 md:gap-6 mb-4">
      <span className="text-[16px] md:text-[18px] font-semibold text-btn-neutral-hover-bg whitespace-nowrap">{label}</span>
      {/* 시간 선택 */}
      <div className="flex-1 flex items-center gap-1 md:gap-2 bg-white py-[7px] px-2.5 md:py-[11px] md:px-3.5 rounded-lg border border-[#e5e5e5]">
        {/* 오전/오후 토글 */}
        <button
          type="button"
          className="px-2 md:px-3 py-[7px] md:py-[5px] text-[14px] md:text-[16px] font-medium bg-btn-outline-bg text-[#323232] border border-[#e5e5e5] rounded-md"
          onClick={() => {
            const newPeriod = time.period === "오전" ? "오후" : "오전";
            const newTime = { ...time, period: newPeriod };
            validateAndUpdate(newTime);
          }}>
          {time.period}
        </button>

        {/* 시 입력 */}
        <input
          type="text"
          value={time.hour}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            if (value === "") {
              onUpdate({ ...time, hour: "" });
            } else {
              const numValue = parseInt(value);
              if (numValue >= 0 && numValue <= 12) {
                onUpdate({ ...time, hour: value });
              }
            }
          }}
          onBlur={(e) => {
            const value = e.target.value;
            if (value === "" || value === "0") {
              const defaultHour = "01";
              const newTime = { ...time, hour: defaultHour };
              validateAndUpdate(newTime);
            } else {
              const newTime = { ...time, hour: value.padStart(2, "0") };
              validateAndUpdate(newTime);
            }
          }}
          className="w-full flex-1 px-2 md:px-4 text-[16px] md:text-[20px] text-center font-medium"
          placeholder={isEndTime ? "11" : "10"}
          maxLength={2}
        />

        <span className="text-[16px] md:text-[18px] font-medium">:</span>

        {/* 분 입력 */}
        <input
          type="text"
          value={time.minute}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            if (value === "") {
              onUpdate({ ...time, minute: "" });
            } else if (parseInt(value) <= 59) {
              onUpdate({ ...time, minute: value });
            }
          }}
          onBlur={(e) => {
            const value = e.target.value;
            const newTime = value === "" ? { ...time, minute: "00" } : { ...time, minute: value.padStart(2, "0") };
            validateAndUpdate(newTime);
          }}
          className="w-full flex-1 px-2 md:px-4 text-[16px] md:text-[20px] text-center font-medium"
          placeholder="00"
          maxLength={2}
        />
      </div>
    </div>
  );
}
