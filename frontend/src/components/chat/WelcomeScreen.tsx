"use client";

import { CapabilityCard } from "@/lib/types";
import CapabilityCardComponent from "@/components/common/CapabilityCard";

const CARDS: CapabilityCard[] = [
  {
    title: "供应商分析",
    description: "对供应商进行多维度数据分析，生成可视化图表报告",
    prompt: "帮我对所有供应商进行综合分析，生成对比图表",
  },
  {
    title: "采购下单",
    description: "智能创建采购订单，支持数据补充和审批流程",
    prompt: "帮我新增一个采购订单",
  },
  {
    title: "库存预警",
    description: "监控研发物料与设备库存，及时发现补货风险",
    prompt: "查看当前库存预警信息",
  },
  {
    title: "研发物料查询",
    description: "检索机器人研发物料与设备的规格、价格及供应商",
    prompt: "查询机器人研发物料与设备的库存和价格信息",
  },
];

interface Props {
  onPromptClick: (prompt: string) => void;
}

export default function WelcomeScreen({ onPromptClick }: Props) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-7 max-w-2xl sm:mb-9">
          <h1 className="min-w-0 font-display text-[length:var(--text-display)] font-semibold leading-[1.12] tracking-[-0.035em] text-gray-900">
            采购工作，从一个问题开始
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            描述你要处理的采购任务，或从常用操作快速开始。
          </p>
        </div>

        <div className="welcome-grid">
          {CARDS.map((card) => (
            <CapabilityCardComponent
              key={card.title}
              card={card}
              onClick={onPromptClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
