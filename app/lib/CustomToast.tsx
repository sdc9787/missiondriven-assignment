"use client";

import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

// 최대 표시할 토스트 개수
const TOAST_LIMIT = 2;

export default function CustomToast() {
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // 현재 보이는 토스트들
      .filter((item, i) => i >= TOAST_LIMIT) // 최대 개수 초과한 토스트들
      .forEach((t) => toast.dismiss(t.id)); // 초과한 토스트들 닫기
  }, [toasts]);
  return (
    <Toaster
      position="bottom-center"
      containerClassName="custom-toast-container"
      toastOptions={{
        duration: 2000, // 2초 후 자동 사라짐

        style: {
          background: "#323232",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "500",
          padding: "12px 0px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "520px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },

        success: {
          icon: null,
          style: {
            background: "#323232",
            color: "#ffffff",
          },
        },

        error: {
          icon: null,
          style: {
            background: "#323232",
            color: "#ffffff",
          },
        },

        loading: {
          icon: null,
          duration: Infinity,
          style: {
            background: "#323232",
            color: "#ffffff",
          },
        },
      }}
    />
  );
}
