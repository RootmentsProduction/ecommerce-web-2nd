import React from "react";
import { StockTransaction } from "@/types/admin";

interface StockTransactionTableProps {
  transactions: StockTransaction[];
}

export default function StockTransactionTable({ transactions }: StockTransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
            <th className="py-4 px-6 font-semibold">Date & Time</th>
            <th className="py-4 px-6 font-semibold">Product</th>
            <th className="py-4 px-6 font-semibold">SKU</th>
            <th className="py-4 px-6 font-semibold">Variant</th>
            <th className="py-4 px-6 font-semibold">Transaction Type</th>
            <th className="py-4 px-6 font-semibold text-center">Change</th>
            <th className="py-4 px-6 font-semibold text-center">Before</th>
            <th className="py-4 px-6 font-semibold text-center">After</th>
            <th className="py-4 px-6 font-semibold">Reason</th>
            <th className="py-4 px-6 font-semibold">Reference</th>
            <th className="py-4 px-6 font-semibold">Changed By</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-xs text-neutral-700">
          {transactions.length > 0 ? (
            transactions.map((tx) => {
              const isPositive = tx.change.startsWith("+");
              const changeVal = parseInt(tx.change.replace(/[+-]/g, "")) || 0;
              
              let changeColorClass = "text-[#C62828] bg-red-50 border border-red-200/40";
              if (isPositive) {
                changeColorClass = "text-[#2E7D32] bg-green-50 border border-green-200/40";
              } else if (changeVal === 0) {
                changeColorClass = "text-neutral-500 bg-neutral-50 border border-neutral-200/40";
              }

              // Visual rules for transaction type badge
              let typeBadgeClass = "bg-neutral-100 text-neutral-600 border border-neutral-200/40";
              if (tx.transactionType === "Opening Stock") {
                typeBadgeClass = "bg-[#F3E5F5] text-[#7B1FA2] border border-[#E1BEE7]/40"; // distinct purple
              } else if (tx.transactionType === "Stock Added") {
                typeBadgeClass = "bg-[#FFF8E1] text-[#B78924] border border-[#FFE082]/40"; // gold/gray
              } else if (tx.transactionType === "Customer Sale" || tx.transactionType === "Customer Return") {
                typeBadgeClass = "bg-[#E3F2FD] text-[#1565C0] border border-[#BBDEFB]/40"; // blue/neutral
              } else if (tx.transactionType === "Damaged Item") {
                typeBadgeClass = "bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]/40"; // red/orange
              } else if (tx.transactionType === "Manual Correction") {
                typeBadgeClass = "bg-neutral-100 text-neutral-700 border border-neutral-300/40"; // gold/gray
              }

              // Badges for "Changed By"
              const isAuto = tx.isAutomatic || tx.changedBy.toLowerCase().includes("system");
              const changedByBadgeClass = isAuto
                ? "bg-blue-50 text-blue-700 border border-blue-200/30"
                : "bg-neutral-100 text-neutral-800 border border-neutral-300/40";

              return (
                <tr key={tx.id} className="hover:bg-neutral-50/40 transition-colors">
                  {/* Date & Time */}
                  <td className="py-4 px-6 text-neutral-400 font-medium whitespace-nowrap">{tx.date}</td>
                  
                  {/* Product */}
                  <td className="py-4 px-6 font-semibold text-neutral-800 whitespace-nowrap">{tx.productName}</td>

                  {/* SKU */}
                  <td className="py-4 px-6 text-neutral-900 font-bold font-mono">{tx.sku}</td>

                  {/* Variant */}
                  <td className="py-4 px-6 font-medium text-neutral-500 whitespace-nowrap">{tx.variant || "—"}</td>

                  {/* Transaction Type */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${typeBadgeClass}`}>
                      {tx.transactionType || "Adjustment"}
                    </span>
                  </td>

                  {/* Change */}
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${changeColorClass}`}>
                      {tx.change}
                    </span>
                  </td>

                  {/* Before */}
                  <td className="py-4 px-6 text-center text-neutral-500 font-semibold">{tx.before}</td>

                  {/* After */}
                  <td className="py-4 px-6 text-center text-neutral-850 font-bold">{tx.after}</td>

                  {/* Reason */}
                  <td className="py-4 px-6 text-neutral-600 font-normal whitespace-nowrap">{tx.reason}</td>

                  {/* Reference */}
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-neutral-700">{tx.reference}</span>
                  </td>

                  {/* Changed By */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${changedByBadgeClass}`}>
                      {tx.changedBy}
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={11} className="py-8 text-center text-neutral-400 font-medium">
                No stock transactions found matching the filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
