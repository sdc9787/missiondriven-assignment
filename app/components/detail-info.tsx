"use client";

import React, { useState } from "react";
import Button from "./button";
import Textarea from "./textarea";

export function DetailInfo() {
  const [startTime, setStartTime] = useState({ period: "오전", hour: "10", minute: "00" });
  const [endTime, setEndTime] = useState({ period: "오전", hour: "11", minute: "00" });
  const [description, setDescription] = useState<string>("");

  return (
    <div className="flex flex-col">
      {/* 제목 */}
      <h2 className="text-[22px] md:text-[28px] font-bold mb-4">상세 정보</h2>

      {/* 회차 정보 */}
      <div className="bg-btn-outline-bg px-4 md:px-5 py-5 md:py-7 rounded-lg">
        <h3 className="text-[20px] md:text-[24px] font-bold mb-4">회차 정보</h3>

        {/* 날짜 선택 */}
        <div className="flex items-center gap-3 md:gap-6 mb-4">
          <span className="text-[16px] md:text-[18px] font-semibold text-[#565656] whitespace-nowrap">날짜 선택</span>
          <button className="flex-1 text-center px-4 py-[14px] text-[16px] md:text-[20px]  md:font-medium text-[#8f8f8f] bg-white border border-[#e5e5e5] rounded-lg">날짜를 선택해주세요</button>
        </div>

        {/* 시작 시간 */}
        <div className="flex items-center gap-3 md:gap-6 mb-4">
          <span className="text-[16px] md:text-[18px] font-semibold text-[#565656] whitespace-nowrap">시작 시간</span>
          {/* 시간 선택 */}
          <div className="flex-1 flex items-center gap-1 md:gap-2 bg-white py-[7px] px-[10px] md:py-[11px] md:px-[14px] rounded-lg border border-[#e5e5e5]">
            {/* 오전/오후 토글 */}
            <button type="button" className="px-2 md:px-3 py-[7px] md:py-[5px] text-[14px] md:text-[16px] font-medium bg-[#f7f7f8] text-[#323232] border border-[#e5e5e5] rounded-md" onClick={() => setStartTime({ ...startTime, period: startTime.period === "오전" ? "오후" : "오전" })}>
              {startTime.period}
            </button>
            <input
              type="text"
              value={startTime.hour}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
                  setStartTime({ ...startTime, hour: value.padStart(2, "0") });
                }
              }}
              className="w-full flex-1 px-2 md:px-4 text-[16px] md:text-[20px] text-center font-medium"
              placeholder="10"
              maxLength={2}
            />
            <span className="text-[16px] md:text-[18px] font-medium">:</span>
            <input
              type="text"
              value={startTime.minute}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value === "" || parseInt(value) <= 59) {
                  setStartTime({ ...startTime, minute: value.padStart(2, "0") });
                }
              }}
              className="w-full flex-1 px-2 md:px-4 text-[16px] md:text-[20px] text-center font-medium"
              placeholder="00"
              maxLength={2}
            />
          </div>
        </div>

        {/* 종료 시간 */}
        <div className="flex items-center gap-3 md:gap-6">
          <span className="text-[16px] md:text-[18px] font-semibold text-[#565656] whitespace-nowrap">종료 시간</span>
          {/* 시간 선택 */}
          <div className="flex-1 flex items-center gap-1 md:gap-2 bg-white py-[7px] px-[10px] md:py-[11px] md:px-[14px] rounded-lg border border-[#e5e5e5]">
            {/* 오전/오후 토글 */}
            <button type="button" className="px-2 md:px-3 py-[7px] md:py-[5px] text-[14px] md:text-[16px] font-medium bg-[#f7f7f8] text-[#323232] border border-[#e5e5e5] rounded-md" onClick={() => setEndTime({ ...endTime, period: endTime.period === "오전" ? "오후" : "오전" })}>
              {endTime.period}
            </button>
            <input
              type="text"
              value={endTime.hour}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
                  setEndTime({ ...endTime, hour: value.padStart(2, "0") });
                }
              }}
              className="w-full flex-1 px-2 md:px-4 text-[16px] md:text-[20px] text-center font-medium"
              placeholder="10"
              maxLength={2}
            />
            <span className="text-[16px] md:text-[18px] font-medium">:</span>
            <input
              type="text"
              value={endTime.minute}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value === "" || parseInt(value) <= 59) {
                  setEndTime({ ...endTime, minute: value.padStart(2, "0") });
                }
              }}
              className="w-full flex-1 px-2 md:px-4 text-[16px] md:text-[20px] text-center font-medium"
              placeholder="00"
              maxLength={2}
            />
          </div>
        </div>
        {/* 활동 내용 */}
        <div className="mt-8">
          <h3 className="text-[20px] md:text-[24px] font-bold mb-2">활동 내용</h3>
          <p className="text-[16px] md:text-[18px] text-[#666666] font-medium mb-3">날짜별 활동 내용을 간단히 적어주세요</p>
          <Textarea value={description} onChange={setDescription} placeholder="활동 내용을 간단히 입력해주세요" maxLength={800} minLength={8} errorMessage="8자 이상 작성해 주세요" />
        </div>
      </div>

      {/* 회차 추가하기 버튼 */}
      <Button text="회차 추가하기" variant="neutral" className="w-full mt-6 " />
    </div>
  );
}

export default DetailInfo;
