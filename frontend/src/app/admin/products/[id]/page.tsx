"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { getAdminProductBySku } from "@/services/products.service";
import { AdminProductFormData } from "@/types/admin";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminProductDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<AdminProductFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isArchived, setIsArchived] = useState(false);

  React.useEffect(() => {
    getAdminProductBySku(id).then((res) => {
      setProduct(res || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Loading product details...
      </div>
    );
  }

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

  const primaryImage = product.media.find((m) => m.isPrimary);
  const secondaryImages = product.media.filter((m) => !m.isPrimary);

  const mrpVal = parseFloat(product.mrp) || 0;
  const sellingPriceVal = parseFloat(product.sellingPrice) || 0;
  const offerPriceVal = parseFloat(product.offerPrice || "") || 0;
  const discountAmt = mrpVal > sellingPriceVal ? mrpVal - sellingPriceVal : 0;
  const costPriceVal = parseFloat(product.costPrice || "") || 0;
  
  // Calculate variant totals
  const totalStock = product.variants?.length > 0
    ? product.variants.reduce((sum, v) => sum + v.stock, 0)
    : product.initialStock;

  let stockStatus: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock";
  if (totalStock === 0) {
    stockStatus = "Out of Stock";
  } else if (totalStock <= product.minStock) {
    stockStatus = "Low Stock";
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Top Header Bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Container */}
      <div className="flex-grow p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        
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
              onClick={() => setIsArchived(!isArchived)}
              className="px-4 py-2 border border-neutral-200 rounded-full bg-white text-xs font-semibold text-neutral-750 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              {isArchived ? "Unarchive" : "Archive Product"}
            </button>
            <button
              onClick={() => router.push(`/admin/inventory/${product.id}/adjust`)}
              className="px-4 py-2 border border-[#C99213] rounded-full bg-white text-xs font-semibold text-[#C99213] hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Adjust Stock
            </button>
            <button
              onClick={() => router.push(`/admin/products/${product.id}/edit`)}
              className="px-5 py-2 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Edit Product
            </button>
          </div>
        </div>

        {/* Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1 & 2: Overview, Pricing, Purchase Info, Variants */}
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
                {product.shortDescription && (
                  <p className="text-xs text-neutral-500 font-light italic">
                    Snippet: &quot;{product.shortDescription}&quot;
                  </p>
                )}
              </div>

              {/* Attributes Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 text-xs border-t border-neutral-100">
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Category</span>
                  <span className="font-semibold text-neutral-800">{product.category}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Subcategory</span>
                  <span className="font-semibold text-neutral-800">{product.subcategory || "—"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Brand</span>
                  <span className="font-semibold text-neutral-800">{product.brand || "—"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Collection</span>
                  <span className="font-semibold text-neutral-800">{product.collection || "—"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Gender Target</span>
                  <span className="font-semibold text-neutral-800">{product.gender}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Occasion</span>
                  <span className="font-semibold text-neutral-800">{product.occasion}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Material / Metal</span>
                  <span className="font-semibold text-neutral-800">{product.material}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Purity</span>
                  <span className="font-semibold text-neutral-800">{product.purity || "—"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">HSN Code</span>
                  <span className="font-semibold text-neutral-850 font-mono">{product.hsnCode || "—"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Unit of Measure</span>
                  <span className="font-semibold text-neutral-800">{product.unit || "—"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Default Size</span>
                  <span className="font-semibold text-neutral-800">{product.size || "—"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Returnable</span>
                  <span className="font-semibold text-neutral-850">
                    {product.isReturnable ? "Yes (Eligible for customer returns)" : "No (Final Sale)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing & Tax Details */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
                Pricing & Sales Taxation
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
                {offerPriceVal > 0 && (
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400">Offer Price</span>
                    <span className="text-sm font-bold text-[#C99213]">₹{offerPriceVal.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">Calculated Discount</span>
                  <span className="text-sm font-bold text-[#2E7D32]">
                    ₹{discountAmt.toLocaleString("en-IN")} ({product.discountPercent}% Off)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 text-xs border-t border-neutral-100">
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Tax Preference</span>
                  <span className="font-semibold text-neutral-800">{product.taxPreference || "Taxable"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Intra-State GST Rate</span>
                  <span className="font-semibold text-neutral-800">{product.intraStateTaxRate || "3%"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Inter-State GST Rate</span>
                  <span className="font-semibold text-neutral-800">{product.interStateTaxRate || "3%"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">GST treatment</span>
                  <span className="font-semibold text-neutral-800">
                    {product.priceIncludesGst !== false ? "Price Includes Tax" : "Tax Added Extra"}
                  </span>
                </div>
              </div>
            </div>

            {/* Purchase & Supplier Information */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
                Purchase / Procurement Info
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Cost Price</span>
                  <span className="font-bold text-neutral-900">
                    {costPriceVal > 0 ? `₹${costPriceVal.toLocaleString("en-IN")}` : "—"}
                  </span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Preferred Supplier</span>
                  <span className="font-semibold text-neutral-800">{product.preferredVendor || "—"}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Procurement Notes</span>
                  <span className="font-normal text-neutral-600 italic">{product.purchaseNotes || "No procurement notes."}</span>
                </div>
              </div>
            </div>

            {/* Variant stock summary */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
                Variant Details & Stock Allocation
              </h2>
              {product.variants && product.variants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50 text-[10px] font-bold text-neutral-400 border-b border-neutral-150 uppercase tracking-wider">
                        <th className="py-3 px-4">Variant Option</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Current Stock</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {product.variants.map((v) => (
                        <tr key={v.id} className="hover:bg-neutral-50/40 transition-colors">
                          <td className="py-3 px-4 font-semibold text-neutral-800">{v.name}</td>
                          <td className="py-3 px-4 font-mono text-neutral-500">{v.sku}</td>
                          <td className="py-3 px-4 font-bold text-neutral-900">₹{parseFloat(v.price).toLocaleString("en-IN")}</td>
                          <td className="py-3 px-4 font-semibold text-neutral-600">{v.stock} units</td>
                          <td className="py-3 px-4"><StatusBadge status={v.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-neutral-450 py-4 text-center">
                  This product has no variations. Stock is managed on the base product profile.
                </p>
              )}
            </div>
          </div>

          {/* Column 3: Media, Visibility Sidebar, SEO */}
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
                    <div className="w-full h-full relative">
                      <Image
                        src={primaryImage.url}
                        alt={primaryImage.altText || "Product Primary image"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover"
                      />
                      {primaryImage.altText && (
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] p-1.5 truncate z-10">
                          Alt: {primaryImage.altText}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-neutral-400">No Image</span>
                  )}
                  <span className="absolute top-2 left-2 bg-neutral-900/80 text-white text-[8px] font-bold px-2 py-0.5 rounded tracking-wide uppercase z-10">
                    Primary
                  </span>
                </div>

                {/* Gallery */}
                {secondaryImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {secondaryImages.map((m) => (
                      <div key={m.id} className="group relative aspect-square rounded-md bg-neutral-50 border border-neutral-100 overflow-hidden">
                        <Image
                          src={m.url}
                          alt={m.altText || "Secondary view"}
                          fill
                          sizes="(max-width: 1024px) 50vw, 200px"
                          className="object-cover"
                        />
                        {m.altText && (
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            {m.altText}
                          </div>
                        )}
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
                  href={`/admin/inventory/${product.id}`}
                  className="text-[10px] text-[#C99213] font-bold uppercase tracking-wider hover:underline"
                >
                  Manage Stock
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Total Stock</span>
                  <span className="font-bold text-neutral-900">{totalStock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Stock Status</span>
                  <span className="font-semibold text-neutral-800">
                    <StatusBadge status={stockStatus} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Reorder Threshold</span>
                  <span className="font-semibold text-neutral-800">{product.minStock} units</span>
                </div>
                <div className="flex justify-between border-t border-neutral-50 pt-2 mt-2">
                  <span className="text-neutral-400 font-semibold">Backorders</span>
                  <span className="font-semibold text-neutral-800">{product.allowBackorder ? "Allowed" : "Not Allowed"}</span>
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
                SEO Metadata
              </h2>
              
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">SEO Title</span>
                  <span className="font-semibold text-neutral-850">{product.seoTitle || "—"}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">SEO Slug</span>
                  <span className="font-mono text-neutral-600 text-[10px]">{product.seoSlug || "—"}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Meta Description</span>
                  <span className="font-normal text-neutral-500 leading-normal block">{product.seoDescription || "No SEO description set."}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
