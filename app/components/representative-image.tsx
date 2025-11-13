"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Button from "./button";

export interface RepresentativeImageProps {
  onImageChange?: (file: File | null) => void;
  className?: string;
}

// 허용 파일 형식
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export function RepresentativeImage({ onImageChange, className = "" }: RepresentativeImageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //TODO : 에러 메세지 toast으로 변경

  // 파일 유효성 검사 함수
  const validateFile = (file: File): string | null => {
    // 파일 형식 검사
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "JPG, PNG 파일만 업로드 가능합니다.";
    }

    // 파일 크기 검사
    if (file.size > MAX_FILE_SIZE) {
      return "파일 크기는 15MB 이하여야 합니다.";
    }

    return null;
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // 파일 유효성 검사
    const validationError = validateFile(file);
    if (validationError) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      onImageChange?.(file);
    };
    reader.readAsDataURL(file);
  };

  // 업로드 영역 클릭 핸들러
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {/* 타이틀 */}
      <h3 className="text-[22px] lg:text-[28px] font-bold text-foreground mb-3">대표 이미지</h3>

      {/* 이미지 업로드 영역 */}
      <div
        onClick={handleClick}
        className="
          max-w-[510px] max-h-[510px]
          relative w-full aspect-square
          bg-btn-outline-bg rounded-lg
          border-2 border-dashed border-[#e5e5e5]
          flex flex-col items-center justify-center
          cursor-pointer
          transition-all duration-200
          hover:border-btn-outline-hover-border hover:bg-[#f0f0f1]
        ">
        {imagePreview ? (
          // 업로드된 이미지 표시
          <div className="relative w-full h-full rounded-md overflow-hidden">
            <Image src={imagePreview} alt="대표 이미지" fill className="object-cover" />
            {/* 호버 시 교체 힌트 */}
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <p className="text-white text-[16px] font-medium">이미지 교체</p>
            </div>
          </div>
        ) : (
          // 빈 상태 (업로드 전)
          <>
            <div className="flex flex-col items-center gap-4">
              {/* 텍스트 */}
              <div className="text-center">
                <p className="text-[20px] md:text-[28px] font-bold text-foreground mb-1">
                  콘텐츠 대표 이미지를
                  <br />
                  등록해 주세요!
                </p>
                <p className="text-[16px] md:text-[22px] text-[#8f8f8f]">1:1 비율의 정사각형 이미지를 추천합니다</p>
              </div>
              {/* 업로드 버튼 */}
              <Button text="이미지 업로드" variant="neutral"></Button>
            </div>
          </>
        )}

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
}

export default RepresentativeImage;
