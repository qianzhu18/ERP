"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Wrench, CheckCircle, Loader2 } from "lucide-react";
import { ToolCallInfo } from "@/lib/types";

interface Props {
  toolCall: ToolCallInfo;
}

export default function ToolCallDisplay({ toolCall }: Props) {
  const [expanded, setExpanded] = useState(false);

  const statusIcon =
    toolCall.status === "running" ? (
      <Loader2 size={13} className="text-blue-500 animate-spin" />
    ) : (
      <CheckCircle size={13} className="text-green-500" />
    );

  return (
    <div className="my-2 overflow-hidden rounded-lg border border-gray-200 text-xs">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        className="flex min-h-11 w-full items-center gap-2 bg-gray-50 px-3 transition-colors hover:bg-gray-100"
      >
        {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        <Wrench size={13} className="text-gray-500" />
        <span className="font-medium text-gray-700">{toolCall.name}</span>
        <span className="ml-auto">{statusIcon}</span>
      </button>
      {expanded && (
        <div className="px-3 py-2 space-y-2 border-t border-gray-100">
          {toolCall.args && (
            <div>
              <span className="text-gray-400 font-medium">参数:</span>
              <pre className="mt-1 p-2 bg-gray-900 text-gray-100 rounded text-[11px] overflow-x-auto whitespace-pre-wrap">
                {formatJSON(toolCall.args)}
              </pre>
            </div>
          )}
          {toolCall.result && (
            <div>
              <span className="text-gray-400 font-medium">结果:</span>
              <pre className="mt-1 p-2 bg-gray-900 text-gray-100 rounded text-[11px] overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto">
                {formatJSON(toolCall.result)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatJSON(str: string): string {
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return str;
  }
}
