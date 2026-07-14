import React from "react";
import { AdminProductFormData } from "@/types/admin";

interface ProductVisibilityProps {
  formData: AdminProductFormData;
  onChange: (field: keyof AdminProductFormData, value: string | number | boolean) => void;
}

export default function ProductVisibilitySection({ formData, onChange }: ProductVisibilityProps) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
      <div className="border-b border-neutral-100 pb-3">
        <h2 className="text-sm font-bold tracking-wide text-neutral-800 uppercase font-sans">
          Product Visibility & Catalog Placement
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Status selection */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Status
          </label>
          <select
            value={formData.status || "Draft"}
            onChange={(e) => onChange("status", e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] transition-all text-neutral-850"
          >
            <option value="Draft">Draft (Hidden from catalog)</option>
            <option value="Active">Active (Visible in catalog)</option>
          </select>
        </div>

        {/* Publish Date */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Publish Date
          </label>
          <input
            type="date"
            value={formData.publishDate || ""}
            onChange={(e) => onChange("publishDate", e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850"
          />
        </div>
      </div>

      {/* Catalog Badges toggles */}
      <div className="flex flex-col space-y-3 pt-2">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
          Promotional Placements
        </label>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Featured Product */}
          <label className="inline-flex items-center space-x-2.5 text-xs font-semibold text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured || false}
              onChange={(e) => onChange("isFeatured", e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-[#C99213] focus:ring-[#C99213] accent-[#C99213]"
            />
            <div className="flex flex-col">
              <span>Featured Product</span>
              <span className="text-[9px] text-neutral-450 font-normal">Display in top banners & recommendations</span>
            </div>
          </label>

          {/* New Arrival */}
          <label className="inline-flex items-center space-x-2.5 text-xs font-semibold text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isNewArrival || false}
              onChange={(e) => onChange("isNewArrival", e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-[#C99213] focus:ring-[#C99213] accent-[#C99213]"
            />
            <div className="flex flex-col">
              <span>New Arrival</span>
              <span className="text-[9px] text-neutral-450 font-normal">Add &quot;New&quot; tag overlay in storefront</span>
            </div>
          </label>

          {/* Best Seller */}
          <label className="inline-flex items-center space-x-2.5 text-xs font-semibold text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isBestSeller || false}
              onChange={(e) => onChange("isBestSeller", e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-[#C99213] focus:ring-[#C99213] accent-[#C99213]"
            />
            <div className="flex flex-col">
              <span>Best Seller</span>
              <span className="text-[9px] text-neutral-450 font-normal">Label as a top-selling collection item</span>
            </div>
          </label>

          {/* Show on Homepage */}
          <label className="inline-flex items-center space-x-2.5 text-xs font-semibold text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.showOnHomepage || false}
              onChange={(e) => onChange("showOnHomepage", e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-[#C99213] focus:ring-[#C99213] accent-[#C99213]"
            />
            <div className="flex flex-col">
              <span>Show on Homepage</span>
              <span className="text-[9px] text-neutral-450 font-normal">Display in homepage sections</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
