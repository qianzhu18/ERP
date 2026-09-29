import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "采购工作台 · 智能采购助手",
  description: "集中处理供应商分析、采购订单与库存查询。",
  icons: {
    icon: [{ url: "/procurement-mark.png", type: "image/png" }],
    apple: [{ url: "/procurement-mark.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Browser extensions may add attributes to <html> before hydration (for
    // example Immersive Translate). Suppress only this root-level mismatch;
    // keep hydration checks enabled for application content below it.
    <html
      lang="zh-CN"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
