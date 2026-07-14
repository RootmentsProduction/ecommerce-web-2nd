import React from "react";
import { AdminCategory } from "@/types/admin";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface CategoryTableProps {
  categories: AdminCategory[];
  onEdit: (cat: AdminCategory) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CategoryTable({ categories, onEdit, onToggleStatus, onDelete }: CategoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
            <th className="py-4 px-6 font-semibold">Category</th>
            <th className="py-4 px-6 font-semibold">Slug</th>
            <th className="py-4 px-6 font-semibold text-center">Product Count</th>
            <th className="py-4 px-6 font-semibold">Status</th>
            <th className="py-4 px-6 font-semibold text-center">Display Order</th>
            <th className="py-4 px-6 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-xs">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-neutral-50/50 transition-colors">
                {/* Category name & description */}
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-800">{cat.name}</span>
                    <span className="text-[10px] text-neutral-400 font-normal line-clamp-1">{cat.description}</span>
                  </div>
                </td>

                {/* Slug */}
                <td className="py-4 px-6 font-mono text-neutral-500">{cat.slug}</td>

                {/* Product Count */}
                <td className="py-4 px-6 text-center text-neutral-600 font-semibold">{cat.productCount}</td>

                {/* Status */}
                <td className="py-4 px-6">
                  <StatusBadge status={cat.status} />
                </td>

                {/* Display Order */}
                <td className="py-4 px-6 text-center font-medium text-neutral-700">{cat.displayOrder}</td>

                {/* Actions */}
                <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                  <button
                    onClick={() => onToggleStatus(cat.id)}
                    className="text-neutral-500 hover:text-neutral-900 font-semibold cursor-pointer text-[11px]"
                  >
                    {cat.status === "Active" ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => onEdit(cat)}
                    className="text-[#C99213] hover:text-[#a9831e] font-semibold cursor-pointer text-[11px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(cat.id)}
                    className="text-red-500 hover:text-red-700 font-semibold cursor-pointer text-[11px]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-8 text-center text-neutral-400 font-medium">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
