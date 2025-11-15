"use client";

import Image from "next/image";
import Button from "./button";

interface HeaderProps {
  view: "form" | "category";
  onBack?: () => void;
}

export default function Header({ view, onBack }: HeaderProps) {
  return (
    <>
      {/* 모바일: 상단 헤더 (제목만) */}
      <header className="py-[15px] border-b border-[#d7d7d7]">
        <div className="px-5 md:flex md:items-center md:justify-between md:mx-auto md:max-w-[1100px]">
          {/* 뒤로가기 버튼 */}
          <div className="flex md:flex-[1_1_33.333%] md:justify-start">
            {/* 모바일: X 아이콘 */}
            <button onClick={onBack} className="md:hidden p-2 -ml-2" aria-label="나가기">
              <Image src="/icon/x.svg" width={24} height={24} alt="닫기" />
            </button>
            {/* 데스크톱: 나가기 버튼 */}
            <div className="hidden md:block">
              <Button onClick={onBack} text="나가기" variant="outline"></Button>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-[1_1_33.333%]">{view === "form" ? "과제" : "카테고리"}</h1>
          {/* 데스크톱: 헤더 내 버튼 */}
          <div className="hidden md:flex md:flex-[1_1_33.333%] md:justify-end">
            <Button text="다음으로" variant="neutral" disabled></Button>
          </div>
        </div>
      </header>

      {/* 모바일: 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#d7d7d7] md:hidden">
        <Button text="다음으로" variant="neutral" disabled className="w-full"></Button>
      </div>
    </>
  );
}
