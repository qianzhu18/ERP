"use client";

import { MessageSquare, Trash2 } from "lucide-react";
import { Conversation } from "@/lib/types";

interface Props {
  conversation: Conversation;
  active: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HistoryItem({
  conversation,
  active,
  onSelect,
  onDelete,
}: Props) {
  return (
    <div
      className={`group mx-2 flex items-center gap-1 rounded-[var(--radius-control)] px-2 py-0.5 transition-colors ${
        active
          ? "bg-blue-50 text-blue-800"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <button
        type="button"
        aria-current={active ? "page" : undefined}
        onClick={() => onSelect(conversation.thread_id)}
        className="flex min-h-11 min-w-0 flex-1 items-center gap-2 text-left text-sm"
      >
        <MessageSquare size={15} className="shrink-0 opacity-60" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate">{conversation.title}</span>
      </button>
      <button
        type="button"
        aria-label={`删除对话：${conversation.title}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(conversation.thread_id);
        }}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-md text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
