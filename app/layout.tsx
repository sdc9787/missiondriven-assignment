import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomToast from "./lib/CustomToast";
import { Modal } from "./lib/Modal";

const pretendard = localFont({
  src: "../public/fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "missiondriven-assignment",
  description: "missiondriven-assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={pretendard.className}>
        <CustomToast />
        <Modal />
        {children}
      </body>
    </html>
  );
}
