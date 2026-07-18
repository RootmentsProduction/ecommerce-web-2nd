"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CartProvider } from "../../context/CartContext";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import ServiceBenefitsBar from "./ServiceBenefitsBar";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAdmin, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c59b27] mx-auto mb-4"></div>
          <p className="font-questrial text-sm uppercase tracking-widest text-neutral-400">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin && pathname !== '/admin/login') {
    return null; // Prevents flashing content
  }

  return <>{children}</>;
}

function LayoutContent({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const isRootAdmin = pathname?.startsWith("/admin");

  if (isRootAdmin) {
    return (
      <AdminRouteGuard>
        <div className="min-h-screen bg-[#F8F8F8] text-neutral-900 admin-dashboard-root w-full flex">
          {children}
        </div>
      </AdminRouteGuard>
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

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}
