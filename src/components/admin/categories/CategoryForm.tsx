import React, { useState } from "react";
import { AdminCategory } from "@/types/admin";

interface CategoryFormProps {
  initialData?: AdminCategory | null;
  onSubmit: (data: Partial<AdminCategory>) => void;
  onCancel: () => void;
}

export default function CategoryForm({ initialData, onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<"Active" | "Draft" | "Hidden">(initialData?.status || "Active");
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder || 1);
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    // Auto slugify if not custom
    setSlug(val.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, ""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    if (!slug.trim()) {
      setError("Category slug is required");
      return;
    }

    onSubmit({
      id: initialData?.id,
      name,
      slug,
      description,
      status,
      displayOrder: Number(displayOrder) || 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
      <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
          {initialData ? "Edit Category" : "Add Category"}
        </h2>
        {initialData && (
          <span className="text-[10px] text-neutral-400 font-mono">({initialData.id})</span>
        )}
      </div>

      {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}

      {/* Name */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Category Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="e.g. Earrings, Pendant"
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850"
        />
      </div>

      {/* Slug */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Slug *
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g. earrings"
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Category catalog description..."
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Status */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "Active" | "Draft" | "Hidden")}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
          >
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>

        {/* Display Order */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Display Order
          </label>
          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850"
          />
        </div>
      </div>

      {/* Category Image Placeholder */}
      <div className="flex flex-col space-y-1 pt-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Category Image Banner
        </label>
        <div className="h-20 rounded border-2 border-dashed border-neutral-250 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center cursor-pointer transition-colors text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
          Click to upload preview image
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
          Save
        </button>
      </div>
    </form>
  );
}
