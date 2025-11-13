"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface AdditionalImagesProps {
  className?: string;
}

// 허용 파일 형식
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const MAX_IMAGES = 4;

interface ImageItem {
  id: string;
  file: File;
  preview: string;
}

export function AdditionalImages({ className = "" }: AdditionalImagesProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, replaceId?: string) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // 교체가 아닐 때만 최대 개수 체크
    if (!replaceId && images.length >= MAX_IMAGES) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
      let updatedImages: ImageItem[];

      if (replaceId) {
        // 기존 이미지 교체
        updatedImages = images.map((img) =>
          img.id === replaceId
            ? {
                id: `${Date.now()}-${Math.random()}`,
                file,
                preview: reader.result as string,
              }
            : img
        );
      } else {
        // 새 이미지 추가
        const newImage: ImageItem = {
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview: reader.result as string,
        };
        updatedImages = [...images, newImage];
      }

      setImages(updatedImages);
      setSelectedImageId(null);

      // input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
  };

  const handleUploadClick = () => {
    setSelectedImageId(null);
    fileInputRef.current?.click();
  };

  const handleImageClick = (id: string) => {
    if (!isDragging) {
      setSelectedImageId(id);
      fileInputRef.current?.click();
    }
  };

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(false);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || startX === 0) return;
    setIsDragging(true);
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || startX === 0) return;
    setIsDragging(true);
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setStartX(0);
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleTouchEnd = () => {
    setStartX(0);
    setTimeout(() => setIsDragging(false), 100);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 마우스 이벤트 리스너
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (startX === 0) return;
      handleMouseMove(e as any);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [startX, scrollLeft]);

  // 빈 슬롯 개수 계산 (최대 4개까지만)
  const emptySlots = Math.min(MAX_IMAGES - images.length, 1);

  return (
    <div className={className + "max-w-[510px]"}>
      {/* 타이틀 */}
      <div className="mb-3">
        <h3 className="text-[22px] md:text-[28px] font-bold text-foreground">추가 이미지 (선택)</h3>
        <p className="text-[18px] md:text-[20px] text-[#767676] font-medium mt-1">최대 4장까지 등록할 수 있어요</p>
      </div>

      {/* 이미지 그리드 */}
      {/* 데스크톱: 2x2 그리드, 모바일: 가로 스크롤 */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="
          flex gap-2 overflow-x-auto
          md:grid md:grid-cols-2 md:overflow-x-visible
          scrollbar-hide
          cursor-grab active:cursor-grabbing
          select-none
        "
        style={{ touchAction: "pan-x" }}>
        {/* 업로드된 이미지들 */}
        {images.map((image) => (
          <div
            key={image.id}
            className="
              relative shrink-0 w-[calc(50vw-24px)] aspect-square
              md:w-full
              rounded-lg overflow-hidden
              group
            ">
            <Image src={image.preview} alt="추가 이미지" fill className="object-cover" />

            {/* 드래그 가능한 투명 레이어 (모바일) */}
            <div onClick={() => handleImageClick(image.id)} className="absolute inset-0 z-5 md:hidden" style={{ pointerEvents: isDragging ? "none" : "auto" }} />

            {/* 데스크톱 클릭 레이어 */}
            <div onClick={() => handleImageClick(image.id)} className="hidden md:block absolute inset-0 z-5 cursor-pointer hover:bg-black/10 transition-colors" />

            {/* 삭제 버튼 */}
            <button
              type="button"
              onClick={(e) => handleRemoveImage(image.id, e)}
              className="
                absolute top-2 right-2
                w-8 h-8 rounded-full
                bg-black/60 hover:bg-black/80
                flex items-center justify-center
                transition-colors duration-200
                z-10
              "
              aria-label="이미지 삭제">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}

        {/* 업로드 버튼 (빈 슬롯) */}
        {images.length < MAX_IMAGES &&
          Array.from({ length: emptySlots }).map((_, index) => (
            <button
              key={`empty-${index}`}
              type="button"
              onClick={handleUploadClick}
              className="
                shrink-0 w-[calc(50vw-24px)] aspect-square
                md:w-full
                bg-btn-outline-bg rounded-lg
                border-2 border-dashed border-[#e5e5e5]
                flex flex-col items-center justify-center gap-3
                cursor-pointer
                transition-all duration-200
                hover:border-btn-outline-hover-border hover:bg-[#f0f0f1]
              ">
              {/* 아이콘 */}
              <Image src="icon/image-plus.svg" width={60} height={60} className="w-[32px] h-[32px] md:w-[60px] md:h-[60px]" alt="이미지 추가" />
            </button>
          ))}
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/jpg" onChange={(e) => handleFileChange(e, selectedImageId || undefined)} className="hidden" />
    </div>
  );
}

export default AdditionalImages;
