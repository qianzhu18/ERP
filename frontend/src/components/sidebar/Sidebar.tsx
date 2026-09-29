"use client";

import { Conversation } from "@/lib/types";
import Logo from "./Logo";
import NewChatButton from "./NewChatButton";
import SearchBox from "./SearchBox";
import HistoryList from "./HistoryList";

interface Props {
  conversations: Conversation[];
  activeThreadId: string;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onNewChat: () => void;
  onSelectThread: (id: string) => void;
  onDeleteThread: (id: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  conversations,
  activeThreadId,
  searchQuery,
  onSearchChange,
  onNewChat,
  onSelectThread,
  onDeleteThread,
  mobileOpen,
  onClose,
}: Props) {
  return (
    <aside
      aria-label="采购助手导航"
      className={`app-sidebar fixed inset-y-0 left-0 z-[100] flex h-dvh w-[min(286px,86vw)] shrink-0 flex-col border-r border-gray-200 bg-sidebar transition-transform duration-200 md:static md:h-dvh md:w-[280px] md:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <Logo onClose={onClose} />
      <NewChatButton onClick={onNewChat} />
      <SearchBox value={searchQuery} onChange={onSearchChange} />
      <HistoryList
        conversations={conversations}
        activeThreadId={activeThreadId}
        onSelect={onSelectThread}
        onDelete={onDeleteThread}
      />
      <div className="px-4 py-3 border-t border-gray-200">
        <span className="text-[11px] text-gray-400">DeepAgent v1.0.0</span>
      </div>
    </aside>
  );
}
