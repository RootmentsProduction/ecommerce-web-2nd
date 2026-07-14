"use client";

import React, { use } from "react";
import Link from "next/link";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import ProductForm from "@/components/admin/products/ProductForm";
import { getProductDetailById } from "@/data/admin/product-management";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: PageProps) {
  const { id } = use(params);
  const product = getProductDetailById(id);

  if (!product) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Product SKU not found. <Link href="/admin/products" className="text-[#C99213] underline">Go back</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Products", href: "/admin/products" },
    { label: product.name, href: `/admin/products/${product.sku}` },
    { label: "Edit Product" }
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
            EDIT PRODUCT
          </h1>
          <p className="text-[11px] text-neutral-450 mt-1 font-medium">
            Modify details, pricing, media, and variants for {product.name}
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-6">
          <ProductForm initialData={product} mode="edit" />
        </div>
      </div>
    </div>
  );
}
