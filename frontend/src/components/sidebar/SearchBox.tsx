"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className="px-4 mb-3">
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          aria-label="搜索对话"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索对话..."
          className="min-h-11 w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-2 outline-transparent transition-[border-color,background-color] focus:border-blue-400 focus-visible:outline-focus focus-visible:outline-offset-1"
        />
      </div>
    </div>
  );
}
