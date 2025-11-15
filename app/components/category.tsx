"use client";

import Image from "next/image";

export interface CategoryProps {
  selectedCategory?: string;
  onOpenModal: () => void;
  className?: string;
}

export function Category({ selectedCategory, onOpenModal, className = "" }: CategoryProps) {
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
        <span className={`text-[18px] md:text-[20px] ${selectedCategory ? "text-foreground font-medium" : "text-[#767676]"}`}>{selectedCategory || "주제를 선택해주세요"}</span>
        <Image src="/icon/chevron-right.svg" width={24} height={24} alt="선택" className="shrink-0" />
      </button>
    </div>
  );
}

export function CategoryModal() {
  return <div>Category Modal Component</div>;
}
