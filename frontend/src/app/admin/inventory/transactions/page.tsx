"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import StockTransactionTable from "@/components/admin/inventory/StockTransactionTable";
import AdminStatCard from "@/components/admin/shared/AdminStatCard";
import { getStockTransactions } from "@/services/inventory.service";
import { StockTransaction } from "@/types/admin";

function TransactionsPageContent() {
  const searchParams = useSearchParams();
  const skuQuery = searchParams.get("sku") || "";

  const [transactions, setTransactions] = useState<StockTransaction[]>([]);
  const [searchQuery, setSearchQuery] = useState(skuQuery);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedReason, setSelectedReason] = useState("All Reasons");
  const [selectedChangedBy, setSelectedChangedBy] = useState("All Users");

  React.useEffect(() => {
    getStockTransactions().then(setTransactions);
  }, []);

  // Filters logic
  const filteredTransactions = transactions.filter((tx) => {
    // Search SKU / Name / Reference / Changed By
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
      if (tx.transactionType !== selectedType) return false;
    }

    // Reason filter
    if (selectedReason !== "All Reasons") {
      if (selectedReason === "Customer Order" && tx.transactionType !== "Customer Sale") return false;
      if (selectedReason === "Damage / Write-off" && tx.transactionType !== "Damaged Item") return false;
      if (selectedReason === "Returned Order" && tx.transactionType !== "Customer Return") return false;
      if (selectedReason === "Replenishment" && tx.transactionType !== "Stock Added") return false;
      if (selectedReason === "Opening Stock" && tx.transactionType !== "Opening Stock") return false;
    }

    // Changed By filter
    if (selectedChangedBy !== "All Users") {
      if (selectedChangedBy === "System" && !tx.changedBy.toLowerCase().includes("system")) return false;
      if (selectedChangedBy === "Admin" && tx.changedBy.toLowerCase().includes("system")) return false;
    }

    return true;
  });

  // Calculate stats based on all transactions
  const totalTransactions = transactions.length;
  
  const stockAdded = transactions
    .filter((tx) => tx.change.startsWith("+"))
    .reduce((sum, tx) => sum + parseInt(tx.change.replace("+", "")), 0);

  const stockRemoved = transactions
    .filter((tx) => tx.change.startsWith("-"))
    .reduce((sum, tx) => sum + Math.abs(parseInt(tx.change.replace("-", ""))), 0);

  const autoSalesDeductions = transactions
    .filter((tx) => tx.transactionType === "Customer Sale")
    .reduce((sum, tx) => sum + Math.abs(parseInt(tx.change.replace("-", ""))), 0);

  const manualCorrections = transactions
    .filter((tx) => tx.transactionType === "Manual Correction")
    .length;

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
          STOCK TRANSACTIONS
        </h1>
        <p className="text-[11px] text-neutral-450 mt-1 font-medium">
          Complete audit history of every stock movement
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <AdminStatCard
          title="TOTAL TRANSACTIONS"
          value={totalTransactions.toString()}
          subNote="Audit ledger depth"
          icon={
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        <AdminStatCard
          title="STOCK ADDED"
          value={`+${stockAdded} units`}
          subNote="Total replenishments"
          icon={
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <AdminStatCard
          title="STOCK REMOVED"
          value={`-${stockRemoved} units`}
          subNote="Total deductions"
          icon={
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <AdminStatCard
          title="AUTO SALES DEDUCTIONS"
          value={`-${autoSalesDeductions} units`}
          subNote="Automatic customer sales"
          icon={
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
        />
        <AdminStatCard
          title="MANUAL CORRECTIONS"
          value={manualCorrections.toString()}
          subNote="Quarterly audit adjustments"
          icon={
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          }
        />
      </div>

      {/* Filters Panel */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search SKU/Product */}
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Search SKU / Product / Ref</span>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="SKU, Order, Staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-805 bg-white"
            />
          </div>
        </div>

        {/* Transaction Type */}
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Transaction Type</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-805"
          >
            <option value="All Types">All Types</option>
            <option value="Opening Stock">Opening Stock</option>
            <option value="Stock Added">Stock Added</option>
            <option value="Customer Sale">Customer Sale</option>
            <option value="Damaged Item">Damaged Item</option>
            <option value="Customer Return">Customer Return</option>
            <option value="Manual Correction">Manual Correction</option>
          </select>
        </div>

        {/* Reason Category */}
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Reason Categories</span>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-855"
          >
            <option value="All Reasons">All Reasons</option>
            <option value="Opening Stock">Opening Stock</option>
            <option value="Replenishment">Replenishments</option>
            <option value="Customer Order">Customer Orders</option>
            <option value="Returned Order">Returned Orders</option>
            <option value="Damage / Write-off">Damage & Write-offs</option>
          </select>
        </div>

        {/* Changed By Category */}
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Action Initiator</span>
          <select
            value={selectedChangedBy}
            onChange={(e) => setSelectedChangedBy(e.target.value)}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-855"
          >
            <option value="All Users">All Users</option>
            <option value="Admin">Manual (Staff Admins)</option>
            <option value="System">Automatic (System Sales)</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden">
        <StockTransactionTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}

export default function AdminStockTransactionsPage() {
  const breadcrumbs = [
    { label: "Inventory", href: "/admin/inventory" },
    { label: "Transactions" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Header bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      <Suspense fallback={<div className="p-8 text-center text-xs">Loading ledger logs...</div>}>
        <TransactionsPageContent />
      </Suspense>
    </div>
  );
}
