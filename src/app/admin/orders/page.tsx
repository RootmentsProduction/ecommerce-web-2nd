"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminTabs from "@/components/admin/shared/AdminTabs";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { adminOrders } from "@/data/admin/orders";

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs = [{ label: "Dashboard" }];

  const tabs = [
    "All Orders",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returns",
  ];

  // Filter orders based on selected tab and search query
  const filteredOrders = adminOrders.filter((order) => {
    // Tab filter
    if (activeTab !== "All Orders") {
      if (activeTab === "Returns") {
        // Mock returns matching no items or specific status
        return false;
      }
      if (order.status.toLowerCase() !== activeTab.toLowerCase()) {
        return false;
      }
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.productName.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Top Header Bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={true}
        searchPlaceholder="Search anything..."
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Page Title & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              ORDERS
            </h1>
            <p className="text-[11px] text-neutral-400 mt-1 font-medium">
              Manage all customer orders
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Export Button */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-neutral-200 rounded-full bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export</span>
            </button>

            {/* Create Order Button */}
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer">
              <span className="text-[#C99213] font-bold text-sm leading-none">+</span>
              <span>Create Order</span>
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
                  <th className="py-4 px-6 font-semibold">ORDER ID</th>
                  <th className="py-4 px-6 font-semibold">CUSTOMER</th>
                  <th className="py-4 px-6 font-semibold">PRODUCT</th>
                  <th className="py-4 px-6 font-semibold">VALUE</th>
                  <th className="py-4 px-6 font-semibold">STATUS</th>
                  <th className="py-4 px-6 font-semibold">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, idx) => {
                    const urlId = order.id.replace("#", "").trim();
                    return (
                      <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                        {/* Order ID */}
                        <td className="py-4 px-6 text-xs font-bold text-[#C99213] cursor-pointer hover:underline">
                          <Link href={`/admin/orders/${urlId}`}>
                            {order.id}
                          </Link>
                        </td>

                        {/* Customer Name */}
                        <td className="py-4 px-6 text-xs font-medium text-neutral-800">
                          {order.customerName}
                        </td>

                        {/* Product details */}
                      <td className="py-4 px-6 text-xs text-neutral-500 font-medium">
                        {order.productName}
                      </td>

                      {/* Order Value */}
                      <td className="py-4 px-6 text-xs font-semibold text-neutral-900">
                        {order.value}
                      </td>

                      {/* Status badge */}
                      <td className="py-4 px-6">
                        <StatusBadge status={order.status} />
                      </td>

                      {/* Order Date */}
                      <td className="py-4 px-6 text-xs text-neutral-400 font-medium">
                        {order.date}
                      </td>
                    </tr>
                  );
                })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-xs text-neutral-400 font-medium">
                      No orders found matching the filter.
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
