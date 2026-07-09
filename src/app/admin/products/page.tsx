"use client";

import React, { useState } from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminTabs from "@/components/admin/shared/AdminTabs";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { adminProducts } from "@/data/admin/products";

export default function AdminProductsPage() {
  const [activeTab, setActiveTab] = useState("All Orders"); // Matches order-like tabs from screenshot
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs = [{ label: "Products" }];

  const tabs = [
    "All Orders",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returns",
  ];

  // Filter products by search query
  const filteredProducts = adminProducts.filter((product) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        product.sku.toLowerCase().includes(q) ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Topbar (No search input here, since it is in the main body area in the screenshot) */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Page Title & Search + Add button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              PRODUCTS
            </h1>
            <p className="text-[11px] text-neutral-400 mt-1 font-medium">
              1,234 Total products in catalogue
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Input inside the body */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-neutral-450" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search Product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 pl-9 pr-4 py-2 border border-neutral-200 rounded-full bg-white text-xs outline-none focus:border-[#C99213] transition-all text-neutral-800 placeholder-neutral-400"
              />
            </div>

            {/* Add Product Button */}
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer">
              <span className="text-[#C99213] font-bold text-sm leading-none">+</span>
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Content Container (Tabs + Table) */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
          {/* Tabs Filter */}
          <div className="px-6 border-b border-neutral-100">
            <AdminTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">SKU</th>
                  <th className="py-4 px-6 font-semibold">PRODUCT</th>
                  <th className="py-4 px-6 font-semibold">CATEGORY</th>
                  <th className="py-4 px-6 font-semibold">PRICE</th>
                  <th className="py-4 px-6 font-semibold">STOCK</th>
                  <th className="py-4 px-6 font-semibold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                      {/* SKU */}
                      <td className="py-4 px-6 text-xs font-bold text-[#C99213] cursor-pointer hover:underline">
                        {product.sku}
                      </td>

                      {/* Product Thumbnail + Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          {/* Premium CSS gradient placeholder representing jewelry thumbnail */}
                          <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-[#f4efdb] via-[#e8dbb4] to-[#c59b27]/40 border border-[#e8dbb4] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                            <svg className="w-4 h-4 text-[#8c6a16]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <circle cx="12" cy="14" r="5" />
                              <path d="M12 9V3m-3 2h6" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 text-xs text-neutral-400 font-semibold whitespace-nowrap">
                        {product.category}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 text-xs font-bold text-neutral-900">
                        {product.price}
                      </td>

                      {/* Stock Level */}
                      <td className="py-4 px-6 text-xs font-semibold text-neutral-600">
                        {product.stock}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <StatusBadge status={product.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-xs text-neutral-400 font-medium">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
