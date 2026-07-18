import React, { useEffect } from "react";
import { AdminProductFormData } from "@/types/admin";

interface ProductPricingProps {
  errors: Record<string, string>;
  formData: AdminProductFormData;
  onChange: (field: keyof AdminProductFormData, value: string | number | boolean) => void;
}

export default function ProductPricingSection({ errors, formData, onChange }: ProductPricingProps) {
  const isSellable = formData.isSellable !== false; // Default to true if not specified
  const mrpVal = parseFloat(formData.mrp) || 0;
  const sellingPriceVal = parseFloat(formData.sellingPrice) || 0;

  // Auto calculate discount percentage when MRP or Selling Price changes
  useEffect(() => {
    if (mrpVal > 0 && sellingPriceVal > 0) {
      if (sellingPriceVal <= mrpVal) {
        const discountAmount = mrpVal - sellingPriceVal;
        const discountPercent = Math.round((discountAmount / mrpVal) * 100);
        if (formData.discountPercent !== discountPercent) {
          onChange("discountPercent", discountPercent);
        }
      } else {
        if (formData.discountPercent !== 0) {
          onChange("discountPercent", 0);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.mrp, formData.sellingPrice]);

  const discountAmt = mrpVal > sellingPriceVal ? mrpVal - sellingPriceVal : 0;
  const discountPct = formData.discountPercent || 0;

  // Calculated taxes
  const taxPreference = formData.taxPreference || "Taxable";
  const taxRatePercent = taxPreference === "Exempt" ? 0 : parseFloat(formData.intraStateTaxRate || "3%") || 3;
  const calculatedTaxAmt = sellingPriceVal > 0 ? (sellingPriceVal * taxRatePercent) / 100 : 0;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
      <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-neutral-800 uppercase font-sans">
          Sales & Pricing Details
        </h2>
        
        {/* Sellable Toggle */}
        <label className="inline-flex items-center space-x-2 cursor-pointer text-xs font-semibold text-neutral-700">
          <input
            type="checkbox"
            checked={isSellable}
            onChange={(e) => onChange("isSellable", e.target.checked)}
            className="w-4 h-4 rounded border-neutral-300 text-[#C99213] focus:ring-[#C99213] accent-[#C99213]"
          />
          <span>Product is Sellable</span>
        </label>
      </div>

      {isSellable ? (
        <div className="space-y-5 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* MRP */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Maximum Retail Price (MRP) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-semibold text-neutral-400 pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  value={formData.mrp || ""}
                  onChange={(e) => onChange("mrp", e.target.value)}
                  placeholder="e.g. 5500"
                  className={`w-full pl-7 pr-3 py-2 border rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400 ${
                    errors.mrp ? "border-red-500" : "border-neutral-200"
                  }`}
                />
              </div>
              {errors.mrp && <span className="text-[10px] text-red-500">{errors.mrp}</span>}
            </div>

            {/* Selling Price */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Selling Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-semibold text-neutral-400 pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  value={formData.sellingPrice || ""}
                  onChange={(e) => onChange("sellingPrice", e.target.value)}
                  placeholder="e.g. 4500"
                  className={`w-full pl-7 pr-3 py-2 border rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400 ${
                    errors.sellingPrice ? "border-red-500" : "border-neutral-200"
                  }`}
                />
              </div>
              {errors.sellingPrice && <span className="text-[10px] text-red-500">{errors.sellingPrice}</span>}
            </div>

            {/* Offer Price */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Offer / Deal Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-semibold text-neutral-400 pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  value={formData.offerPrice || ""}
                  onChange={(e) => onChange("offerPrice", e.target.value)}
                  placeholder="e.g. 4300"
                  className="w-full pl-7 pr-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
                />
              </div>
            </div>

            {/* Tax Preference */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Tax Preference
              </label>
              <select
                value={formData.taxPreference || "Taxable"}
                onChange={(e) => onChange("taxPreference", e.target.value)}
                className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] transition-all text-neutral-850"
              >
                <option value="Taxable">Taxable</option>
                <option value="Exempt">Tax Exempt</option>
              </select>
            </div>

            {/* Intra-state Tax Rate */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Intra-state Tax (SGST+CGST)
              </label>
              <input
                type="text"
                value={formData.intraStateTaxRate || "3%"}
                onChange={(e) => onChange("intraStateTaxRate", e.target.value)}
                disabled={taxPreference === "Exempt"}
                placeholder="e.g. 3%"
                className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400 disabled:bg-neutral-50"
              />
            </div>

            {/* Inter-state Tax Rate */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Inter-state Tax (IGST)
              </label>
              <input
                type="text"
                value={formData.interStateTaxRate || "3%"}
                onChange={(e) => onChange("interStateTaxRate", e.target.value)}
                disabled={taxPreference === "Exempt"}
                placeholder="e.g. 3%"
                className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400 disabled:bg-neutral-50"
              />
            </div>

            {/* Price Includes GST toggle */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                GST Treatment
              </label>
              <div className="flex items-center space-x-4 pt-1">
                <label className="inline-flex items-center space-x-1.5 text-xs font-semibold text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.priceIncludesGst !== false}
                    onChange={() => onChange("priceIncludesGst", true)}
                    className="accent-[#C99213]"
                  />
                  <span>Includes GST</span>
                </label>
                <label className="inline-flex items-center space-x-1.5 text-xs font-semibold text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.priceIncludesGst === false}
                    onChange={() => onChange("priceIncludesGst", false)}
                    className="accent-[#C99213]"
                  />
                  <span>Excludes GST</span>
                </label>
              </div>
            </div>

            {/* Tax Category */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Tax Category
              </label>
              <select
                value={formData.taxCategory || "GST 3%"}
                onChange={(e) => onChange("taxCategory", e.target.value)}
                className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] transition-all text-neutral-850"
              >
                <option value="GST 3%">GST 3% (Standard Jewelry)</option>
                <option value="GST 5%">GST 5%</option>
                <option value="GST 18%">GST 18% (Services/Gifts)</option>
                <option value="Tax Free">Tax Free</option>
              </select>
            </div>
          </div>

          {/* Detailed Pricing Live Preview Panel */}
          <div className="bg-[#FBFBFB] border border-neutral-100 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-neutral-600">
            <div className="flex flex-col space-y-0.5">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400">MRP</span>
              <span className="text-sm font-bold text-neutral-900">₹{mrpVal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400">Selling Price</span>
              <span className="text-sm font-bold text-[#C99213]">₹{sellingPriceVal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400">Discount & Offer</span>
              <span className="text-sm font-bold text-[#2E7D32]">
                ₹{discountAmt.toLocaleString("en-IN")} ({discountPct}% Off)
              </span>
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400">Est. Tax Content ({taxPreference})</span>
              <span className="text-sm font-bold text-neutral-800">
                ₹{calculatedTaxAmt.toLocaleString("en-IN")} ({taxRatePercent}%)
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-6 text-center text-xs text-neutral-400 border border-dashed border-neutral-200 rounded-lg">
          This product is set as non-sellable. Catalog pages will hide price information and Add to Cart options.
        </div>
      )}
    </div>
  );
}
