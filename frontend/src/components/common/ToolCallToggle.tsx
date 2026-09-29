"use client";

interface Props {
  show: boolean;
  onToggle: (v: boolean) => void;
}

export default function ToolCallToggle({ show, onToggle }: Props) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span className="text-xs text-gray-500">显示工具调用</span>
      <button
        type="button"
        role="switch"
        aria-checked={show}
        aria-label="显示工具调用"
        onClick={() => onToggle(!show)}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-lg"
      >
        <span
          className={`relative h-[18px] w-8 rounded-full transition-colors ${
            show ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow transition-transform ${
            show ? "left-[16px]" : "left-[2px]"
            }`}
          />
        </span>
      </button>
    </label>
  );
}
