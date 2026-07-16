"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Download, Search, CheckCircle2, AlertCircle } from "lucide-react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { localStorageService } from "@/services/localStorage.service";
import { Vendor } from "@/types/vendor";

export default function VendorsListPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");

  useEffect(() => {
    // Load vendors from localStorage service deferred to microtask
    Promise.resolve().then(() => {
      setVendors(localStorageService.getVendors());
    });
  }, []);

  // Filter vendors based on status and search query
  const filteredVendors = vendors.filter((v) => {
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && v.status === "Active") ||
      (statusFilter === "Inactive" && v.status === "Inactive");

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      v.displayName.toLowerCase().includes(query) ||
      v.companyName.toLowerCase().includes(query) ||
      v.email.toLowerCase().includes(query) ||
      v.workPhone.toLowerCase().includes(query) ||
      v.mobile.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  // Export to CSV helper
  const handleExportCSV = () => {
    if (filteredVendors.length === 0) return;

    const headers = ["ID", "Display Name", "Company Name", "Email", "Work Phone", "Mobile", "GST Treatment", "Payables (INR)", "Unused Credits (INR)", "Status"];
    const rows = filteredVendors.map((v) => [
      v.id,
      v.displayName,
      v.companyName,
      v.email,
      v.workPhone,
      v.mobile,
      v.gstTreatment,
      v.payables,
      v.unusedCredits,
      v.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vendors_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const breadcrumbs = [{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Vendors" }];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fb] admin-dashboard-root">
      {/* Topbar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false} // Custom search implemented below
      />

      {/* Main Container */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight font-sans">
              Vendors
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Manage your supplier relationships, bank details, and payables.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-4 py-2 border border-[#e1e5f5] rounded-full bg-[#fff7ed] hover:bg-[#ffedd5] text-[#b45309] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            {/* New Vendor Button */}
            <Link
              href="/admin/vendors/new"
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#3762f9] hover:bg-[#2748c9] text-white rounded-full text-xs font-semibold tracking-wide transition-all shadow-[0_4px_12px_rgba(55,98,249,0.2)] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Vendor</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Layout: Left Sidebar Filters + Right Main Table Card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Left Sidebar Status Filter */}
          <div className="lg:col-span-1 bg-white border border-[#e1e5f5] rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Filter Status
            </h2>
            <div className="flex flex-col space-y-1.5">
              {(["All", "Active", "Inactive"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === status
                      ? "bg-[#3762f9]/10 text-[#3762f9]"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {status} Vendors
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Table Card */}
          <div className="lg:col-span-4 bg-white border border-[#e1e5f5] rounded-3xl shadow-[0_30px_90px_-40px_rgba(15,23,42,0.15)] overflow-hidden flex flex-col">
            
            {/* Search and Filters Header */}
            <div className="p-5 border-b border-[#e1e5f5] flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Search className="w-4 h-4 text-neutral-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search by name, company, email or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-2xl text-xs outline-none focus:border-[#3762f9] focus:bg-white transition-all text-neutral-800 placeholder-neutral-400"
                />
              </div>

              <div className="text-[11px] text-neutral-500 font-medium">
                Showing {filteredVendors.length} of {vendors.length} Vendors
              </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f5f6ff] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b] border-b border-[#e1e5f5]">
                    <th className="py-4 px-6 font-semibold w-12">#</th>
                    <th className="py-4 px-6 font-semibold">Display Name</th>
                    <th className="py-4 px-6 font-semibold">Company</th>
                    <th className="py-4 px-6 font-semibold">Email</th>
                    <th className="py-4 px-6 font-semibold">Work Phone</th>
                    <th className="py-4 px-6 font-semibold">GST Treatment</th>
                    <th className="py-4 px-6 font-semibold text-right">Payables</th>
                    <th className="py-4 px-6 font-semibold text-right">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1e5f5]">
                  {filteredVendors.length > 0 ? (
                    filteredVendors.map((v, idx) => (
                      <tr
                        key={v.id}
                        className="hover:bg-[#fafbff] transition-colors group"
                      >
                        {/* Index */}
                        <td className="py-4 px-6 text-xs text-neutral-400 font-medium">
                          {idx + 1}
                        </td>

                        {/* Display Name */}
                        <td className="py-4 px-6 text-xs font-bold text-[#3762f9] hover:underline cursor-pointer">
                          <Link href={`/admin/vendors/${v.id}`}>
                            {v.displayName}
                          </Link>
                          {v.status === "Inactive" && (
                            <span className="ml-2 text-[9px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded font-normal uppercase tracking-wider">
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* Company Name */}
                        <td className="py-4 px-6 text-xs text-neutral-700 font-medium">
                          {v.companyName}
                        </td>

                        {/* Email */}
                        <td className="py-4 px-6 text-xs text-neutral-500 font-medium">
                          {v.email || <span className="text-neutral-350">-</span>}
                        </td>

                        {/* Work Phone */}
                        <td className="py-4 px-6 text-xs text-neutral-500 font-medium">
                          {v.workPhone || <span className="text-neutral-350">-</span>}
                        </td>

                        {/* GST Treatment Type */}
                        <td className="py-4 px-6 text-xs text-neutral-600 font-semibold">
                          <span className="inline-flex items-center space-x-1">
                            {v.gstTreatment.includes("Registered") ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            )}
                            <span className="truncate max-w-[120px]">{v.gstTreatment}</span>
                          </span>
                        </td>

                        {/* Payables */}
                        <td className="py-4 px-6 text-xs font-semibold text-neutral-900 text-right">
                          ₹{v.payables.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </td>

                        {/* Credits */}
                        <td className="py-4 px-6 text-xs font-semibold text-emerald-600 text-right">
                          ₹{v.unusedCredits.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-12 text-center text-xs text-neutral-400 font-medium"
                      >
                        No vendors found matching search or filter status.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
