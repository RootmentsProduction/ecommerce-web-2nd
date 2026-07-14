import React, { useState } from "react";
import { AdminProductFormData, StockAdjustment } from "@/types/admin";

interface StockAdjustmentProps {
  product: AdminProductFormData;
  onSubmit: (data: StockAdjustment & { variantName?: string; newStock: number }) => void;
  onCancel: () => void;
}

export default function StockAdjustmentForm({ product, onSubmit, onCancel }: StockAdjustmentProps) {
  const hasVariants = product.variants && product.variants.length > 0;
  const minRequired = product.minStock;
  
  const [variantId, setVariantId] = useState(
    hasVariants && product.variants.length === 1 ? product.variants[0].id : ""
  );
  const [adjustmentType, setAdjustmentType] = useState<
    "Add Stock" | "Remove Stock" | "Set Exact Quantity" | "Damaged Item" | "Returned Item" | "Manual Correction"
  >("Add Stock");
  const [quantity, setQuantity] = useState<number>(0);
  const [reason, setReason] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
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
  if (adjustmentType === "Add Stock" || adjustmentType === "Returned Item") {
    newStock = currentStock + quantity;
  } else if (adjustmentType === "Remove Stock" || adjustmentType === "Damaged Item") {
    newStock = currentStock - quantity;
  } else if (adjustmentType === "Set Exact Quantity") {
    newStock = quantity;
  } else if (adjustmentType === "Manual Correction") {
    newStock = quantity; // or adjustments, let's treat exact correction
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    
    if (hasVariants && !variantId) {
      errs.variantId = "Please select a product variant";
    }

    if (quantity < 0) {
      errs.quantity = "Quantity cannot be negative";
    } else if (quantity === 0 && adjustmentType !== "Set Exact Quantity") {
      errs.quantity = "Please specify an adjustment quantity greater than 0";
    }

    if (newStock < 0) {
      errs.quantity = `Adjustment creates negative stock (${newStock}). Minimum stock allowed is 0.`;
    }

    if (!reason.trim()) {
      errs.reason = "Reason for adjustment is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      productId: product.sku,
      variantId,
      variantName: selectedVariant?.name,
      adjustmentType,
      quantity,
      newStock,
      reason,
      referenceNumber,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
      <div className="border-b border-neutral-100 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
          Stock Adjustment Form
        </h2>
      </div>

      {/* Selected Product overview */}
      <div className="bg-[#FBFBFB] border border-neutral-100 rounded-lg p-3 flex justify-between items-center text-xs">
        <div>
          <span className="text-[9px] text-neutral-400 font-bold uppercase block">Product Name</span>
          <span className="font-semibold text-neutral-800">{product.name}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-neutral-400 font-bold uppercase block">Current Total Stock</span>
          <span className="font-bold text-neutral-900">{product.initialStock} units</span>
        </div>
      </div>

      {/* Variant Selector if applicable */}
      {hasVariants && (
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Select Variant *
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
                {v.name} (Stock: {v.stock} units)
              </option>
            ))}
          </select>
          {errors.variantId && <span className="text-[9px] text-red-500">{errors.variantId}</span>}
        </div>
      )}

      {/* Adjustment Type */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Adjustment Type
        </label>
        <select
          value={adjustmentType}
          onChange={(e) => setAdjustmentType(e.target.value as "Add Stock" | "Remove Stock" | "Set Exact Quantity" | "Damaged Item" | "Returned Item" | "Manual Correction")}
          className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
        >
          <option value="Add Stock">Add Stock (+)</option>
          <option value="Remove Stock">Remove Stock (-)</option>
          <option value="Set Exact Quantity">Set Exact Quantity (=)</option>
          <option value="Damaged Item">Damaged Item / Write-off (-)</option>
          <option value="Returned Item">Customer Return (+)</option>
          <option value="Manual Correction">Manual Correction</option>
        </select>
      </div>

      {/* Quantity */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Quantity *
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
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Reason for Adjustment *
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
          placeholder="e.g. Audit correction, supplier arrival"
          className={`px-3 py-2 border rounded text-xs outline-none focus:border-[#C99213] text-neutral-850 placeholder-neutral-400 ${
            errors.reason ? "border-red-500" : "border-neutral-200"
          }`}
        />
        {errors.reason && <span className="text-[9px] text-red-500">{errors.reason}</span>}
      </div>

      {/* Reference Number */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Reference Number (PO / Order)
        </label>
        <input
          type="text"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          placeholder="e.g. PO-105"
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850 placeholder-neutral-400"
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Internal Notes
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes for other inventory managers..."
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850 placeholder-neutral-400"
        />
      </div>

      {/* Live Preview Panel */}
      <div className="bg-neutral-50 rounded-lg p-3 text-xs font-semibold text-neutral-700 space-y-1 border border-neutral-200">
        <div className="flex justify-between">
          <span>Current Stock:</span>
          <span>{currentStock} units</span>
        </div>
        <div className="flex justify-between text-neutral-900 border-b border-neutral-200 pb-1.5 mb-1.5">
          <span>Adjustment Type:</span>
          <span className="font-bold text-[#C99213]">{adjustmentType}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-neutral-900">
          <span>New Stock Preview:</span>
          <span className={newStock < minRequired ? "text-[#C62828]" : "text-[#2E7D32]"}>
            {newStock} units
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-3 border-t border-neutral-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 border border-neutral-300 rounded-full text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
        >
          Confirm Adjustment
        </button>
      </div>
    </form>
  );
}
