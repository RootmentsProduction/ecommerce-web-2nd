"use client";

import React, { useState } from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminTabs from "@/components/admin/shared/AdminTabs";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { adminVendors } from "@/data/admin/vendors";

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState("All Inventories");
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs = [{ label: "Purchases" }];

  const tabs = ["All Inventories", "Low Stock", "Out Of Stock"];

  // Filter vendors
  const filteredVendors = adminVendors.filter((vendor) => {
    // Tab filter
    if (activeTab === "Low Stock" && vendor.status !== "Low Stock" && vendor.currentStock > 0) {
      return false;
    }
    if (activeTab === "Out Of Stock" && vendor.currentStock !== 0) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        vendor.name.toLowerCase().includes(q) ||
        vendor.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Top Header Bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Title and Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              VENDORS
            </h1>
          </div>

          <button className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer self-start sm:self-auto">
            <span className="text-[#C99213] font-bold text-sm leading-none">+</span>
            <span>Add Stock</span>
          </button>
        </div>

        {/* Content Container (Tabs + Table) */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
          {/* Tabs Filter */}
          <div className="px-6 border-b border-neutral-100 flex justify-between items-center flex-wrap gap-4">
            <AdminTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            {/* Search filter input inside body */}
            <div className="relative py-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-3.5 h-3.5 text-neutral-450" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-8 pr-3 py-1 border border-neutral-200 rounded-full bg-[#F8F8F8] text-[11px] outline-none focus:border-[#C99213] focus:bg-white transition-all text-neutral-850 placeholder-neutral-400"
              />
            </div>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">#</th>
                  <th className="py-4 px-6 font-semibold">PRODUCT</th>
                  <th className="py-4 px-6 font-semibold">CATEGORY</th>
                  <th className="py-4 px-6 font-semibold">CURRENT STOCK</th>
                  <th className="py-4 px-6 font-semibold">MIN. REQ</th>
                  <th className="py-4 px-6 font-semibold">STATUS</th>
                  <th className="py-4 px-6 font-semibold">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredVendors.map((vendor, idx) => {
                  const isStockCritical = vendor.currentStock === 0;
                  const isStockWarning = vendor.currentStock > 0 && vendor.currentStock < vendor.minRequired;

                  let stockColorClass = "text-neutral-700";
                  if (isStockCritical) {
                    stockColorClass = "text-[#C62828] font-bold";
                  } else if (isStockWarning) {
                    stockColorClass = "text-[#E65100] font-bold";
                  }

                  return (
                    <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                      {/* # (vendor ID or index) */}
                      <td className="py-4 px-6 text-xs text-neutral-400 font-semibold">
                        {vendor.id}
                      </td>

                      {/* Product (vendor name) */}
                      <td className="py-4 px-6 text-xs font-semibold text-neutral-800 whitespace-nowrap">
                        {vendor.name}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 text-xs text-neutral-455 font-semibold whitespace-nowrap">
                        {vendor.category}
                      </td>

                      {/* Current Stock */}
                      <td className={`py-4 px-6 text-xs ${stockColorClass}`}>
                        {vendor.currentStock}
                      </td>

                      {/* Min Required */}
                      <td className="py-4 px-6 text-xs font-semibold text-neutral-600">
                        {vendor.minRequired}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <StatusBadge status={vendor.status} />
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6">
                        <button className="text-xs font-bold text-[#C99213] hover:text-[#a9831e] flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-none p-0">
                          <span>Reorder</span>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
