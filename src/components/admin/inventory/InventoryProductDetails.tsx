import React from "react";
import { AdminProductFormData } from "@/types/admin";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface InventoryProductDetailsProps {
  product: AdminProductFormData;
}

export default function InventoryProductDetails({ product }: InventoryProductDetailsProps) {
  const currentStock = product.initialStock;
  const minRequired = product.minStock;
  const isLowStock = currentStock < minRequired && currentStock > 0;
  const isOutOfStock = currentStock === 0;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
      {/* Product profile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-5 gap-4">
        {/* Image thumbnail placeholder */}
        <div className="w-16 h-16 rounded-lg bg-gradient-to-tr from-[#f4efdb] via-[#e8dbb4] to-[#c59b27]/40 border border-[#e8dbb4] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          {product.media?.find((m) => m.isPrimary)?.url ? (
            <img
              src={product.media.find((m) => m.isPrimary)!.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-8 h-8 text-[#8c6a16]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="14" r="5" />
              <path d="M12 9V3m-3 2h6" />
            </svg>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2.5 flex-wrap gap-1">
            <h2 className="text-sm font-bold tracking-wide text-neutral-900 uppercase font-sans">
              {product.name}
            </h2>
            <StatusBadge status={product.status as "Active" | "Draft"} />
          </div>
          <p className="text-[10px] text-neutral-400 font-semibold font-mono uppercase">
            SKU: {product.sku} | Category: {product.category}
          </p>
        </div>
      </div>

      {/* Critical Stock Alert warnings */}
      {isOutOfStock && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-xs text-red-800">
            <span className="font-bold">CRITICAL: Product is Out of Stock.</span> Customers cannot purchase this item unless backorders are enabled in visibility settings.
          </div>
        </div>
      )}

      {isLowStock && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-xs text-amber-800">
            <span className="font-bold">WARNING: Low Stock Level.</span> Current count of {currentStock} units is below the alert threshold of {minRequired} units. Reordering is recommended.
          </div>
        </div>
      )}

      {/* Info specs */}
      <div className="grid grid-cols-2 gap-4 text-xs pt-2">
        <div className="flex flex-col space-y-0.5">
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Metal / Material</span>
          <span className="font-semibold text-neutral-800">{product.material}</span>
        </div>
        <div className="flex flex-col space-y-0.5">
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Replenishment Target</span>
          <span className="font-semibold text-neutral-800">{minRequired * 3} units</span>
        </div>
      </div>
    </div>
  );
}
