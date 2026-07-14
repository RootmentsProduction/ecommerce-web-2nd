import React from "react";
import { StatusType } from "@/types/admin";

interface StatusBadgeProps {
  status: StatusType;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStyle = (type: StatusType) => {
    switch (type) {
      case "Delivered":
        return "bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]/40";
      case "Shipped":
        return "bg-[#F3E5F5] text-[#7B1FA2] border border-[#E1BEE7]/40";
      case "Pending":
        return "bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2]/40";
      case "Processing":
        return "bg-[#E3F2FD] text-[#1565C0] border border-[#BBDEFB]/40";
      case "Cancelled":
        return "bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]/40";
      case "Active":
        return "bg-white text-[#2E7D32] border border-[#81C784]";
      case "Low Stock":
        return "bg-white text-[#E65100] border border-[#FFB74D]";
      case "Out of Stock":
        return "bg-white text-[#C62828] border border-[#E57373]";
      case "Pending Payment":
        return "bg-[#FFF8E1] text-[#F57F17] border border-[#FFE082]/40";
      case "Confirmed":
        return "bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7]/40";
      case "Packed":
        return "bg-[#E0F2F1] text-[#00695C] border border-[#80CBC4]/40";
      case "Returned":
        return "bg-[#ECEFF1] text-[#37474F] border border-[#CFD8DC]/40";
      case "Draft":
        return "bg-[#F5F5F5] text-[#757575] border border-[#BDBDBD]/40";
      case "Hidden":
        return "bg-[#FAFAFA] text-[#9E9E9E] border border-[#E0E0E0]";
      case "Archived":
        return "bg-[#EEEEEE] text-[#424242] border border-[#BDBDBD]/30";
      default:
        return "bg-neutral-100 text-neutral-600 border border-neutral-200";
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${getStyle(status)}`}>
      {status}
    </span>
  );
}
