"use client";

import { ShieldCheck, Check, X } from "lucide-react";
import { InterruptData } from "@/lib/types";

interface Props {
  data: InterruptData;
  onApprove: () => void;
  onReject: () => void;
}

export default function ApprovalCard({ data, onApprove, onReject }: Props) {
  const orderData = data.order_data || data.tool_args || {};

  return (
    <div className="mx-6 mb-3 animate-fade-in">
      <div className="max-w-3xl mx-auto border border-blue-200 bg-blue-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            订单审批确认
          </span>
        </div>

        <p className="text-xs text-blue-700 mb-3">
          以下操作需要您的审批确认：
          {data.tool_name && (
            <span className="font-medium"> {data.tool_name}</span>
          )}
        </p>

        {/* 订单详情 */}
        {Object.keys(orderData).length > 0 && (
          <div className="mb-4 p-3 bg-white/70 rounded-lg border border-blue-100">
            <table className="w-full text-xs">
              <tbody>
                {Object.entries(orderData).map(([key, value]) => (
                  <tr key={key} className="border-b border-blue-50 last:border-0">
                    <td className="whitespace-nowrap py-2 pr-3 font-medium text-gray-500">
                      {key}
                    </td>
                    <td className="break-words py-2 text-gray-800">
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 审批按钮 */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onApprove}
            className="flex min-h-11 items-center gap-2 rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700 active:translate-y-px"
          >
            <Check size={14} />
            批准执行
          </button>
          <button
            type="button"
            onClick={onReject}
            className="flex min-h-11 items-center gap-2 rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600 active:translate-y-px"
          >
            <X size={14} />
            拒绝
          </button>
        </div>
      </div>
    </div>
  );
}
