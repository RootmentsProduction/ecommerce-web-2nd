import React, { useState } from "react";
import { AdminProductFormData, StockAdjustment } from "@/types/admin";

interface StockAdjustmentProps {
  product: AdminProductFormData;
  initialVariantId?: string;
  onSubmit: (data: StockAdjustment & { variantName?: string; newStock: number; vendor?: string; invoiceNumber?: string }) => void;
  onCancel: () => void;
}

export default function StockAdjustmentForm({ product, initialVariantId, onSubmit, onCancel }: StockAdjustmentProps) {
  const hasVariants = product.variants && product.variants.length > 0;
  const minRequired = product.minStock;
  
  const [variantId, setVariantId] = useState(
    initialVariantId || (hasVariants && product.variants.length === 1 ? product.variants[0].id : "")
  );
  const [adjustmentType, setAdjustmentType] = useState<
    "Add Stock" | "Remove Stock" | "Set Exact Quantity" | "Damaged Item" | "Returned Item" | "Manual Correction"
  >("Add Stock");
  const [quantity, setQuantity] = useState<number>(0);
  const [reason, setReason] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  
  // New specific fields
  const [vendor, setVendor] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [exactConfirm, setExactConfirm] = useState(false);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Selected variant details
  const selectedVariant = hasVariants
    ? product.variants.find((v) => v.id === variantId)
    : null;

  // Current stock context
  const currentStock = hasVariants
    ? selectedVariant
      ? selectedVariant.stock
      : 0
    : product.initialStock;

  // Live calculation of new stock
  let newStock = currentStock;
  let adjustmentDisplay = "";

  if (adjustmentType === "Add Stock" || adjustmentType === "Returned Item") {
    newStock = currentStock + quantity;
    adjustmentDisplay = `+${quantity}`;
  } else if (adjustmentType === "Remove Stock" || adjustmentType === "Damaged Item") {
    newStock = currentStock - quantity;
    adjustmentDisplay = `-${quantity}`;
  } else if (adjustmentType === "Set Exact Quantity" || adjustmentType === "Manual Correction") {
    newStock = quantity;
    const difference = quantity - currentStock;
    adjustmentDisplay = difference >= 0 ? `+${difference} (Override)` : `${difference} (Override)`;
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    
    if (hasVariants && !variantId) {
      errs.variantId = "Please select a product variant";
    }

    if (quantity <= 0 && adjustmentType !== "Set Exact Quantity") {
      errs.quantity = "Quantity must be greater than 0";
    }

    if (newStock < 0) {
      errs.quantity = `Adjustment results in negative stock (${newStock}). Minimum allowed is 0.`;
    }

    if (!reason.trim()) {
      errs.reason = "Reason for adjustment is required";
    }

    if (adjustmentType === "Set Exact Quantity" && !exactConfirm) {
      errs.exactConfirm = "You must confirm overwriting the exact stock level";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Map 'Returned Item' selection back to the unified type
    const typeMapped = adjustmentType === "Returned Item" ? "Returned Item" : adjustmentType;

    onSubmit({
      productId: product.sku,
      variantId,
      variantName: selectedVariant?.name,
      adjustmentType: typeMapped as "Add Stock" | "Remove Stock" | "Set Exact Quantity" | "Damaged Item" | "Returned Item" | "Manual Correction",
      quantity,
      newStock,
      reason,
      referenceNumber,
      notes,
      vendor: adjustmentType === "Add Stock" ? vendor : undefined,
      invoiceNumber: adjustmentType === "Add Stock" ? invoiceNumber : undefined,
    });
  };

  // Determine helper placeholders for reference number
  let refLabel = "Reference Number (PO / Order)";
  let refPlaceholder = "e.g. PO-105 or ORD-992";
  if (adjustmentType === "Returned Item") {
    refLabel = "Customer Order Reference";
    refPlaceholder = "e.g. ORD-1042";
  } else if (adjustmentType === "Damaged Item") {
    refLabel = "Damage / Write-off Ticket ID";
    refPlaceholder = "e.g. DMG-08";
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
      <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
            Stock Adjustment Details
          </h2>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            Audit manual modifications, damages, replenishments or return requests.
          </p>
        </div>
      </div>

      {/* Selected Product overview card */}
      <div className="bg-[#FBFBFB] border border-neutral-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-[#f4efdb] via-[#e8dbb4] to-[#c59b27]/40 border border-[#e8dbb4] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            <svg className="w-5 h-5 text-[#8c6a16]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="14" r="5" />
              <path d="M12 9V3m-3 2h6" />
            </svg>
          </div>
          <div>
            <span className="text-[9px] text-neutral-400 font-bold uppercase block">Product Name / SKU</span>
            <span className="font-semibold text-neutral-800">{product.name} ({product.sku})</span>
            <span className="text-[10px] text-neutral-450 block font-light">Category: {product.category}</span>
          </div>
        </div>
        <div className="sm:text-right">
          <span className="text-[9px] text-neutral-400 font-bold uppercase block">Base Product Stock</span>
          <span className="font-bold text-neutral-900">{product.initialStock} units (Threshold: {product.minStock})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Variant Selector */}
        {hasVariants && (
          <div className="flex flex-col space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Select Variant <span className="text-red-500">*</span>
            </label>
            <select
              value={variantId}
              onChange={(e) => {
                setVariantId(e.target.value);
                if (errors.variantId) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.variantId;
                    return copy;
                  });
                }
              }}
              className={`px-3 py-2 border rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850 ${
                errors.variantId ? "border-red-500" : "border-neutral-200"
              }`}
            >
              <option value="">Choose a Variant...</option>
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} (Current Stock: {v.stock} units)
                </option>
              ))}
            </select>
            {errors.variantId && <span className="text-[9px] text-red-500">{errors.variantId}</span>}
          </div>
        )}

        {/* Adjustment Type */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
            Adjustment Type
          </label>
          <select
            value={adjustmentType}
            onChange={(e) => {
              setAdjustmentType(e.target.value as "Add Stock" | "Remove Stock" | "Set Exact Quantity" | "Damaged Item" | "Returned Item" | "Manual Correction");
              setExactConfirm(false);
            }}
            className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
          >
            <option value="Add Stock">Add Stock (+)</option>
            <option value="Remove Stock">Remove Stock (-)</option>
            <option value="Set Exact Quantity">Set Exact Quantity (=)</option>
            <option value="Damaged Item">Damaged Item (-)</option>
            <option value="Returned Item">Customer Return (+)</option>
            <option value="Manual Correction">Manual Correction</option>
          </select>
        </div>

        {/* Quantity */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
            {adjustmentType === "Set Exact Quantity" ? "Set New Exact Stock Quantity" : "Adjustment Quantity *"}
          </label>
          <input
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value) || 0);
              if (errors.quantity) {
                setErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.quantity;
                  return copy;
                });
              }
            }}
            className={`px-3 py-2 border rounded text-xs outline-none focus:border-[#C99213] text-neutral-850 ${
              errors.quantity ? "border-red-500" : "border-neutral-200"
            }`}
          />
          {errors.quantity && <span className="text-[9px] text-red-500">{errors.quantity}</span>}
        </div>

        {/* Reason */}
        <div className="flex flex-col space-y-1.5 md:col-span-2">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
            Reason for Adjustment <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (errors.reason) {
                setErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.reason;
                  return copy;
                });
              }
            }}
            placeholder="e.g. Supplier delivery arrival, quarterly audit audit correction, etc."
            className={`px-3 py-2 border rounded text-xs outline-none focus:border-[#C99213] text-neutral-850 placeholder-neutral-400 ${
              errors.reason ? "border-red-500" : "border-neutral-200"
            }`}
          />
          {errors.reason && <span className="text-[9px] text-red-500">{errors.reason}</span>}
        </div>

        {/* Reference ID (label changes dynamically) */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
            {refLabel}
          </label>
          <input
            type="text"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder={refPlaceholder}
            className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850 placeholder-neutral-400"
          />
        </div>

        {/* Dynamic Fields for ADD STOCK */}
        {adjustmentType === "Add Stock" && (
          <>
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                Supplier / Vendor Name
              </label>
              <input
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="e.g. Heritage Gold Refiners"
                className="px-3 py-2 border border-[#C99213] rounded text-xs outline-none focus:border-[#C99213] bg-[#FFFDF6] text-neutral-850 placeholder-neutral-400"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                Purchase Invoice Number
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="e.g. INV-99382"
                className="px-3 py-2 border border-[#C99213] rounded text-xs outline-none focus:border-[#C99213] bg-[#FFFDF6] text-neutral-850 placeholder-neutral-400"
              />
            </div>
          </>
        )}
      </div>

      {/* Warning for Set Exact Quantity */}
      {adjustmentType === "Set Exact Quantity" && (
        <div className="bg-[#FFF3E0] border border-[#FFE0B2] p-4 rounded-lg space-y-2.5">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-[#E65100] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-xs text-[#E65100] font-semibold">
              Warning: Overriding Stock
              <p className="font-normal text-[#F57C00] mt-0.5 leading-normal">
                Setting the exact quantity manually overrides previous stock counts and logs a correction. This is audit-logged and cannot be undone.
              </p>
            </div>
          </div>
          <label className="inline-flex items-center space-x-2 cursor-pointer text-xs text-[#E65100] font-bold">
            <input
              type="checkbox"
              checked={exactConfirm}
              onChange={(e) => {
                setExactConfirm(e.target.checked);
                if (errors.exactConfirm) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.exactConfirm;
                    return copy;
                  });
                }
              }}
              className="w-4 h-4 rounded border-[#FFE0B2] text-[#E65100] focus:ring-[#E65100] accent-[#E65100]"
            />
            <span>I confirm that this is a verified physical stock override.</span>
          </label>
          {errors.exactConfirm && <p className="text-[10px] text-red-500 font-semibold">{errors.exactConfirm}</p>}
        </div>
      )}

      {/* Internal Notes */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Internal Notes
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter additional audit notes regarding this adjustment..."
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850 placeholder-neutral-400"
        />
      </div>

      {/* Live Calculation Preview Card */}
      <div className="bg-neutral-900 text-white rounded-lg p-4 flex justify-between items-center text-xs shadow-md border border-neutral-800">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-neutral-450 font-bold block">Current Stock</span>
          <span className="text-sm font-bold">{currentStock} units</span>
        </div>
        <div className="text-center">
          <span className="text-[9px] uppercase tracking-wider text-neutral-450 font-bold block">Adjustment</span>
          <span className={`text-sm font-extrabold ${adjustmentDisplay.startsWith("+") ? "text-green-400" : adjustmentDisplay.startsWith("-") ? "text-red-400" : "text-[#C99213]"}`}>
            {adjustmentDisplay || "0"}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-wider text-neutral-450 font-bold block">New Stock Preview</span>
          <span className={`text-base font-extrabold ${newStock <= minRequired ? "text-orange-400" : "text-green-400"}`}>
            {newStock} units
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-3 border-t border-neutral-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-neutral-300 rounded-full text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-colors"
        >
          Confirm Adjustment
        </button>
      </div>
    </form>
  );
}
