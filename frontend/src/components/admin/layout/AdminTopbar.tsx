"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminBreadcrumb from "./AdminBreadcrumb";
import { apiFetch } from "@/services/api";
import { AlertTriangle, ShoppingBag, Bell, X, ExternalLink } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminTopbarProps {
  breadcrumbItems: BreadcrumbItem[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (val: string) => void;
  maxWidthClass?: string;
}

interface LowStockAlert {
  sku: string;
  productName: string;
  variantName: string | null;
  currentStock: number;
}

interface RecentOrderAlert {
  id: string;
  orderNumber: string;
  total: number;
  customerName: string;
  createdAt: string;
  status: string;
}

interface NotificationsResponse {
  lowStock: LowStockAlert[];
  recentOrders: RecentOrderAlert[];
}

export default function AdminTopbar({
  breadcrumbItems,
  showSearch = true,
  searchPlaceholder = "Search anything...",
  onSearchChange,
  maxWidthClass = "max-w-7xl",
}: AdminTopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationsResponse>({
    lowStock: [],
    recentOrders: [],
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch notifications
    const loadNotifications = async () => {
      try {
        const data = await apiFetch<NotificationsResponse>("/api/dashboard/notifications");
        setNotifications(data);
      } catch (err: any) {
        // Avoid using console.error to prevent Next.js dev overlay from capturing it
        if (err?.message?.includes("token") || err?.message?.includes("credentials") || err?.message?.includes("Unauthorized")) {
          console.warn("Notifications fetch skipped: User is not authenticated.");
        } else {
          console.warn("Failed to load notifications:", err?.message || err);
        }
      }
    };

    loadNotifications();
    // Poll notifications every 60 seconds
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalNotificationsCount = notifications.lowStock.length + notifications.recentOrders.length;

  return (
    <header className="h-20 bg-white border-b border-[#E5E5E5] sticky top-0 z-20 w-full font-sans">
      <div className={`${maxWidthClass} mx-auto w-full h-full flex items-center justify-between px-6 md:px-8`}>
        {/* Left Area: Breadcrumbs */}
        <div className="flex items-center space-x-2 pl-12 lg:pl-0">
          <AdminBreadcrumb items={breadcrumbItems} />
        </div>

        {/* Right Area: Search & Profile */}
        <div className="flex items-center space-x-4 md:space-x-6 relative">
          {showSearch && (
            <div className="relative md:block hidden">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-64 pl-9 pr-4 py-1.5 bg-[#F8F8F8] border border-neutral-200 rounded-full text-xs outline-none focus:border-[#C99213] focus:bg-white transition-all text-neutral-800 placeholder-neutral-400"
              />
            </div>
          )}

          {/* Notifications Icon & Drawer dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-1.5 text-neutral-500 hover:text-[#C99213] transition-colors focus:outline-none cursor-pointer"
            >
              <Bell className="w-5 h-5 stroke-[1.8]" />
              {/* Notification Dot/Badge */}
              {totalNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 min-w-3.5 h-3.5 bg-red-650 text-white rounded-full flex items-center justify-center text-[7px] font-bold px-0.5 shadow-sm">
                  {totalNotificationsCount}
                </span>
              )}
            </button>

            {/* Premium Gold/Sand Dropdown menu */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white border border-[#E5E5E5] rounded-[16px] shadow-xl z-50 overflow-hidden text-left flex flex-col max-h-[480px]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-[#FAF9F6]">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-850">
                    System Alerts & Logs
                  </span>
                  {totalNotificationsCount > 0 && (
                    <span className="text-[9px] font-semibold px-2 py-0.5 bg-[#C99213]/10 text-[#C99213] rounded-full">
                      {totalNotificationsCount} new
                    </span>
                  )}
                </div>

                {/* Notifications content */}
                <div className="flex-grow overflow-y-auto divide-y divide-neutral-100 max-h-[350px]">
                  
                  {/* Low Stock section */}
                  {notifications.lowStock.length > 0 && (
                    <div className="py-2.5">
                      <div className="px-5 py-1 text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                        Inventory Alerts
                      </div>
                      {notifications.lowStock.map((item, idx) => (
                        <div key={idx} className="px-5 py-3 hover:bg-neutral-50/50 flex items-start space-x-3.5">
                          <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${item.currentStock === 0 ? 'text-red-600' : 'text-[#C99213]'}`} />
                          <div className="space-y-0.5">
                            <span className="text-[11px] font-medium text-neutral-800 block">
                              {item.productName} {item.variantName ? `(${item.variantName})` : ''}
                            </span>
                            <span className="text-[9px] font-mono text-neutral-400 block">
                              SKU: {item.sku}
                            </span>
                            <span className={`text-[10px] font-bold block ${item.currentStock === 0 ? 'text-red-600' : 'text-[#C99213]'}`}>
                              {item.currentStock === 0 ? 'Out of Stock' : `Low Stock: ${item.currentStock} left`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recent bookings/purchases */}
                  {notifications.recentOrders.length > 0 && (
                    <div className="py-2.5">
                      <div className="px-5 py-1 text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                        Recent Checkout Bookings
                      </div>
                      {notifications.recentOrders.map((order) => (
                        <Link
                          key={order.id}
                          href={`/admin/orders/${order.id}`}
                          onClick={() => setIsOpen(false)}
                          className="px-5 py-3 hover:bg-neutral-50/50 flex items-start space-x-3.5 block"
                        >
                          <ShoppingBag className="w-4 h-4 mt-0.5 text-neutral-700 shrink-0" />
                          <div className="space-y-0.5 flex-grow">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-neutral-850">
                                {order.orderNumber}
                              </span>
                              <span className="text-[10px] font-bold text-neutral-900 font-mono">
                                ₹{order.total.toFixed(2)}
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-500 block">
                              By {order.customerName}
                            </span>
                            <span className="text-[9px] text-neutral-400 block">
                              {new Date(order.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-300 self-center shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {totalNotificationsCount === 0 && (
                    <div className="py-12 px-5 text-center text-xs text-neutral-400 font-medium">
                      No current notifications or alerts.
                    </div>
                  )}
                </div>

                {/* Footer link to manage */}
                <div className="border-t border-neutral-100 p-3.5 text-center bg-[#FAF9F6]">
                  <Link
                    href="/admin/inventory"
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] font-bold text-[#C99213] hover:text-[#a9831e] uppercase tracking-wider block"
                  >
                    View All Inventory Levels
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Icon */}
          <button className="flex items-center space-x-2 focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-200 flex items-center justify-center text-white text-xs font-semibold overflow-hidden hover:opacity-85 transition-opacity">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
