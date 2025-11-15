"use client";

import Image from "next/image";
import Button from "./button";

export interface CategoryProps {
  selectedCategories: string[];
  onOpenModal: () => void;
  className?: string;
}

export function Category({ selectedCategories, onOpenModal, className = "" }: CategoryProps) {
  const displayText = selectedCategories.length > 0 ? selectedCategories.join(", ") : "주제를 선택해주세요";

  return (
    <div className={className}>
      {/* 타이틀 */}
      <h3 className="text-[22px] md:text-[28px] font-bold text-foreground mb-3">카테고리</h3>

      {/* 카테고리 선택 버튼 */}
      <button
        onClick={onOpenModal}
        className="
          w-full px-4 py-3
          bg-white border border-[#e5e5e5] rounded-lg
          flex items-center justify-between
          hover:border-[#d7d7d7] hover:bg-[#fafafa]
          transition-colors
          text-left
        ">
        <span className={`text-[18px] md:text-[20px] ${selectedCategories.length > 0 ? "text-foreground font-medium" : "text-[#767676]"}`}>{displayText}</span>
        <Image src="/icon/chevron-right.svg" width={24} height={24} alt="선택" className="shrink-0" />
      </button>
    </div>
  );
}

export interface CategoryModalProps {
  selectedCategories: string[];
  onToggle: (category: string) => void;
  className?: string;
}

const CATEGORIES = ["용돈벌기", "디지털", "그림", "글쓰기/독서", "건강/운동", "동기부여/성장", "취미힐링", "외국어"];

export function CategoryModal({ selectedCategories, onToggle, className = "" }: CategoryModalProps) {
  return (
    <div className={`px-5 py-10 max-w-[1100px] mx-auto ${className}`}>
      {/* 타이틀 */}
      <div className="mb-8">
        <h2 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">
          어떤 카테고리의
          <br />
          콘텐츠를 만드시나요?
        </h2>
        <p className="text-[16px] md:text-[18px] text-[#767676] font-medium">최대 2개까지 선택 가능합니다.</p>
      </div>

      {/* 카테고리 그리드 */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return <Button key={category} onClick={() => onToggle(category)} variant="outline" active={isSelected} text={category} />;
        })}
      </div>
    </div>
  );
}
