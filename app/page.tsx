"use client";

import { useState } from "react";
import AdditionalImages from "./components/additional-images";
import { Category, CategoryModal } from "./components/category";
import ContentTitle from "./components/content-title";
import Header from "./components/header";
import RepresentativeImage from "./components/representative-image";
import toast from "react-hot-toast";

export default function Main() {
  const [view, setView] = useState<"form" | "category">("form"); // 현재 뷰 상태
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // 선택된 카테고리들 (최대 2개)
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]); // 임시 선택 카테고리
  const [contentTitle, setContentTitle] = useState<string>(""); // 콘텐츠 제목

  const handleOpenCategoryModal = () => {
    // 모달 열 때 현재 선택된 카테고리를 임시 상태에 복사
    setTempSelectedCategories([...selectedCategories]);
    setView("category");
  };

  // 카테고리 선택/해제 핸들러 (임시 상태에서 작업)
  const handleToggleCategory = (category: string) => {
    if (tempSelectedCategories.length >= 2 && !tempSelectedCategories.includes(category)) {
      // 이미 2개가 선택된 상태에서 새로운 카테고리를 선택하려고 할 때
      toast.error("최대 2개까지만 선택 가능해요");
      return;
    }
    setTempSelectedCategories((prev) => {
      // 이미 선택된 경우 제거
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
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
        <div className="flex flex-col md:flex-row justify-center md:items-start max-w-[1100px] mx-auto">
          <div className="flex flex-1 flex-col gap-10 px-5 py-10 ">
            <RepresentativeImage />
            <AdditionalImages />
          </div>
          <div className="flex flex-1 flex-col gap-10 px-5 md:py-10">
            <Category selectedCategories={selectedCategories} onOpenModal={handleOpenCategoryModal} />
            <ContentTitle value={contentTitle} onChange={setContentTitle} />
          </div>
        </div>
      )}

      {view === "category" && <CategoryModal selectedCategories={tempSelectedCategories} onToggle={handleToggleCategory} />}
    </div>
  );
}
