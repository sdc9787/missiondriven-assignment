"use client";

import { useState, useRef } from "react";
import Button from "./button";
import Textarea from "./textarea";
import Image from "next/image";
import { useModalStore } from "../store/useModalStore";
import CalendarComponent from "./calendar";

interface Session {
  id: number;
  date: Date | null;
  startTime: { period: string; hour: string; minute: string };
  endTime: { period: string; hour: string; minute: string };
  description: string;
}

export function DetailInfo() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      date: null,
      startTime: { period: "오전", hour: "10", minute: "00" },
      endTime: { period: "오전", hour: "11", minute: "00" },
      description: "",
    },
  ]);

  // Modal store
  const { open: openModal, close: closeModal } = useModalStore();

  // 회차 추가 함수
  const handleAddSession = () => {
    const newSession: Session = {
      id: Date.now(),
      date: null,
      startTime: { period: "오전", hour: "10", minute: "00" },
      endTime: { period: "오전", hour: "11", minute: "00" },
      description: "",
    };
    setSessions([...sessions, newSession]);
  };

  // 세션 삭제 함수
  const handleDeleteSession = (id: number) => {
    setSessions(sessions.filter((session) => session.id !== id));
    closeModal();
  };

  // 삭제 버튼 핸들러
  const handleDeleteClick = (id: number) => {
    openModal(<DeleteConfirmModal onConfirm={() => handleDeleteSession(id)} onCancel={closeModal} />, undefined, undefined, "center");
  };

  // 날짜 선택 핸들러
  const handleDateClick = (sessionId: number, buttonRef: React.RefObject<HTMLButtonElement | null>) => {
    const session = sessions.find((s) => s.id === sessionId);
    // 모달 오픈
    openModal(
      <CalendarComponent
        value={session?.date || null}
        onChange={(date) => {
          updateSession(sessionId, "date", date);
          closeModal();
        }}
      />,
      buttonRef,
      undefined,
      "position"
    );
  };

  // 날짜 포맷 함수
  const formatDate = (date: Date | null) => {
    if (!date) return "날짜를 선택해주세요";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  // 세션 정보 업데이트 함수
  const updateSession = (id: number, field: string, value: any) => {
    setSessions(sessions.map((session) => (session.id === id ? { ...session, [field]: value } : session)));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 제목 */}
      <h2 className="text-[22px] md:text-[28px] font-bold">상세 정보</h2>

      {/* 회차 정보 목록 */}
      {sessions.map((session, index) => (
        <div key={session.id} className="bg-btn-outline-bg px-4 md:px-5 py-5 md:py-7 rounded-lg relative">
          {/* 삭제 버튼 (2개 이상일 때만 표시) */}
          {sessions.length > 1 && (
            <button type="button" className="absolute top-5 md:top-7 right-4 md:right-5 p-1" onClick={() => handleDeleteClick(session.id)} aria-label="회차 삭제">
              <Image src="/icon/x.svg" alt="삭제" width={24} height={24} />
            </button>
          )}

          <h3 className="text-[20px] md:text-[24px] font-bold mb-4">{sessions.length === 1 ? "회차 정보" : `${index + 1}회차 정보`}</h3>

          {/* 날짜 선택 */}
          <div className="flex items-center gap-3 md:gap-6 mb-4">
            <span className="text-[16px] md:text-[18px] font-semibold text-[#565656] whitespace-nowrap">날짜 선택</span>
            <DateSelectButton sessionId={session.id} date={session.date} onDateClick={handleDateClick} formatDate={formatDate} />
          </div>

          {/* 시작 시간 */}
          <div className="flex items-center gap-3 md:gap-6 mb-4">
            <span className="text-[16px] md:text-[18px] font-semibold text-[#565656] whitespace-nowrap">시작 시간</span>
            {/* 시간 선택 */}
            <div className="flex-1 flex items-center gap-1 md:gap-2 bg-white py-[7px] px-[10px] md:py-[11px] md:px-[14px] rounded-lg border border-[#e5e5e5]">
              {/* 오전/오후 토글 */}
              <button
                type="button"
                className="px-2 md:px-3 py-[7px] md:py-[5px] text-[14px] md:text-[16px] font-medium bg-[#f7f7f8] text-[#323232] border border-[#e5e5e5] rounded-md"
                onClick={() => updateSession(session.id, "startTime", { ...session.startTime, period: session.startTime.period === "오전" ? "오후" : "오전" })}>
                {session.startTime.period}
              </button>
              <input
                type="text"
                value={session.startTime.hour}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
                    updateSession(session.id, "startTime", { ...session.startTime, hour: value.padStart(2, "0") });
                  }
                }}
                className="w-full flex-1 px-2 md:px-4 text-[16px] md:text-[20px] text-center font-medium"
                placeholder="10"
                maxLength={2}
              />
              <span className="text-[16px] md:text-[18px] font-medium">:</span>
              <input
                type="text"
                value={session.startTime.minute}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value === "" || parseInt(value) <= 59) {
                    updateSession(session.id, "startTime", { ...session.startTime, minute: value.padStart(2, "0") });
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
              <button
                type="button"
                className="px-2 md:px-3 py-[7px] md:py-[5px] text-[14px] md:text-[16px] font-medium bg-[#f7f7f8] text-[#323232] border border-[#e5e5e5] rounded-md"
                onClick={() => updateSession(session.id, "endTime", { ...session.endTime, period: session.endTime.period === "오전" ? "오후" : "오전" })}>
                {session.endTime.period}
              </button>
              <input
                type="text"
                value={session.endTime.hour}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
                    updateSession(session.id, "endTime", { ...session.endTime, hour: value.padStart(2, "0") });
                  }
                }}
                className="w-full flex-1 px-2 md:px-4 text-[16px] md:text-[20px] text-center font-medium"
                placeholder="10"
                maxLength={2}
              />
              <span className="text-[16px] md:text-[18px] font-medium">:</span>
              <input
                type="text"
                value={session.endTime.minute}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value === "" || parseInt(value) <= 59) {
                    updateSession(session.id, "endTime", { ...session.endTime, minute: value.padStart(2, "0") });
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
            <Textarea value={session.description} onChange={(value) => updateSession(session.id, "description", value)} placeholder="활동 내용을 간단히 입력해주세요" maxLength={800} minLength={8} errorMessage="8자 이상 작성해 주세요" />
          </div>
        </div>
      ))}

      {/* 회차 추가하기 버튼 */}
      <Button text="회차 추가하기" variant="neutral" className="w-full" onClick={handleAddSession} />
    </div>
  );
}

export default DetailInfo;

// 날짜 선택 버튼 컴포넌트
const DateSelectButton = ({ sessionId, date, onDateClick, formatDate }: { sessionId: number; date: Date | null; onDateClick: (sessionId: number, buttonRef: React.RefObject<HTMLButtonElement | null>) => void; formatDate: (date: Date | null) => string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button ref={buttonRef} type="button" onClick={() => onDateClick(sessionId, buttonRef)} className={`flex-1 text-center px-4 py-[14px] text-[16px] md:text-[20px] md:font-medium bg-white border border-[#e5e5e5] rounded-lg ${date ? "text-[#323232]" : "text-[#8f8f8f]"}`}>
      {formatDate(date)}
    </button>
  );
};

// 삭제 확인 모달 컴포넌트
const DeleteConfirmModal = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => {
  return (
    <div className="bg-white rounded-2xl p-4 max-w-[430px] w-full">
      {/* X 버튼 */}
      <div className="flex justify-end mb-2">
        <button type="button" onClick={onCancel} aria-label="닫기">
          <Image src="/icon/x.svg" alt="닫기" width={32} height={32} className="w-7 h-7 md:w-8 md:h-8" />
        </button>
      </div>

      {/* 제목 */}
      <div className="mb-2">
        {/* 모바일: 한 줄 */}
        <h3 className="text-[20px] font-bold text-center md:hidden">작성된 내용을 삭제하시겠어요?</h3>
        {/* PC: 두 줄 */}
        <div className="hidden md:block">
          <h3 className="text-[24px] font-bold text-center">작성된 내용을</h3>
          <h3 className="text-[24px] font-bold text-center">삭제하시겠어요?</h3>
        </div>
      </div>
      <p className="text-[16px] md:text-[18px] text-center text-[#666666] mb-8">삭제한 내용은 복구할 수 없습니다.</p>
      <div className="flex gap-2">
        <Button text="취소" variant="outline" className="flex-1" onClick={onCancel} />
        <Button text="삭제하기" variant="neutral" className="flex-1" onClick={onConfirm} />
      </div>
    </div>
  );
};
