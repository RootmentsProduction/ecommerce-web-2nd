import React from "react";

interface AdminTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function AdminTabs({ tabs, activeTab, onChange }: AdminTabsProps) {
  return (
    <div className="border-b border-[#E5E5E5] flex space-x-6 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`py-3.5 px-1 text-xs font-semibold tracking-wide whitespace-nowrap transition-all border-b-2 outline-none cursor-pointer ${
              isActive
                ? "border-[#C99213] text-[#C99213]"
                : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
