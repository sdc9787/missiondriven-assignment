"use client";

import Button from "./button";

export default function Header() {
  return (
    <>
      {/* 모바일: 상단 헤더 (제목만) */}
      <header className="py-[15px] border-b border-[#d7d7d7]">
        <div className="md:flex md:items-center md:justify-between md:mx-auto md:max-w-[1100px]">
          <div className="hidden md:block md:flex-[1_1_33.333%]"></div>
          <h1 className="text-2xl font-bold text-center md:flex-[1_1_33.333%]">과제</h1>
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
