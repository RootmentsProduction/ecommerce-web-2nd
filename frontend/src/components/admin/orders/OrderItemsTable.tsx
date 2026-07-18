import React from "react";
import { AdminOrderItem } from "@/types/admin";
import Link from "next/link";

interface OrderItemsProps {
  items: AdminOrderItem[];
}

export default function OrderItemsTable({ items }: OrderItemsProps) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-neutral-100">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
          Items Ordered ({items.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
              <th className="py-3.5 px-6 font-semibold">Product</th>
              <th className="py-3.5 px-6 font-semibold">SKU</th>
              <th className="py-3.5 px-6 font-semibold">Variant</th>
              <th className="py-3.5 px-6 font-semibold text-center">Qty</th>
              <th className="py-3.5 px-6 font-semibold text-right">Price</th>
              <th className="py-3.5 px-6 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-neutral-700">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/30 transition-colors">
                {/* Product with thumbnail */}
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#f4efdb] via-[#e8dbb4] to-[#c59b27]/30 border border-[#e8dbb4] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <svg className="w-4 h-4 text-[#8c6a16]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <circle cx="12" cy="14" r="5" />
                        <path d="M12 9V3m-3 2h6" />
                      </svg>
                    </div>
                    <Link
                      href={`/admin/products/${item.productId}`}
                      className="font-semibold text-neutral-850 hover:text-[#C99213] hover:underline whitespace-nowrap"
                    >
                      {item.productName}
                    </Link>
                  </div>
                </td>

                {/* SKU */}
                <td className="py-4 px-6 text-[#C99213] font-bold font-mono">{item.sku}</td>

                {/* Variant */}
                <td className="py-4 px-6 text-neutral-500 font-semibold">{item.variant || "—"}</td>

                {/* Qty */}
                <td className="py-4 px-6 text-center font-bold text-neutral-800">{item.quantity}</td>

                {/* Price */}
                <td className="py-4 px-6 text-right font-medium">{item.unitPrice}</td>

                {/* Total */}
                <td className="py-4 px-6 text-right font-bold text-neutral-900">{item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
