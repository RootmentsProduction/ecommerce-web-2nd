import React from "react";
import { AdminProductFormData } from "@/types/admin";

interface ProductVisibilityProps {
  formData: AdminProductFormData;
  onChange: (field: keyof AdminProductFormData, value: string | number | boolean) => void;
}

export default function ProductVisibilitySection({ formData, onChange }: ProductVisibilityProps) {
  return (
    <div className="space-y-6">
      {/* Visibility & Badges Card */}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Featured Product */}
            <label className="inline-flex items-start space-x-2.5 text-xs font-semibold text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured || false}
                onChange={(e) => onChange("isFeatured", e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-[#C99213] focus:ring-[#C99213] accent-[#C99213]"
              />
              <div className="flex flex-col">
                <span>Featured Product</span>
                <span className="text-[9px] text-neutral-450 font-normal">Display in top banners & recommendations</span>
              </div>
            </label>

            {/* Show on Homepage */}
            <label className="inline-flex items-start space-x-2.5 text-xs font-semibold text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showOnHomepage || false}
                onChange={(e) => onChange("showOnHomepage", e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-[#C99213] focus:ring-[#C99213] accent-[#C99213]"
              />
              <div className="flex flex-col">
                <span>Show on Homepage</span>
                <span className="text-[9px] text-neutral-450 font-normal">Display in homepage sections</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Storefront Visibility Card */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
        <div className="border-b border-neutral-100 pb-3">
          <h2 className="text-sm font-bold tracking-wide text-neutral-800 uppercase font-sans">
            Storefront Visibility
          </h2>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            Configure where this product appears on the storefront homepage.
          </p>
        </div>

        <div className="space-y-4">
          {/* New Arrival Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-neutral-100 pb-3">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-neutral-700">Show in New Arrivals</span>
              <span className="text-[9px] text-neutral-450 font-normal">Display in the homepage New Arrivals section</span>
            </div>
            <button
              type="button"
              onClick={() => onChange("isNewArrival", !formData.isNewArrival)}
              className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                formData.isNewArrival ? 'bg-[#C99213]' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.isNewArrival ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Best Seller Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-neutral-700">Show in Best Sellers</span>
              <span className="text-[9px] text-neutral-450 font-normal">Display in the homepage Best Sellers section</span>
            </div>
            <button
              type="button"
              onClick={() => onChange("isBestSeller", !formData.isBestSeller)}
              className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                formData.isBestSeller ? 'bg-[#C99213]' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.isBestSeller ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* SEO Information Card */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
        <div className="border-b border-neutral-100 pb-3">
          <h2 className="text-sm font-bold tracking-wide text-neutral-800 uppercase font-sans">
            Search Engine Optimization (SEO)
          </h2>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            Optimize how this product appears on search engines like Google.
          </p>
        </div>

        <div className="space-y-4">
          {/* SEO Title */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              SEO Title
            </label>
            <input
              type="text"
              value={formData.seoTitle || ""}
              onChange={(e) => onChange("seoTitle", e.target.value)}
              placeholder="e.g. Premium Gold Chain Ring | Zorucci"
              className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
            />
          </div>

          {/* SEO Slug */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              SEO Slug / URL Handle
            </label>
            <input
              type="text"
              value={formData.seoSlug || ""}
              onChange={(e) => onChange("seoSlug", e.target.value)}
              placeholder="e.g. premium-gold-chain-ring"
              className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
            />
          </div>

          {/* SEO Description */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              SEO Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.seoDescription || ""}
              onChange={(e) => onChange("seoDescription", e.target.value)}
              placeholder="Summary for search results (under 160 characters)"
              className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
