"use client";

import React, { useState } from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminStatCard from "@/components/admin/shared/AdminStatCard";
import { customerStats, adminCustomers } from "@/data/admin/customers";

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs = [{ label: "Dashboard" }];

  // Filter customers by name or email or mobile
  const filteredCustomers = adminCustomers.filter((customer) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(q) ||
        customer.email.toLowerCase().includes(q) ||
        customer.mobile.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Top Header Bar with active search */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={true}
        searchPlaceholder="Search anything..."
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
            CUSTOMERS
          </h1>
          <p className="text-[11px] text-neutral-400 mt-1 font-medium">
            1,234 Total products in catalogue
          </p>
        </div>

        {/* Customer Stats Row (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {customerStats.map((stat) => (
            <AdminStatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              subNote={stat.subNote}
            />
          ))}
        </div>

        {/* Content Container (Table) */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">CUSTOMER</th>
                  <th className="py-4 px-6 font-semibold">MOBILE NUMBER</th>
                  <th className="py-4 px-6 font-semibold">EMAIL</th>
                  <th className="py-4 px-6 font-semibold">ORDER</th>
                  <th className="py-4 px-6 font-semibold">TOTAL SPEND</th>
                  <th className="py-4 px-6 font-semibold">DATE JOINED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                      {/* Customer Profile + Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          {/* Muted luxury profile circle */}
                          <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-200 flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
                            <svg className="w-3.5 h-3.5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap">
                            {customer.name}
                          </span>
                        </div>
                      </td>

                      {/* Mobile Number */}
                      <td className="py-4 px-6 text-xs text-neutral-600 font-semibold whitespace-nowrap">
                        {customer.mobile}
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6 text-xs text-neutral-500 font-medium whitespace-nowrap">
                        {customer.email}
                      </td>

                      {/* Order Count */}
                      <td className="py-4 px-6 text-xs font-semibold text-neutral-600">
                        {customer.ordersCount < 10 ? `0${customer.ordersCount}` : customer.ordersCount}
                      </td>

                      {/* Total Spend */}
                      <td className="py-4 px-6 text-xs font-bold text-neutral-900">
                        {customer.totalSpend}
                      </td>

                      {/* Date Joined */}
                      <td className="py-4 px-6 text-xs text-neutral-400 font-medium whitespace-nowrap">
                        {customer.dateJoined}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-xs text-neutral-400 font-medium">
                      No customers found.
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
