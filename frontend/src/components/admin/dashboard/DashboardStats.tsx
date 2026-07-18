"use client";

import React, { useState, useEffect } from "react";
import AdminStatCard from "../shared/AdminStatCard";
import { getDashboardStats } from "@/services/dashboard.service";
import type { DashboardStats as DashboardStatsType } from "@/services/dashboard.service";

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsType | null>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const cards = stats
    ? [
        {
          id: "revenue",
          title: "TODAY'S REVENUE",
          value: formatCurrency(stats.todaysRevenue),
          subNote: `${formatCurrency(stats.monthlyRevenue)} this month`,
        },
        {
          id: "orders",
          title: "TODAY'S ORDERS",
          value: stats.todaysOrdersCount.toString(),
          subNote: `${stats.totalProducts} active products`,
        },
        {
          id: "customers",
          title: "NEW CUSTOMERS",
          value: stats.newCustomersCount.toString(),
          subNote: "registered today",
        },
        {
          id: "lowstock",
          title: "LOW STOCK ITEMS",
          value: stats.lowStockCount.toString(),
          subNote: "need reordering",
        },
        {
          id: "sold",
          title: "PRODUCTS SOLD",
          value: stats.productsSoldToday.toString(),
          subNote: "units today",
        },
      ]
    : [
        { id: "revenue", title: "TODAY'S REVENUE", value: "—", subNote: "loading..." },
        { id: "orders", title: "TODAY'S ORDERS", value: "—", subNote: "loading..." },
        { id: "customers", title: "NEW CUSTOMERS", value: "—", subNote: "loading..." },
        { id: "lowstock", title: "LOW STOCK ITEMS", value: "—", subNote: "loading..." },
        { id: "sold", title: "PRODUCTS SOLD", value: "—", subNote: "loading..." },
      ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((stat) => (
        <AdminStatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          subNote={stat.subNote}
        />
      ))}
    </div>
  );
}
