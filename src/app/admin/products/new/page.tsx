"use client";

import React from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import ProductForm from "@/components/admin/products/ProductForm";

export default function AddProductPage() {
  const breadcrumbs = [
    { label: "Products", href: "/admin/products" },
    { label: "Add Product" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Header bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
            ADD PRODUCT
          </h1>
          <p className="text-[11px] text-neutral-450 mt-1 font-medium">
            Create a new product for the ecommerce catalogue
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-6">
          <ProductForm mode="create" />
        </div>
      </div>
    </div>
  );
}
