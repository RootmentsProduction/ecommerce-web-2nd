import React from "react";
import { AdminProductFormData } from "@/types/admin";

interface ProductInventoryProps {
  formData: AdminProductFormData;
  onChange: (field: keyof AdminProductFormData, value: string | number | boolean) => void;
}

export default function ProductInventorySection({ formData, onChange }: ProductInventoryProps) {
  const isTracking = formData.trackInventory;
  const initialStock = formData.initialStock || 0;
  const minStock = formData.minStock || 0;

  let stockStatus = "In Stock";
  let badgeColor = "bg-[#E8F5E9] text-[#2E7D32]";

  if (initialStock === 0) {
    stockStatus = "Out of Stock";
    badgeColor = "bg-[#FFEBEE] text-[#C62828]";
  } else if (initialStock < minStock) {
    stockStatus = "Low Stock";
    badgeColor = "bg-[#FFF3E0] text-[#E65100]";
  }

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
      <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
        <h2 className="text-sm font-bold tracking-wide text-neutral-800 uppercase font-sans">
          Inventory Settings
        </h2>
        {isTracking && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
            Status: {stockStatus}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-8">
        {/* Track Inventory Toggle */}
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Track Inventory
          </label>
          <div className="flex items-center space-x-4 pt-1">
            <label className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-700 cursor-pointer">
              <input
                type="radio"
                checked={isTracking === true}
                onChange={() => onChange("trackInventory", true)}
                className="accent-[#C99213]"
              />
              <span>Yes</span>
            </label>
            <label className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-700 cursor-pointer">
              <input
                type="radio"
                checked={isTracking === false}
                onChange={() => onChange("trackInventory", false)}
                className="accent-[#C99213]"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Allow backorders when out of stock */}
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Allow purchase when out of stock
          </label>
          <div className="flex items-center space-x-4 pt-1">
            <label className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-700 cursor-pointer">
              <input
                type="radio"
                checked={formData.allowBackorder === true}
                onChange={() => onChange("allowBackorder", true)}
                className="accent-[#C99213]"
              />
              <span>Yes</span>
            </label>
            <label className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-700 cursor-pointer">
              <input
                type="radio"
                checked={formData.allowBackorder === false}
                onChange={() => onChange("allowBackorder", false)}
                className="accent-[#C99213]"
              />
              <span>No</span>
            </label>
          </div>
        </div>
      </div>

      {isTracking && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Initial Stock */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              Initial Stock Quantity
            </label>
            <input
              type="number"
              value={formData.initialStock}
              onChange={(e) => onChange("initialStock", parseInt(e.target.value) || 0)}
              placeholder="e.g. 20"
              className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850"
            />
          </div>

          {/* Minimum Required Stock */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              Minimum Required Stock (Alert threshold)
            </label>
            <input
              type="number"
              value={formData.minStock}
              onChange={(e) => onChange("minStock", parseInt(e.target.value) || 0)}
              placeholder="e.g. 5"
              className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850"
            />
          </div>
        </div>
      )}
    </div>
  );
}
