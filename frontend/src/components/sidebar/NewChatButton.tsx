"use client";

import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function NewChatButton({ onClick }: Props) {
  return (
    <div className="px-4 mb-3">
      <button
        type="button"
        onClick={onClick}
        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover active:scale-[0.99]"
      >
        <Plus size={16} />
        新建对话
      </button>
    </div>
  );
}
