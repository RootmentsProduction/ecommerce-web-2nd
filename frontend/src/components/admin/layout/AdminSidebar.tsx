"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavSection } from "@/types/admin";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationData: NavSection[] = [
    {
      sectionTitle: "OVERVIEW",
      items: [
        { title: "Dashboard", href: "/admin/dashboard", iconName: "dashboard" },
        { title: "Homepage Settings", href: "/admin/homepage", iconName: "homepage" },
      ],
    },
    {
      sectionTitle: "COMMERCE",
      items: [
        { title: "Orders", href: "/admin/orders", iconName: "orders" },
        { title: "Purchase Orders", href: "/admin/purchase-orders", iconName: "purchases" },
        { title: "Products", href: "/admin/products", iconName: "products" },
        { title: "Categories", href: "/admin/categories", iconName: "categories" },
      ],
    },
    {
      sectionTitle: "MANAGEMENT",
      items: [
        { title: "Customers", href: "/admin/customers", iconName: "customers" },
        { title: "Vendors", href: "/admin/vendors", iconName: "vendors" },
        {
          title: "Inventory",
          href: "/admin/inventory",
          iconName: "inventory",
          subItems: [
            { title: "Stock Overview", href: "/admin/inventory" },
            { title: "Stock Transactions", href: "/admin/inventory/transactions" },
          ],
        },
      ],
    },
    {
      sectionTitle: "SETTINGS",
      items: [
        { title: "Shipping", href: "/admin/settings/shipping", iconName: "settings" },
      ],
    },
  ];

  const getIcon = (name: string, active: boolean) => {
    const color = active ? "#C99213" : "#9CA3AF";
    switch (name) {
      case "homepage":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "dashboard":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
        );
      case "transactions":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case "orders":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      case "products":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case "categories":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case "purchases":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "customers":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case "inventory":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case "vendors":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "settings":
        return (
          <svg className="w-4 h-4" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-[#1C1B19] rounded text-white focus:outline-none hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Sidebar Layout */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#1C1B19] text-neutral-300 border-r border-neutral-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-neutral-800">
          <div className="flex items-center space-x-2">
            {/* Gold Asterisk Logo */}
            <svg className="w-5 h-5 text-[#C99213]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="4" x2="12" y2="20" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" />
              <line x1="6.34" y1="17.66" x2="17.66" y2="6.34" />
            </svg>
            <div className="flex flex-col space-y-1.5">
              <span className="admin-brand-text text-white">
                Jewelry by Zorucci
              </span>
              <span className="admin-brand-text text-[#C99213]">
                Admin Dashboard
              </span>
            </div>
          </div>
          <button className="text-neutral-500 hover:text-white lg:block hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          {navigationData.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="text-[10px] font-bold text-neutral-500 tracking-wider px-3 uppercase mb-2">
                {section.sectionTitle}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item, itemIdx) => {
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
                  const isMenuExpandable = item.subItems !== undefined && item.subItems.length > 0;

                  return (
                    <li key={itemIdx} className="relative group">
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-all ${
                          isActive
                            ? "bg-neutral-800/60 text-[#C99213] border-l-2 border-[#C99213] pl-2.5"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-800/30"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {getIcon(item.iconName, isActive)}
                          <span>{item.title}</span>
                        </div>
                      </Link>

                      {/* Floating Sub-selector Popover Box on Hover */}
                      {isMenuExpandable && (
                        <div className="absolute left-full top-0 ml-2 z-50 w-48 bg-[#252422] border border-neutral-700/80 rounded-xl p-2 shadow-2xl space-y-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-auto">
                          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-2.5 py-1 border-b border-neutral-800 mb-1">
                            {item.title}
                          </div>
                          {item.subItems?.map((sub, subIdx) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={subIdx}
                                href={sub.href}
                                className={`flex items-center space-x-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                                  isSubActive
                                    ? "bg-[#1C1B19] text-[#C99213] font-bold border-l-2 border-[#C99213] pl-2"
                                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isSubActive ? "bg-[#C99213]" : "bg-neutral-500"}`} />
                                <span>{sub.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Background Overlay for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
