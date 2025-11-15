"use client";

import { useState } from "react";
import AdditionalImages from "./components/additional-images";
import Header from "./components/header";
import RepresentativeImage from "./components/representative-image";

export default function Main() {
  const [view, setView] = useState<"form" | "category">("form"); // 현재 뷰 상태

  return (
    <div>
      <Header view={view} onBack={() => setView("form")} />
      <div className="flex flex-col gap-10 px-5 py-10 max-w-[1100px] mx-auto">
        <RepresentativeImage />
        <AdditionalImages />
      </div>
    </div>
  );
}
