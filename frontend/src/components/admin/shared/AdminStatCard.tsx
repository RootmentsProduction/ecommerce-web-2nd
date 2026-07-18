import React from "react";

interface AdminStatCardProps {
  title: string;
  value: string;
  subNote: string;
  icon?: React.ReactNode;
}

export default function AdminStatCard({ title, value, subNote, icon }: AdminStatCardProps) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
          {title}
        </span>
        {icon && <div className="text-neutral-400">{icon}</div>}
      </div>
      <div className="mt-3 flex flex-col">
        <span className="text-2xl font-bold tracking-tight text-neutral-900 font-sans">
          {value}
        </span>
        <span className="text-[11px] text-neutral-400 mt-1 font-medium">
          {subNote}
        </span>
      </div>
    </div>
  );
}
