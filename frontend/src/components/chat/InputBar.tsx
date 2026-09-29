"use client";

import { useState, useRef, useCallback } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
  queued?: number;
}

export default function InputBar({ onSend, disabled, queued = 0 }: Props) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [input, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // 自动调整高度
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  return (
    <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="composer-shell flex items-end gap-2 rounded-[var(--radius-panel)] border border-gray-200 bg-white px-3 py-3 shadow-sm transition-[border-color,box-shadow] duration-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/15 sm:px-4">
          <textarea
            ref={textareaRef}
            aria-label="输入采购任务"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "AI 正在回答，输入后会自动排队..." : "输入消息，Enter 发送..."}
            rows={1}
            className="min-h-11 max-h-[120px] min-w-0 flex-1 resize-none bg-transparent text-sm leading-6 text-gray-800 outline-2 outline-transparent placeholder:text-gray-500 focus-visible:outline-focus focus-visible:outline-offset-1"
          />
          {queued > 0 && (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
              {queued} 条排队
            </span>
          )}
          <button
            type="button"
            aria-label="发送消息"
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-control)] bg-primary text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-2">
          DeepAgent 智能采购助手 · 基于 Harness Engineering 架构 · Shift+Enter 换行
        </p>
      </div>
    </div>
  );
}
