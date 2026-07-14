"use client";

import React, { useState } from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import StockTransactionTable from "@/components/admin/inventory/StockTransactionTable";
import { adminInventoryTransactions } from "@/data/admin/inventory-transactions";

export default function AdminStockTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedReason, setSelectedReason] = useState("All Reasons");

  const breadcrumbs = [
    { label: "Inventory", href: "/admin/inventory" },
    { label: "Transactions" }
  ];

  // Filters
  const filteredTransactions = adminInventoryTransactions.filter((tx) => {
    // Search SKU / Name / Reference
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        tx.sku.toLowerCase().includes(q) ||
        tx.productName.toLowerCase().includes(q) ||
        tx.reference.toLowerCase().includes(q) ||
        tx.changedBy.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Type filter
    if (selectedType !== "All Types") {
      const isPositive = tx.change.startsWith("+");
      if (selectedType === "Addition" && !isPositive) return false;
      if (selectedType === "Deduction" && isPositive) return false;
    }

    // Reason filter
    if (selectedReason !== "All Reasons") {
      if (selectedReason === "Order" && !tx.reason.toLowerCase().includes("order")) return false;
      if (selectedReason === "Damage" && !tx.reason.toLowerCase().includes("damaged")) return false;
      if (selectedReason === "Return" && !tx.reason.toLowerCase().includes("return")) return false;
      if (selectedReason === "Restock" && !tx.reason.toLowerCase().includes("arrival") && !tx.reason.toLowerCase().includes("correction")) return false;
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
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
            STOCK TRANSACTIONS
          </h1>
          <p className="text-[11px] text-neutral-450 mt-1 font-medium">
            View all manual and automatic stock movements ledger
          </p>
        </div>

        {/* Filters Panel */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
          
          {/* Search SKU/Product */}
          <div className="flex-1 flex flex-col space-y-1">
            <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Search SKU / Product / Ref</span>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="SKU, Order ref, staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850"
              />
            </div>
          </div>

          {/* Type filter */}
          <div className="w-full md:w-44 flex flex-col space-y-1">
            <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Movement Type</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
            >
              <option value="All Types">All Movements</option>
              <option value="Addition">Stock Additions (+)</option>
              <option value="Deduction">Stock Deductions (-)</option>
            </select>
          </div>

          {/* Reason filter */}
          <div className="w-full md:w-44 flex flex-col space-y-1">
            <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Reason Categories</span>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
            >
              <option value="All Reasons">All Reasons</option>
              <option value="Order">Customer Orders</option>
              <option value="Return">Returns & Exchanges</option>
              <option value="Damage">Damage & Write-offs</option>
              <option value="Restock">Replenishments</option>
            </select>
          </div>

        </div>

        {/* Ledger Table */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden">
          <StockTransactionTable transactions={filteredTransactions} />
        </div>

      </div>
    </div>
  );
}
