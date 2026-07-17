import React, { useState } from "react";
import Link from "next/link";
import { AdminProductVariant, StatusType } from "@/types/admin";

interface ProductVariantsProps {
  variants: AdminProductVariant[];
  onChange: (variants: AdminProductVariant[]) => void;
  basePrice: string;
  baseSku: string;
  productId?: string;
  mode: "create" | "edit";
}

export default function ProductVariantsSection({ variants, onChange, basePrice, baseSku, productId, mode }: ProductVariantsProps) {
  const [optionName, setOptionName] = useState("");
  const [optionValues, setOptionValues] = useState("");

  const handleAddVariants = () => {
    if (!optionName || !optionValues) return;

    const values = optionValues.split(",").map((v) => v.trim()).filter(Boolean);
    const newVariants: AdminProductVariant[] = [...variants];

    values.forEach((val) => {
      const variantName = `${optionName}: ${val}`;
      // Prevent duplicates
      if (!newVariants.some((v) => v.name === variantName)) {
        const skuSuffix = val.toUpperCase().replace(/[^A-Z0-9]/g, "");
        newVariants.push({
          id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: variantName,
          sku: `${baseSku || "SKU"}-${skuSuffix}`,
          price: basePrice || "0",
          stock: 10,
          status: "Active",
        });
      }
    });

    onChange(newVariants);
    setOptionName("");
    setOptionValues("");
  };

  const handleRowChange = (id: string, field: keyof AdminProductVariant, value: string | number | boolean) => {
    const updated = variants.map((v) => {
      if (v.id === id) {
        return { ...v, [field]: value };
      }
      return v;
    });
    onChange(updated);
  };

  const removeVariant = (id: string) => {
    const filtered = variants.filter((v) => v.id !== id);
    onChange(filtered);
  };

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
      <div className="border-b border-neutral-100 pb-3">
        <h2 className="text-sm font-bold tracking-wide text-neutral-800 uppercase font-sans">
          Product Variants
        </h2>
        <p className="text-[10px] text-neutral-400 mt-0.5">
          Define multiple attributes such as Ring Size, Necklace Length, or Metal color.
        </p>
      </div>

      {/* Option Setup Row */}
      <div className="bg-[#FBFBFB] border border-neutral-100 rounded-lg p-4 flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1 flex flex-col space-y-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Option Name</span>
          <input
            type="text"
            placeholder="e.g. Size, Metal, Length"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
          />
        </div>
        <div className="flex-2 flex flex-col space-y-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Values (Comma Separated)</span>
          <input
            type="text"
            placeholder="e.g. 16 inch, 18 inch, 20 inch"
            value={optionValues}
            onChange={(e) => setOptionValues(e.target.value)}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
          />
        </div>
        <button
          type="button"
          onClick={handleAddVariants}
          disabled={!optionName || !optionValues}
          className="px-5 py-2.5 bg-neutral-900 text-white rounded text-xs font-semibold hover:bg-neutral-850 disabled:opacity-50 transition-colors cursor-pointer self-start md:self-auto"
        >
          Add Variant Option
        </button>
      </div>

      {/* Variants Table */}
      {variants.length > 0 ? (
        <div className="overflow-x-auto border border-neutral-100 rounded-lg">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                <th className="py-2.5 px-4">Variant Name</th>
                <th className="py-2.5 px-4">SKU</th>
                <th className="py-2.5 px-4">Price (₹)</th>
                <th className="py-2.5 px-4">Opening/Current Stock</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-center">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {variants.map((variant) => (
                <tr key={variant.id} className="hover:bg-neutral-50/50 transition-colors">
                  {/* Name */}
                  <td className="py-2.5 px-4 font-semibold text-neutral-800">{variant.name}</td>

                  {/* SKU */}
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => handleRowChange(variant.id, "sku", e.target.value)}
                      className="px-2 py-1 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] w-28 bg-white"
                    />
                  </td>

                  {/* Price */}
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handleRowChange(variant.id, "price", e.target.value)}
                      className="px-2 py-1 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] w-24 bg-white"
                    />
                  </td>

                  {/* Stock */}
                  <td className="py-2 px-2">
                    {mode === "create" ? (
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => {
                          const stock = parseInt(e.target.value) || 0;
                          handleRowChange(variant.id, "stock", stock);
                          if (stock === 0) {
                            handleRowChange(variant.id, "status", "Out of Stock");
                          } else if (stock < 5) {
                            handleRowChange(variant.id, "status", "Low Stock");
                          } else {
                            handleRowChange(variant.id, "status", "Active");
                          }
                        }}
                        className="px-2 py-1 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] w-20 bg-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-xs font-semibold px-2 py-1 text-neutral-800">
                        <span>{variant.stock} units</span>
                        <Link
                          href={`/admin/inventory/${productId || baseSku}/adjust?variant=${variant.id}`}
                          className="text-[#C99213] hover:underline font-bold text-[9px] uppercase"
                        >
                          Adjust
                        </Link>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-2 px-2">
                    <select
                      value={variant.status}
                      onChange={(e) => handleRowChange(variant.id, "status", e.target.value as StatusType)}
                      className="px-2 py-1 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] w-28"
                    >
                      <option value="Active">Active</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </td>

                  {/* Action */}
                  <td className="py-2 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm cursor-pointer px-2"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-neutral-450 border border-dashed border-neutral-200 rounded-lg">
          No variants defined. This product will be listed as a single default item.
        </div>
      )}
    </div>
  );
}
