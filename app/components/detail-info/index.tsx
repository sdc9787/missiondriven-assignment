"use client";

import { useState } from "react";
import Button from "../button";
import Textarea from "../textarea";
import Image from "next/image";
import { useModalStore } from "../../store/useModalStore";
import CalendarComponent from "../calendar";
import { TimeData, addOneHour } from "./time-utils";
import { TimeInput } from "./time-input";
import { DateSelectButton } from "./date-select-button";
import { DeleteConfirmModal } from "./delete-confirm-modal";

interface Session {
  id: number;
  date: Date | null;
  startTime: TimeData;
  endTime: TimeData;
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
    setSessions((prevSessions) => {
      return prevSessions.map((session) => {
        if (session.id !== id) return session;

        const updatedSession = { ...session, [field]: value };

        // 시작 시간 업데이트 처리
        if (field === "startTime") {
          const isPeriodChanged = value.period !== session.startTime.period;
          const isHourChanged = value.hour !== session.startTime.hour;
          const isMinuteChanged = value.minute !== session.startTime.minute;

          // 오전/오후 토글만 변경된 경우
          if (isPeriodChanged && !isHourChanged && !isMinuteChanged) {
            // 종료 시간의 오전/오후도 동일하게 변경
            updatedSession.endTime = {
              ...session.endTime,
              period: value.period,
            };
          }
          // 시각(hour 또는 minute)이 변경된 경우
          else if (isHourChanged || isMinuteChanged || isPeriodChanged) {
            // 종료 시간을 시작 시간 +1시간으로 자동 설정
            updatedSession.endTime = addOneHour(value);
          }
        }

        return updatedSession;
      });
    });
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
          <TimeInput label="시작 시간" time={session.startTime} onUpdate={(time) => updateSession(session.id, "startTime", time)} endTime={session.endTime} onEndTimeUpdate={(time) => updateSession(session.id, "endTime", time)} />

          {/* 종료 시간 */}
          <TimeInput label="종료 시간" time={session.endTime} onUpdate={(time) => updateSession(session.id, "endTime", time)} isEndTime={true} startTime={session.startTime} />

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
