"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Send, ArrowRight } from "lucide-react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { localStorageService } from "@/services/localStorage.service";
import { PurchaseOrder } from "@/types/purchase-order";

export default function PurchaseOrdersListPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Draft" | "Sent" | "Received" | "Cancelled">("All");

  useEffect(() => {
    // Load POs from localStorage service deferred
    Promise.resolve().then(() => {
      setPurchaseOrders(localStorageService.getPurchaseOrders());
    });
  }, []);

  // Quick Action: Send PO
  const handleSendPO = (poId: string) => {
    const po = localStorageService.getPurchaseOrderById(poId);
    if (po && po.status === "Draft") {
      const updated = {
        ...po,
        status: "Sent" as const
      };
      localStorageService.savePurchaseOrder(updated);
      
      // Update local state
      setPurchaseOrders(localStorageService.getPurchaseOrders());
    }
  };

  // Filter POs
  const filteredPOs = purchaseOrders.filter((po) => {
    const matchesStatus = statusFilter === "All" || po.status === statusFilter;
    const matchesSearch = po.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          po.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (po.referenceNumber && po.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Purchase Orders" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fb] admin-dashboard-root">
      {/* Topbar */}
      <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />

      {/* Main Container */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight font-sans">
              Purchase Orders
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Issue purchase agreements, track deliveries, and manage vendor invoice accruals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Create PO Button */}
            <Link
              href="/admin/purchase-orders/new"
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#3762f9] hover:bg-[#2748c9] text-white rounded-full text-xs font-semibold tracking-wide transition-all shadow-[0_4px_12px_rgba(55,98,249,0.2)] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Purchase Order</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Left Sidebar Status Filter */}
          <div className="lg:col-span-1 bg-white border border-[#e1e5f5] rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Filter Status
            </h2>
            <div className="flex flex-col space-y-1.5">
              {(["All", "Draft", "Sent", "Received", "Cancelled"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === status
                      ? "bg-[#3762f9]/10 text-[#3762f9]"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {status} Orders
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Content Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {purchaseOrders.length === 0 ? (
              /* If completely empty: Illustrated Life-cycle Flow */
              <div className="bg-white border border-[#e1e5f5] rounded-3xl p-8 md:p-12 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.15)] text-center space-y-8">
                <div className="max-w-md mx-auto space-y-3">
                  <h2 className="text-lg font-bold text-neutral-900">Purchase Order Life-Cycle</h2>
                  <p className="text-xs text-neutral-500">
                    Acquire jewelry components and gemstones smoothly with structured records.
                  </p>
                </div>

                {/* Workflow Steps Visual */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-4xl mx-auto relative items-center">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col items-center space-y-2 p-4 bg-[#f5f7fb] rounded-2xl border border-neutral-100">
                    <div className="w-10 h-10 rounded-full bg-[#3762f9] text-white flex items-center justify-center font-bold text-xs">1</div>
                    <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">Raise PO</span>
                    <p className="text-[9px] text-neutral-450 leading-tight">Create draft purchase order agreement.</p>
                  </div>

                  <div className="hidden md:flex justify-center text-neutral-350"><ArrowRight className="w-5 h-5" /></div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center space-y-2 p-4 bg-[#f5f7fb] rounded-2xl border border-neutral-100">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">2</div>
                    <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">Send to Vendor</span>
                    <p className="text-[9px] text-neutral-450 leading-tight">Email/Dispatch PO details to supplier.</p>
                  </div>

                  <div className="hidden md:flex justify-center text-neutral-350"><ArrowRight className="w-5 h-5" /></div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center space-y-2 p-4 bg-[#f5f7fb] rounded-2xl border border-neutral-100">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">3</div>
                    <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">Receive Goods</span>
                    <p className="text-[9px] text-neutral-450 leading-tight">Perform assay audit and accept stock.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/admin/purchase-orders/new"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-[#3762f9] hover:bg-[#2748c9] text-white rounded-full text-xs font-bold transition-all shadow-md"
                  >
                    <span>Create Your First Purchase Order</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* Active Purchase Orders Table Card */
              <div className="bg-white border border-[#e1e5f5] rounded-3xl shadow-[0_30px_90px_-40px_rgba(15,23,42,0.15)] overflow-hidden flex flex-col">
                
                {/* Search Bar Header */}
                <div className="p-5 border-b border-[#e1e5f5] flex items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Search className="w-4 h-4 text-neutral-400" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search PO Number, Vendor or Reference..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-2xl text-xs outline-none focus:border-[#3762f9] focus:bg-white transition-all text-neutral-800 placeholder-neutral-400"
                    />
                  </div>
                  
                  <div className="text-[11px] text-neutral-500 font-medium">
                    Showing {filteredPOs.length} of {purchaseOrders.length} Orders
                  </div>
                </div>

                {/* Table Area */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f5f6ff] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b] border-b border-[#e1e5f5]">
                        <th className="py-4 px-6 font-semibold w-12">#</th>
                        <th className="py-4 px-6 font-semibold">Date</th>
                        <th className="py-4 px-6 font-semibold">PO Number</th>
                        <th className="py-4 px-6 font-semibold">Vendor Name</th>
                        <th className="py-4 px-6 font-semibold">Reference</th>
                        <th className="py-4 px-6 font-semibold">Delivery Date</th>
                        <th className="py-4 px-6 font-semibold text-right">Total (INR)</th>
                        <th className="py-4 px-6 font-semibold text-center">Status</th>
                        <th className="py-4 px-6 font-semibold text-center w-24">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e1e5f5]">
                      {filteredPOs.length > 0 ? (
                        filteredPOs.map((po, idx) => (
                          <tr
                            key={po.id}
                            className="hover:bg-[#fafbff] transition-colors"
                          >
                            {/* Index */}
                            <td className="py-4 px-6 text-xs text-neutral-400 font-medium">
                              {idx + 1}
                            </td>

                            {/* Date */}
                            <td className="py-4 px-6 text-xs text-neutral-550 font-medium">
                              {po.date}
                            </td>

                            {/* PO Number */}
                            <td className="py-4 px-6 text-xs font-bold text-[#3762f9] hover:underline cursor-pointer">
                              <Link href={`/admin/purchase-orders/${po.id}`}>
                                {po.id}
                              </Link>
                            </td>

                            {/* Vendor Name */}
                            <td className="py-4 px-6 text-xs text-neutral-800 font-semibold">
                              {po.vendorName}
                            </td>

                            {/* Reference Number */}
                            <td className="py-4 px-6 text-xs text-neutral-550 font-medium">
                              {po.referenceNumber || <span className="text-neutral-300">-</span>}
                            </td>

                            {/* Delivery Date */}
                            <td className="py-4 px-6 text-xs text-neutral-550 font-medium">
                              {po.deliveryDate || <span className="text-neutral-300">-</span>}
                            </td>

                            {/* Total Total */}
                            <td className="py-4 px-6 text-xs font-bold text-neutral-900 text-right">
                              ₹{po.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </td>

                            {/* Status Badge */}
                            <td className="py-4 px-6 text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                po.status === "Received"
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  : po.status === "Sent"
                                  ? "bg-purple-50 text-purple-600 border border-purple-100"
                                  : po.status === "Cancelled"
                                  ? "bg-red-50 text-red-650 border border-red-100"
                                  : "bg-neutral-100 text-neutral-500 border border-neutral-200"
                              }`}>
                                {po.status}
                              </span>
                            </td>

                            {/* Quick Action: Send */}
                            <td className="py-4 px-6 text-center">
                              {po.status === "Draft" ? (
                                <button
                                  onClick={() => handleSendPO(po.id)}
                                  className="inline-flex items-center space-x-1 px-3 py-1 bg-[#3762f9] hover:bg-[#2748c9] text-white rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                  <Send className="w-2.5 h-2.5" />
                                  <span>Send</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                                  No Action
                                </span>
                              )}
                            </td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={9}
                            className="py-12 text-center text-xs text-neutral-400 font-medium"
                          >
                            No purchase orders found matching search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
