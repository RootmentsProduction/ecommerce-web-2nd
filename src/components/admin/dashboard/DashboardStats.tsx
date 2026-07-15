import React from "react";
import AdminStatCard from "../shared/AdminStatCard";
import { dashboardStats } from "@/data/fixtures/dashboard";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {dashboardStats.map((stat) => (
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
