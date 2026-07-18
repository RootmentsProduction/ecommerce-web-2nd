import React from "react";

interface StockSummaryProps {
  currentStock: number;
  minRequired: number;
  availableStock: number;
  reservedStock: number;
  incomingStock: number;
}

export default function StockSummaryCard({
  currentStock,
  minRequired,
  availableStock,
  reservedStock,
  incomingStock,
}: StockSummaryProps) {
  const isLowStock = currentStock < minRequired && currentStock > 0;
  const isOutOfStock = currentStock === 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Current Stock */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow">
        <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase block">
          Current Stock
        </span>
        <div className="mt-3 flex items-baseline justify-between">
          <span className={`text-2xl font-bold font-sans ${
            isOutOfStock ? "text-red-650" : isLowStock ? "text-orange-600" : "text-neutral-900"
          }`}>
            {currentStock}
          </span>
          <span className="text-[10px] text-neutral-400 font-semibold uppercase">units</span>
        </div>
        <span className="text-[10px] text-neutral-400 mt-1 block">Total physical count</span>
      </div>

      {/* Available Stock */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow">
        <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase block">
          Available Stock
        </span>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-sans text-neutral-900">
            {availableStock}
          </span>
          <span className="text-[10px] text-neutral-400 font-semibold uppercase">units</span>
        </div>
        <span className="text-[10px] text-neutral-400 mt-1 block">Active on storefront</span>
      </div>

      {/* Reserved Stock */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow">
        <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase block">
          Reserved Stock
        </span>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-sans text-[#7B1FA2]">
            {reservedStock}
          </span>
          <span className="text-[10px] text-neutral-400 font-semibold uppercase">units</span>
        </div>
        <span className="text-[10px] text-neutral-400 mt-1 block">Committed in unpaid cart/orders</span>
      </div>

      {/* Incoming Stock */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow">
        <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase block">
          Incoming Stock
        </span>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-sans text-blue-600">
            {incomingStock}
          </span>
          <span className="text-[10px] text-neutral-400 font-semibold uppercase">units</span>
        </div>
        <span className="text-[10px] text-neutral-400 mt-1 block">Purchased order in transit</span>
      </div>
    </div>
  );
}
