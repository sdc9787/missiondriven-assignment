"use client";

import AdditionalImages from "./components/additional-images";
import Header from "./components/header";
import RepresentativeImage from "./components/representative-image";

export default function Main() {
  return (
    <div className="w-dvw">
      <Header></Header>
      <div className="flex flex-col gap-10 px-5 py-10 max-w-[1100px] mx-auto">
        <RepresentativeImage></RepresentativeImage>
        <AdditionalImages></AdditionalImages>
      </div>
    </div>
  );
}
