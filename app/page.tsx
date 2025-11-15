"use client";

import { useState } from "react";
import AdditionalImages from "./components/additional-images";
import { Category, CategoryModal } from "./components/category";
import Header from "./components/header";
import RepresentativeImage from "./components/representative-image";
import toast from "react-hot-toast";

export default function Main() {
  const [view, setView] = useState<"form" | "category">("form"); // 현재 뷰 상태
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // 선택된 카테고리들 (최대 2개)
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]); // 임시 선택 카테고리

  const handleOpenCategoryModal = () => {
    // 모달 열 때 현재 선택된 카테고리를 임시 상태에 복사
    setTempSelectedCategories([...selectedCategories]);
    setView("category");
  };

  // 카테고리 선택/해제 핸들러 (임시 상태에서 작업)
  const handleToggleCategory = (category: string) => {
    setTempSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // 이미 선택된 경우 제거
        return prev.filter((c) => c !== category);
      } else {
        // 선택되지 않은 경우 추가 (최대 2개)
        if (prev.length >= 2) {
          toast("최대 2개의 카테고리만 선택할 수 있습니다.");
          return prev; // 이미 2개가 선택되어 있으면 추가하지 않음
        }
        return [...prev, category];
      }
    });
  };

  // 나가기 버튼: 선택 취소하고 폼으로 돌아가기
  const handleBack = () => {
    setTempSelectedCategories([]); // 임시 선택 초기화
    setView("form");
  };

  // 다음으로 버튼: 선택 저장하고 폼으로 돌아가기
  const handleNext = () => {
    if (view === "category" && tempSelectedCategories.length > 0) {
      setSelectedCategories([...tempSelectedCategories]); // 임시 선택을 실제 선택으로 저장
    }
    setView("form");
  };

  return (
    <div>
      <Header view={view} onBack={handleBack} onNext={handleNext} nextDisabled={view === "category" ? tempSelectedCategories.length === 0 : true} />

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

      {view === "category" && <CategoryModal selectedCategories={tempSelectedCategories} onToggle={handleToggleCategory} />}
    </div>
  );
}
