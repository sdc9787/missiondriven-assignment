"use client";

import Image from "next/image";
import Button from "./button";

interface HeaderProps {
  view: "form" | "category";
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
}

export default function Header({ view, onBack, onNext, nextDisabled = false }: HeaderProps) {
  return (
    <>
      {/* 모바일: 상단 헤더 (제목만) */}
      <header className="z-10 fixed top-0 left-0 right-0 py-[15px] border-b border-[#d7d7d7] bg-white">
        <div className="px-5 flex items-center justify-center md:mx-auto md:max-w-[1100px]">
          {/* 뒤로가기 버튼 */}
          <div className="flex w-[33.333%]">
            {view === "category" && (
              <>
                {/* 모바일: X 아이콘 */}
                <button onClick={onBack} className="md:hidden p-2 -ml-2" aria-label="나가기">
                  <Image src="/icon/x.svg" width={24} height={24} alt="닫기" />
                </button>
                {/* 데스크톱: 나가기 버튼 */}
                <div className="hidden md:block">
                  <Button onClick={onBack} text="나가기" variant="outline"></Button>
                </div>
              </>
            )}
          </div>
          {/* 제목 */}
          <h1 className="text-2xl font-bold w-[33.333%] flex justify-center">{view === "form" ? "과제" : "카테고리"}</h1>
          {/* 데스크톱: 헤더 내 버튼 */}
          <div className="flex w-[33.333%] justify-end items-center">
            <Button className="hidden md:block" text="다음으로" variant="primary" disabled={nextDisabled} onClick={onNext}></Button>
          </div>
        </div>
      </header>

      {/* 모바일: 하단 고정 버튼 */}
      <div className="z-10 fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#d7d7d7] md:hidden">
        <Button text="다음으로" variant="primary" disabled={nextDisabled} onClick={onNext} className="w-full"></Button>
      </div>
    </>
  );
}
