"use client";

import { X } from "lucide-react";

export default function Logo({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-primary text-white shadow-sm">
        <span className="text-sm font-semibold">采</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-[-0.02em] text-gray-900">智能采购助手</span>
        <span className="text-xs text-gray-500">ERP Agent</span>
      </div>
      <button
        type="button"
        aria-label="关闭导航"
        onClick={onClose}
        className="ml-auto grid h-11 w-11 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 md:hidden"
      >
        <X size={18} />
      </button>
    </div>
  );
}
