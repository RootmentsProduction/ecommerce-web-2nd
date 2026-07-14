"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { getProductDetailById } from "@/data/admin/product-management";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminProductDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const product = getProductDetailById(id);
  const [isArchived, setIsArchived] = useState(false);

  if (!product) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Product SKU not found. <Link href="/admin/products" className="text-[#C99213] underline">Go back</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Products", href: "/admin/products" },
    { label: product.name }
  ];

  const primaryImage = product.media.find((m) => m.isPrimary)?.url;
  const secondaryImages = product.media.filter((m) => !m.isPrimary);

  const mrpVal = parseFloat(product.mrp) || 0;
  const sellingPriceVal = parseFloat(product.sellingPrice) || 0;
  const discountAmt = mrpVal > sellingPriceVal ? mrpVal - sellingPriceVal : 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Top Header Bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Container */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Top actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/admin/products")}
              className="px-3.5 py-1.5 border border-neutral-200 rounded-full bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-700 flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <span>&larr;</span> <span>Back</span>
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans flex items-center space-x-2">
                <span>PRODUCT DETAILS</span>
                <span className="text-xs font-medium text-neutral-450 font-mono">({product.sku})</span>
              </h1>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsArchived(!isArchived);
              }}
              className="px-4 py-2 border border-neutral-200 rounded-full bg-white text-xs font-semibold text-neutral-750 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              {isArchived ? "Unarchive" : "Archive Product"}
            </button>
            <button
              onClick={() => {
                alert("Product duplicated (Mock Action)");
              }}
              className="px-4 py-2 border border-neutral-200 rounded-full bg-white text-xs font-semibold text-neutral-750 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Duplicate
            </button>
            <button
              onClick={() => router.push(`/admin/products/${product.sku}/edit`)}
              className="px-5 py-2 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Edit Product
            </button>
          </div>
        </div>

        {/* Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1 & 2: Overview & Attributes */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
                  Product Overview
                </h2>
                <div className="flex items-center space-x-2">
                  <StatusBadge status={isArchived ? "Archived" : product.status} />
                </div>
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Description</span>
                <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                  {product.description}
                </p>
              </div>

              {/* Attributes Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 text-xs">
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Category</span>
                  <span className="font-semibold text-neutral-800">{product.category}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Gender Target</span>
                  <span className="font-semibold text-neutral-800">{product.gender}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Material / Metal</span>
                  <span className="font-semibold text-neutral-800">{product.material}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Occasion</span>
                  <span className="font-semibold text-neutral-800">{product.occasion}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Created Date</span>
                  <span className="font-semibold text-neutral-500">2026-06-01</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Last Updated</span>
                  <span className="font-semibold text-neutral-500">2026-07-14</span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
                Pricing Breakdown
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-neutral-600">
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">MRP</span>
                  <span className="text-sm font-bold text-neutral-900">₹{mrpVal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">Selling Price</span>
                  <span className="text-sm font-bold text-[#C99213]">₹{sellingPriceVal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">Discount Amount</span>
                  <span className="text-sm font-bold text-[#2E7D32]">₹{discountAmt.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">Discount %</span>
                  <span className="text-sm font-bold text-[#2E7D32]">{product.discountPercent}% Off</span>
                </div>
              </div>
            </div>

            {/* Variants table */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
                Variant Combinations
              </h2>
              {product.variants && product.variants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50 text-[10px] font-bold text-neutral-400 border-b border-neutral-150 uppercase tracking-wider">
                        <th className="py-3 px-4">Variant Option</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {product.variants.map((v) => (
                        <tr key={v.id} className="hover:bg-neutral-50/40 transition-colors">
                          <td className="py-3 px-4 font-semibold text-neutral-800">{v.name}</td>
                          <td className="py-3 px-4 font-mono text-neutral-500">{v.sku}</td>
                          <td className="py-3 px-4 font-bold text-neutral-900">₹{parseFloat(v.price).toLocaleString("en-IN")}</td>
                          <td className="py-3 px-4 font-semibold text-neutral-600">{v.stock}</td>
                          <td className="py-3 px-4"><StatusBadge status={v.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-neutral-450 py-4 text-center">
                  This product has no variations.
                </p>
              )}
            </div>
          </div>

          {/* Column 3: Media & Visibility Sidebar */}
          <div className="space-y-6">
            
            {/* Website Visibility */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
                Website Visibility
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-semibold">Catalog Status</span>
                  <span className="font-bold text-[#2E7D32]">{product.status === "Active" ? "Visible" : "Hidden"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-semibold">Publish Date</span>
                  <span className="font-semibold text-neutral-800">{product.publishDate || "Not scheduled"}</span>
                </div>
                
                {/* Placement tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.isFeatured && (
                    <span className="px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[9px] font-bold uppercase tracking-wider border border-neutral-200">
                      Featured
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="px-2.5 py-0.5 rounded bg-[#FFF8E1] text-[#F57F17] text-[9px] font-bold uppercase tracking-wider border border-[#FFE082]/40">
                      New Arrival
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-2.5 py-0.5 rounded bg-[#E3F2FD] text-[#1565C0] text-[9px] font-bold uppercase tracking-wider border border-[#BBDEFB]/40">
                      Best Seller
                    </span>
                  )}
                  {product.showOnHomepage && (
                    <span className="px-2.5 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32] text-[9px] font-bold uppercase tracking-wider border border-[#C8E6C9]/40">
                      Home Page
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Media Gallery */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
                Product Media ({product.media.length})
              </h2>

              <div className="space-y-4">
                {/* Main image */}
                <div className="aspect-square rounded-lg bg-neutral-50 border border-neutral-100 overflow-hidden flex items-center justify-center relative">
                  {primaryImage ? (
                    <img src={primaryImage} alt="Main" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-bold text-neutral-400">No Image</span>
                  )}
                  <span className="absolute bottom-2 left-2 bg-neutral-900/80 text-white text-[8px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                    Primary
                  </span>
                </div>

                {/* Gallery */}
                {secondaryImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {secondaryImages.map((m) => (
                      <div key={m.id} className="aspect-square rounded-md bg-neutral-50 border border-neutral-100 overflow-hidden">
                        <img src={m.url} alt="Gallery" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick stock overview */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
                  Inventory Level
                </h2>
                <Link
                  href={`/admin/inventory/${product.sku}`}
                  className="text-[10px] text-[#C99213] font-bold uppercase tracking-wider hover:underline"
                >
                  Manage
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Total Stock</span>
                  <span className="font-bold text-neutral-900">{product.initialStock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Threshold</span>
                  <span className="font-semibold text-neutral-800">{product.minStock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Backorder Allowed</span>
                  <span className="font-semibold text-neutral-800">{product.allowBackorder ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
