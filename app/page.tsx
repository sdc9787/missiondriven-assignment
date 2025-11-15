"use client";

import { useState } from "react";
import AdditionalImages from "./components/additional-images";
import { Category } from "./components/category";
import Header from "./components/header";
import RepresentativeImage from "./components/representative-image";

export default function Main() {
  const [view, setView] = useState<"form" | "category">("form"); // 현재 뷰 상태
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // 선택된 카테고리

  const handleOpenCategoryModal = () => {
    setView("category");
  };

  return (
    <div>
      <Header view={view} onBack={() => setView("form")} />
      <div className="flex justify-center items-start max-w-[1100px] mx-auto">
        <div className="flex flex-1 flex-col gap-10 px-5 py-10 ">
          <RepresentativeImage />
          <AdditionalImages />
        </div>
        <div className="flex flex-1 flex-col gap-10 px-5 py-10">
          <Category selectedCategory={selectedCategory} onOpenModal={handleOpenCategoryModal} />
        </div>
      </div>
    </div>
  );
}
