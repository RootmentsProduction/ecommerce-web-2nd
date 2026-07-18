import React from "react";
import { AdminProductFormData } from "@/types/admin";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductBasicInfoProps {
  errors: Record<string, string>;
  formData: AdminProductFormData;
  onChange: (field: keyof AdminProductFormData, value: string | number | boolean) => void;
  categories: CategoryOption[];
  categoriesLoading: boolean;
}

export default function ProductBasicInfoSection({ errors, formData, onChange, categories, categoriesLoading }: ProductBasicInfoProps) {
  // Generate slug dynamically from name if slug is empty
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    onChange("name", name);
    if (!formData.slug || formData.slug === slugify(formData.name)) {
      onChange("slug", slugify(name));
    }
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
      <div className="border-b border-neutral-100 pb-3">
        <h2 className="text-sm font-bold tracking-wide text-neutral-800 uppercase font-sans">
          Basic Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Product Name */}
        <div className="flex flex-col space-y-1.5 lg:col-span-2">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={handleNameChange}
            placeholder="e.g. Golden Chain Ring"
            className={`px-3 py-2 border rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400 ${
              errors.name ? "border-red-500" : "border-neutral-200"
            }`}
          />
          {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
        </div>

        {/* SKU */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            SKU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.sku || ""}
            onChange={(e) => onChange("sku", e.target.value)}
            placeholder="e.g. SKU-001"
            className={`px-3 py-2 border rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400 ${
              errors.sku ? "border-red-500" : "border-neutral-200"
            }`}
          />
          {errors.sku && <span className="text-[10px] text-red-500">{errors.sku}</span>}
        </div>

        {/* Slug */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.slug || ""}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="e.g. golden-chain-ring"
            className={`px-3 py-2 border rounded text-xs bg-neutral-50 outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400 ${
              errors.slug ? "border-red-500" : "border-neutral-200"
            }`}
          />
          {errors.slug && <span className="text-[10px] text-red-500">{errors.slug}</span>}
        </div>

        {/* Category */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category || ""}
            onChange={(e) => onChange("category", e.target.value)}
            disabled={categoriesLoading}
            className={`px-3 py-2 border rounded text-xs bg-white outline-none focus:border-[#C99213] transition-all text-neutral-850 disabled:opacity-60 ${
              errors.category ? "border-red-500" : "border-neutral-200"
            }`}
          >
            {categoriesLoading ? (
              <option value="">Loading categories…</option>
            ) : categories.length === 0 ? (
              <>
                <option value="">No categories available</option>
              </>
            ) : (
              <>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </>
            )}
          </select>
          {errors.category && <span className="text-[10px] text-red-500">{errors.category}</span>}
        </div>

        {/* Subcategory */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Subcategory
          </label>
          <input
            type="text"
            value={formData.subcategory || ""}
            onChange={(e) => onChange("subcategory", e.target.value)}
            placeholder="e.g. Bands, Studs"
            className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
          />
        </div>

        {/* Brand */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Brand
          </label>
          <input
            type="text"
            value={formData.brand || ""}
            onChange={(e) => onChange("brand", e.target.value)}
            placeholder="e.g. Zorucci Classic"
            className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
          />
        </div>

        {/* Collection */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Collection
          </label>
          <input
            type="text"
            value={formData.collection || ""}
            onChange={(e) => onChange("collection", e.target.value)}
            placeholder="e.g. Aurelia Collection"
            className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Gender
          </label>
          <select
            value={formData.gender || "Unisex"}
            onChange={(e) => onChange("gender", e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] transition-all text-neutral-850"
          >
            <option value="Unisex">Unisex</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        {/* Occasion */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Occasion
          </label>
          <select
            value={formData.occasion || "Everyday"}
            onChange={(e) => onChange("occasion", e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] transition-all text-neutral-850"
          >
            <option value="Everyday">Everyday</option>
            <option value="Bridal">Bridal</option>
            <option value="Casual">Casual</option>
            <option value="Party">Party</option>
          </select>
        </div>

        {/* Material */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Material
          </label>
          <select
            value={formData.material || "Gold"}
            onChange={(e) => onChange("material", e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] transition-all text-neutral-850"
          >
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
            <option value="Diamond">Diamond</option>
            <option value="Emerald">Emerald</option>
          </select>
        </div>

        {/* Purity */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Purity
          </label>
          <input
            type="text"
            value={formData.purity || ""}
            onChange={(e) => onChange("purity", e.target.value)}
            placeholder="e.g. 22kt (916) or 18kt"
            className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
          />
        </div>

        {/* HSN Code */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            HSN Code
          </label>
          <input
            type="text"
            value={formData.hsnCode || ""}
            onChange={(e) => onChange("hsnCode", e.target.value)}
            placeholder="e.g. 71131910"
            className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
          />
        </div>

        {/* Unit */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Unit
          </label>
          <input
            type="text"
            value={formData.unit || ""}
            onChange={(e) => onChange("unit", e.target.value)}
            placeholder="e.g. Pcs, Pair, Grams"
            className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
          />
        </div>

        {/* Size */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Size (Optional)
          </label>
          <input
            type="text"
            value={formData.size || ""}
            onChange={(e) => onChange("size", e.target.value)}
            placeholder="e.g. 12, 14, 16"
            className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
          />
        </div>

        {/* Returnable Item */}
        <div className="flex items-center space-x-2 pt-5">
          <input
            type="checkbox"
            id="isReturnable"
            checked={formData.isReturnable || false}
            onChange={(e) => onChange("isReturnable", e.target.checked)}
            className="w-4 h-4 rounded border-neutral-300 text-[#C99213] focus:ring-[#C99213] accent-[#C99213]"
          />
          <label htmlFor="isReturnable" className="text-xs font-semibold text-neutral-700 cursor-pointer">
            Returnable Item
          </label>
        </div>
      </div>

      {/* Short Description */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
          Short Description
        </label>
        <input
          type="text"
          value={formData.shortDescription || ""}
          onChange={(e) => onChange("shortDescription", e.target.value)}
          placeholder="Brief summary of the product (approx. 100 characters)"
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
        />
      </div>

      {/* Full Description */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
          Full Description
        </label>
        <textarea
          rows={5}
          value={formData.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Detailed description of the piece, stone clarity, styling recommendations..."
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
        />
      </div>
    </div>
  );
}
