import React from "react";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      {/* Fixed sidebar */}
      <AdminSidebar />

      {/* Main viewport area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
