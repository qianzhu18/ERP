"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { ChatMessage, InterruptData, TodoItem } from "@/lib/types";
import MessageList from "./MessageList";
import WelcomeScreen from "./WelcomeScreen";
import InputBar from "./InputBar";
import ThinkingIndicator from "./ThinkingIndicator";
import TodoListPanel from "./TodoListPanel";
import HarnessPhaseBar from "./HarnessPhaseBar";
import ToolCallToggle from "@/components/common/ToolCallToggle";
import InterruptBanner from "@/components/interrupt/InterruptBanner";

interface Props {
  messages: ChatMessage[];
  streaming: boolean;
  thinking: boolean;
  interrupted: boolean;
  interruptData: InterruptData | null;
  todoItems: TodoItem[];
  todoVisible: boolean;
  pendingQueue: string[];
  phase: string;
  phaseLabel: string;
  onSend: (msg: string) => void;
  onSupplement: (text: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onOpenSidebar: () => void;
}

export default function ChatArea({
  messages,
  streaming,
  thinking,
  interrupted,
  interruptData,
  todoItems,
  todoVisible,
  pendingQueue,
  phase,
  phaseLabel,
  onSend,
  onSupplement,
  onApprove,
  onReject,
  onOpenSidebar,
}: Props) {
  const [showToolCalls, setShowToolCalls] = useState(true);
  const hasMessages = messages.length > 0;

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
      <div className="workbench-toolbar flex items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="打开导航"
            onClick={onOpenSidebar}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          >
            <Menu size={19} />
          </button>
          <div className="min-w-0">
            <span className="block truncate text-sm font-semibold text-gray-900">采购工作台</span>
            <span className="hidden text-xs text-gray-500 sm:block">智能采购助手</span>
          </div>
        </div>
        {hasMessages && <ToolCallToggle show={showToolCalls} onToggle={setShowToolCalls} />}
      </div>

      {/* TODO 任务列表 - 最顶层悬浮（在 main 层级，不被任何父级影响） */}
      <TodoListPanel items={todoItems} visible={todoVisible} />

      {/* Harness 阶段指示器 */}
      <HarnessPhaseBar phase={phase} phaseLabel={phaseLabel} visible={streaming || phase === "done"} />

      {/* 消息区域 / 欢迎页 */}
      {hasMessages ? (
        <MessageList
          messages={messages}
          streaming={streaming}
          showToolCalls={showToolCalls}
        />
      ) : (
        <WelcomeScreen onPromptClick={onSend} />
      )}

      {/* 深度思考动画 */}
      {thinking && <ThinkingIndicator visible={thinking} />}

      {/* 中断交互区 */}
      {interrupted && interruptData && (
        <InterruptBanner
          data={interruptData}
          onSupplement={onSupplement}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}

      {/* 输入区 */}
      <InputBar onSend={onSend} disabled={streaming} queued={pendingQueue.length} />
    </main>
  );
}
