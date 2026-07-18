"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminTabs from "@/components/admin/shared/AdminTabs";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminStatCard from "@/components/admin/shared/AdminStatCard";
import { getInventoryItems } from "@/services/inventory.service";
import { AdminInventoryItem, StatusType } from "@/types/admin";

export default function AdminInventoryPage() {
  const [inventoryList, setInventoryList] = useState<AdminInventoryItem[]>([]);
  const [activeTab, setActiveTab] = useState("All Inventories");
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs = [{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Inventory" }];

  const tabs = ["All Inventories", "Low Stock", "Out Of Stock"];

  React.useEffect(() => {
    getInventoryItems().then(setInventoryList);
  }, []);

  // Mock stats based on current inventory list
  const totalProductsCount = inventoryList.length;
  const inStockCount = inventoryList.filter((i) => i.currentStock > i.minRequired).length;
  const lowStockCount = inventoryList.filter((i) => i.currentStock > 0 && i.currentStock <= i.minRequired).length;
  const outOfStockCount = inventoryList.filter((i) => i.currentStock === 0).length;

  const inventoryStats = [
    {
      title: "TOTAL PRODUCTS",
      value: totalProductsCount.toString(),
      subNote: "Tracked catalog depth",
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "IN STOCK",
      value: inStockCount.toString(),
      subNote: "Healthy stock levels",
      icon: (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "LOW STOCK",
      value: lowStockCount.toString(),
      subNote: "Needs replenishment",
      icon: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      title: "OUT OF STOCK",
      value: outOfStockCount.toString(),
      subNote: "Sales disabled",
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "INCOMING",
      value: "15",
      subNote: "On purchase orders",
      icon: (
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125a1.125 1.125 0 001.125-1.125V9.75M8.25 18.75h6m-6 0H3.375m11.25 0V7.5H9.75v11.25M3.375 14.25h11.25m0 0V7.5M14.625 14.25h3.75m-3.75 0V9.75h3.75m-3.75-2.25h3.75" />
        </svg>
      ),
    },
  ];

  // Filter inventory items
  const filteredItems = inventoryList.filter((item) => {
    // Tab filter
    if (activeTab === "Low Stock") {
      if (item.currentStock === 0 || item.currentStock > item.minRequired) return false;
    }
    if (activeTab === "Out Of Stock") {
      if (item.currentStock !== 0) return false;
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.sku.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Header bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              INVENTORY
            </h1>
            <p className="text-[11px] text-neutral-450 mt-1 font-medium">
              Manage stock levels, reorder parameters, and write-offs
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <Link href="/admin/inventory/transactions" className="flex items-center space-x-2 px-4 py-2 border border-neutral-200 rounded-full bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer">
              <span>View Transactions</span>
            </Link>
            <Link href="/admin/inventory/SKU-001/adjust" className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer">
              <span className="text-[#C99213] font-bold text-sm leading-none">+</span>
              <span>Adjust Stock</span>
            </Link>
          </div>
        </div>

        {/* Inventory Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {inventoryStats.map((stat, idx) => (
            <AdminStatCard
              key={idx}
              title={stat.title}
              value={stat.value}
              subNote={stat.subNote}
              icon={stat.icon}
            />
          ))}
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
            {/* Search filter input */}
            <div className="relative py-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-3.5 h-3.5 text-neutral-450" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-8 pr-3 py-1 border border-neutral-200 rounded-full bg-[#F8F8F8] text-[11px] outline-none focus:border-[#C99213] focus:bg-white transition-all text-neutral-800 placeholder-neutral-400"
              />
            </div>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">SKU</th>
                  <th className="py-4 px-6 font-semibold">PRODUCT</th>
                  <th className="py-4 px-6 font-semibold">CATEGORY</th>
                  <th className="py-4 px-6 font-semibold">CURRENT STOCK</th>
                  <th className="py-4 px-6 font-semibold">MIN. REQ</th>
                  <th className="py-4 px-6 font-semibold">STATUS</th>
                  <th className="py-4 px-6 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredItems.map((item, idx) => {
                  const isStockCritical = item.currentStock === 0;
                  const isStockWarning = item.currentStock > 0 && item.currentStock <= item.minRequired;

                  let stockColorClass = "text-neutral-700";
                  let itemStatus: StatusType = "In Stock";
                  if (isStockCritical) {
                    stockColorClass = "text-[#C62828] font-bold";
                    itemStatus = "Out of Stock";
                  } else if (isStockWarning) {
                    stockColorClass = "text-[#E65100] font-bold";
                    itemStatus = "Low Stock";
                  }

                  const urlId = item.productId || item.sku.replace("#", "").trim();
                  return (
                    <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                      {/* SKU */}
                      <td className="py-4 px-6 text-xs font-bold text-[#C99213] cursor-pointer hover:underline">
                        <Link href={`/admin/inventory/${urlId}`}>
                          {item.sku}
                        </Link>
                      </td>

                      {/* Product Thumbnail + Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-[#f4efdb] via-[#e8dbb4] to-[#c59b27]/40 border border-[#e8dbb4] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                            <svg className="w-4 h-4 text-[#8c6a16]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <circle cx="12" cy="14" r="5" />
                              <path d="M12 9V3m-3 2h6" />
                            </svg>
                          </div>
                          <Link href={`/admin/inventory/${urlId}`} className="text-xs font-semibold text-neutral-800 whitespace-nowrap hover:text-[#C99213] hover:underline">
                            {item.name}
                          </Link>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 text-xs text-neutral-450 font-semibold whitespace-nowrap">
                        {item.category}
                      </td>

                      {/* Current Stock */}
                      <td className={`py-4 px-6 text-xs ${stockColorClass}`}>
                        {item.currentStock} units
                      </td>

                      {/* Min Required */}
                      <td className="py-4 px-6 text-xs font-semibold text-neutral-600">
                        {item.minRequired}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <StatusBadge status={itemStatus} />
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap text-xs font-semibold">
                        <Link href={`/admin/inventory/${urlId}`} className="text-neutral-500 hover:underline">
                          Details
                        </Link>
                        <Link href={`/admin/inventory/${urlId}/adjust`} className="text-[#C99213] hover:text-[#a9831e] hover:underline">
                          Adjust Stock
                        </Link>
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
