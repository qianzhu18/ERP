"use client";

import { useState } from "react";
import { TodoItem } from "@/lib/types";
import { CheckCircle2, Circle, Loader2, XCircle, ListTodo, X } from "lucide-react";

interface Props {
  items: TodoItem[];
  visible: boolean;
}

const STATUS_CONFIG = {
  pending: { icon: Circle, color: "text-gray-300", label: "待处理" },
  in_progress: { icon: Loader2, color: "text-blue-500", label: "执行中", spin: true },
  complete: { icon: CheckCircle2, color: "text-green-500", label: "已完成" },
  cancelled: { icon: XCircle, color: "text-red-400", label: "已取消" },
} as const;

export default function TodoListPanel({ items, visible }: Props) {
  const [open, setOpen] = useState(true);

  if (!visible || items.length === 0) return null;

  const completedCount = items.filter((i) => i.status === "complete").length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 top-14 z-[var(--z-dropdown)] flex min-h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-600 shadow-sm transition-colors hover:bg-gray-50 animate-fade-in"
      >
        <ListTodo size={14} className="text-blue-600" />
        <span>{completedCount}/{items.length}</span>
      </button>
    );
  }

  return (
    <div className="fixed right-4 top-14 z-[var(--z-dropdown)] w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg animate-fade-in">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <ListTodo size={14} className="text-blue-600" />
          <span className="text-xs font-medium text-gray-700">任务规划</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">
            {completedCount}/{items.length} 完成
          </span>
          <button
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-lg transition-colors hover:bg-gray-200"
            title="收起"
          >
            <X size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="h-1 bg-gray-100">
        <div
          className="h-full origin-left bg-blue-500 transition-transform duration-300 ease-[var(--ease-out)]"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      <div className="max-h-60 space-y-2 overflow-y-auto px-4 py-2">
        {items.map((item) => {
          const config = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
          const Icon = config.icon;
          return (
            <div key={item.id} className="flex items-center gap-3 py-0.5">
              <Icon
                size={14}
                className={`${config.color} shrink-0 ${
                  "spin" in config && config.spin ? "animate-spin" : ""
                }`}
              />
              <span
                className={`break-words text-sm leading-relaxed ${
                  item.status === "complete"
                    ? "text-gray-400 line-through"
                    : item.status === "in_progress"
                    ? "text-gray-800 font-medium"
                    : "text-gray-500"
                }`}
              >
                {item.content}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
