"use client";

import React from "react";
import AdminBreadcrumb from "./AdminBreadcrumb";

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

export default function AdminTopbar({
  breadcrumbItems,
  showSearch = true,
  searchPlaceholder = "Search anything...",
  onSearchChange,
  maxWidthClass = "max-w-7xl",
}: AdminTopbarProps) {
  return (
    <header className="h-20 bg-white border-b border-[#E5E5E5] sticky top-0 z-20 w-full">
      <div className={`${maxWidthClass} mx-auto w-full h-full flex items-center justify-between px-6 md:px-8`}>
        {/* Left Area: Breadcrumbs */}
        <div className="flex items-center space-x-2 pl-12 lg:pl-0">
          <AdminBreadcrumb items={breadcrumbItems} />
        </div>

        {/* Right Area: Search & Profile */}
        <div className="flex items-center space-x-4 md:space-x-6">
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

          {/* Notifications Icon */}
          <button className="relative p-1.5 text-neutral-500 hover:text-neutral-800 transition-colors focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Notification Dot */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#C99213] rounded-full" />
          </button>

          {/* User Profile Icon */}
          <button className="flex items-center space-x-2 focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-200 flex items-center justify-center text-white text-xs font-semibold overflow-hidden hover:opacity-85 transition-opacity">
              {/* Simple User SVG Icon for premium default profile */}
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
