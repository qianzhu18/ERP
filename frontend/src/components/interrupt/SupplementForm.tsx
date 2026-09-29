"use client";

import { useState } from "react";
import { AlertCircle, Send } from "lucide-react";
import { InterruptData } from "@/lib/types";

interface Props {
  data: InterruptData;
  onSubmit: (supplement: string) => void;
}

export default function SupplementForm({ data, onSubmit }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <div className="mx-6 mb-3 animate-fade-in">
      <div className="max-w-3xl mx-auto border border-amber-200 bg-amber-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={16} className="text-amber-600" />
          <span className="text-sm font-medium text-amber-800">
            需要补充订单信息
          </span>
        </div>

        {data.message && (
          <p className="text-xs text-amber-700 mb-2">{data.message}</p>
        )}

        {data.missing_fields && data.missing_fields.length > 0 && (
          <div className="mb-3">
            <span className="text-xs text-amber-600 font-medium">缺少字段: </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {data.missing_fields.map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[11px] rounded-full border border-amber-200"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.extracted_data && Object.keys(data.extracted_data).length > 0 && (
          <div className="mb-3 p-2 bg-white/60 rounded-lg">
            <span className="text-[11px] text-amber-600 font-medium">已提取数据:</span>
            <pre className="mt-1 whitespace-pre-wrap break-words text-xs text-gray-600">
              {JSON.stringify(data.extracted_data, null, 2)}
            </pre>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            aria-label="补充订单信息"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="输入补充信息，如：物料/设备ID为P001，数量2，单价4200"
            className="min-h-11 min-w-0 flex-1 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm outline-2 outline-transparent focus-visible:outline-focus focus-visible:outline-offset-1"
          />
          <button
            type="button"
            aria-label="提交补充信息"
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-600 text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
