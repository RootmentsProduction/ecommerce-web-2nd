import React from "react";
import { StatusType } from "@/types/admin";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface OrderSummaryProps {
  orderId: string;
  orderDate: string;
  status: StatusType;
  paymentStatus: string;
  onStatusChange: (newStatus: StatusType) => void;
}

export default function OrderDetailsSummary({
  orderId,
  orderDate,
  status,
  paymentStatus,
  onStatusChange,
}: OrderSummaryProps) {
  const statusOptions: StatusType[] = [
    "Pending Payment",
    "Confirmed",
    "Processing",
    "Packed",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
  ];

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Title ID & Info */}
      <div className="space-y-1">
        <div className="flex items-center space-x-3 flex-wrap gap-1">
          <span className="text-neutral-450 font-bold text-[10px] uppercase tracking-wider font-mono">Order Profile</span>
          <h2 className="text-base font-extrabold tracking-tight text-neutral-900 font-sans">
            {orderId}
          </h2>
          <StatusBadge status={status} />
        </div>
        <p className="text-[11px] text-neutral-400 font-medium">
          Placed on {orderDate} | Payment Status: <span className="font-bold text-neutral-800">{paymentStatus}</span>
        </p>
      </div>

      {/* Selector & Actions */}
      <div className="flex items-center space-x-3 self-start md:self-auto">
        {/* Update status select dropdown */}
        <div className="flex flex-col space-y-0.5">
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Update Status</span>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as StatusType)}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Invoice action */}
        <button
          onClick={() => alert("Invoice printed (Mock Action)")}
          className="px-4 py-2 border border-neutral-200 rounded-full bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-750 flex items-center space-x-1.5 transition-colors cursor-pointer self-end"
        >
          <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Invoice</span>
        </button>
      </div>
    </div>
  );
}
