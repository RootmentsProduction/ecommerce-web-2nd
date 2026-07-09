"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { CartProvider } from "../../context/CartContext";
import Header from "./Header";
import Footer from "./Footer";
import ServiceBenefitsBar from "./ServiceBenefitsBar";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if we are in the admin dashboard area
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] text-neutral-900 font-sans">
        {children}
      </div>
    );
  }

  return (
    <CartProvider>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <ServiceBenefitsBar />
      <Footer />
    </CartProvider>
  );
}
