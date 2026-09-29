"use client";

import { CapabilityCard as CardType } from "@/lib/types";
import { ArrowUpRight, BarChart3, Package, Search, ShoppingCart, type LucideIcon } from "lucide-react";

const CARD_ICONS: Record<string, LucideIcon> = {
  供应商分析: BarChart3,
  采购下单: ShoppingCart,
  库存预警: Package,
  研发物料查询: Search,
};

interface Props {
  card: CardType;
  onClick: (prompt: string) => void;
}

export default function CapabilityCard({ card, onClick }: Props) {
  const Icon = CARD_ICONS[card.title] ?? ArrowUpRight;

  return (
    <button
      type="button"
      onClick={() => onClick(card.prompt)}
      data-feature={card.title === "供应商分析" ? "primary" : "standard"}
      className="capability-card group flex min-h-[8rem] min-w-0 flex-col items-start justify-between gap-5 rounded-[var(--radius-card)] border border-gray-200 bg-white p-4 text-left transition-colors duration-200 hover:bg-blue-50/50 active:scale-[0.995] sm:p-5"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-control)] bg-blue-50 text-blue-700" aria-hidden="true">
        <Icon size={18} strokeWidth={1.8} />
      </span>
      <span className="flex w-full min-w-0 items-end justify-between gap-3">
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-gray-900">
            {card.title}
          </span>
          <span className="mt-1 block text-sm leading-5 text-gray-600">
            {card.description}
          </span>
        </span>
        <ArrowUpRight size={16} className="mb-0.5 shrink-0 text-gray-400" aria-hidden="true" />
      </span>
    </button>
  );
}
