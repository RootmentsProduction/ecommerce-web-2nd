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
            <th className="py-4 px-6 font-semibold">Date</th>
            <th className="py-4 px-6 font-semibold">Product</th>
            <th className="py-4 px-6 font-semibold">SKU</th>
            <th className="py-4 px-6 font-semibold">Variant</th>
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

              return (
                <tr key={tx.id} className="hover:bg-neutral-50/40 transition-colors">
                  {/* Date */}
                  <td className="py-4 px-6 text-neutral-400 font-medium whitespace-nowrap">{tx.date}</td>
                  
                  {/* Product */}
                  <td className="py-4 px-6 font-semibold text-neutral-800 whitespace-nowrap">{tx.productName}</td>

                  {/* SKU */}
                  <td className="py-4 px-6 text-[#C99213] font-bold font-mono">{tx.sku}</td>

                  {/* Variant */}
                  <td className="py-4 px-6 font-medium text-neutral-500 whitespace-nowrap">{tx.variant || "—"}</td>

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
                    {tx.isAutomatic ? (
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/30 text-[9px] font-bold font-mono uppercase">
                        {tx.reference}
                      </span>
                    ) : (
                      <span className="font-mono font-bold text-neutral-700">{tx.reference}</span>
                    )}
                  </td>

                  {/* Changed By */}
                  <td className="py-4 px-6 text-neutral-500 font-medium whitespace-nowrap">{tx.changedBy}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10} className="py-8 text-center text-neutral-400 font-medium">
                No stock transactions found matching the filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
