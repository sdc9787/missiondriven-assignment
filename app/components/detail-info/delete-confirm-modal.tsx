"use client";

import Image from "next/image";
import Button from "../button";

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    <div className="bg-white rounded-2xl p-4 max-w-[430px] w-full">
      {/* X 버튼 */}
      <div className="flex justify-end mb-2">
        <button type="button" onClick={onCancel} aria-label="닫기">
          <Image src="/icon/x.svg" alt="닫기" width={32} height={32} className="w-7 h-7 md:w-8 md:h-8" />
        </button>
      </div>

      {/* 제목 */}
      <div className="mb-2">
        {/* 모바일: 한 줄 */}
        <h3 className="text-[20px] font-bold text-center md:hidden">작성된 내용을 삭제하시겠어요?</h3>
        {/* PC: 두 줄 */}
        <div className="hidden md:block">
          <h3 className="text-[24px] font-bold text-center">작성된 내용을</h3>
          <h3 className="text-[24px] font-bold text-center">삭제하시겠어요?</h3>
        </div>
      </div>
      <p className="text-[16px] md:text-[18px] text-center text-[#666666] mb-8">삭제한 내용은 복구할 수 없습니다.</p>
      <div className="flex gap-2">
        <Button text="취소" variant="outline" className="flex-1" onClick={onCancel} />
        <Button text="삭제하기" variant="neutral" className="flex-1" onClick={onConfirm} />
      </div>
    </div>
  );
}
