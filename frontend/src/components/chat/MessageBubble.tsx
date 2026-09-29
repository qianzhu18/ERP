"use client";

import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import ToolCallDisplay from "./ToolCallDisplay";
import StreamingText from "./StreamingText";

interface Props {
  message: ChatMessage;
  isStreaming?: boolean;
  showToolCalls?: boolean;
}

export default function MessageBubble({
  message,
  isStreaming,
  showToolCalls = true,
}: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <Bot size={16} className="text-blue-600" />
        </div>
      )}

      <div
        className={`min-w-0 max-w-[88%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
          isUser
            ? "rounded-br-md bg-primary text-white"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
        }`}
      >
        {/* 工具调用展示 */}
        {!isUser && showToolCalls && message.toolCalls && message.toolCalls.length > 0 && (
          <div className="mb-2">
            {message.toolCalls.map((tc) => (
              <ToolCallDisplay key={tc.id} toolCall={tc} />
            ))}
          </div>
        )}

        {/* 消息内容 */}
        {isUser ? (
          <p className="break-words whitespace-pre-wrap text-sm">{message.content}</p>
        ) : isStreaming && !message.content ? (
          <StreamingText text="" />
        ) : isStreaming ? (
          <div className="text-sm markdown-body">
            <StreamingText text={message.content} />
          </div>
        ) : (
          <div className="text-sm markdown-body">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}

        {/* 来源标识 */}
        {!isUser && message.source && message.source !== "main" && (
          <div className="mt-2 border-t border-gray-100 pt-2">
            <span className="text-[10px] text-gray-400">
              来自: {message.source === "analyst" ? "采购分析专家" : "采购订单专家"}
            </span>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1">
          <User size={16} className="text-gray-600" />
        </div>
      )}
    </div>
  );
}
