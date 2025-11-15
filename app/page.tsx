"use client";

import { useState } from "react";
import AdditionalImages from "./components/additional-images";
import { Category, CategoryModal } from "./components/category";
import Header from "./components/header";
import RepresentativeImage from "./components/representative-image";

export default function Main() {
  const [view, setView] = useState<"form" | "category">("form"); // 현재 뷰 상태
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // 선택된 카테고리들 (최대 2개)

  const handleOpenCategoryModal = () => {
    setView("category");
  };

  // 카테고리 선택/해제 핸들러
  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // 이미 선택된 경우 제거
        return prev.filter((c) => c !== category);
      } else {
        // 선택되지 않은 경우 추가 (최대 2개)
        if (prev.length >= 2) {
          return prev; // 이미 2개가 선택되어 있으면 추가하지 않음
        }
        return [...prev, category];
      }
    });
  };

  return (
    <div>
      <Header view={view} onBack={() => setView("form")} />

      {view === "form" && (
        <div className="flex justify-center items-start max-w-[1100px] mx-auto">
          <div className="flex flex-1 flex-col gap-10 px-5 py-10 ">
            <RepresentativeImage />
            <AdditionalImages />
          </div>
          <div className="flex flex-1 flex-col gap-10 px-5 py-10">
            <Category selectedCategories={selectedCategories} onOpenModal={handleOpenCategoryModal} />
          </div>
        </div>
      )}

      {view === "category" && <CategoryModal selectedCategories={selectedCategories} onToggle={handleToggleCategory} />}
    </div>
  );
}
