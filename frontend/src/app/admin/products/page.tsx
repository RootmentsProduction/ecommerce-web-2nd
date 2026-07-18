"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminTabs from "@/components/admin/shared/AdminTabs";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { getAdminProducts, archiveProduct, updateProduct, permanentDeleteProduct } from "@/services/products.service";
import { AdminProduct } from "@/types/admin";

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<AdminProduct[]>([]);
  const [activeTab, setActiveTab] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmProduct, setConfirmProduct] = useState<{ id: string; name: string; action: 'archive' | 'restore' | 'permanentDelete' } | null>(null);

  const breadcrumbs = [{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Products" }];

  const tabs = ["All Products", "Active", "Draft", "Archived"];

  const tabToStatus: Record<string, string | undefined> = {
    "All Products": undefined,   // backend default: excludes Archived
    "Active": "Active",
    "Draft": "Draft",
    "Archived": "Archived",
  };

  const loadProducts = React.useCallback((tab: string, search: string) => {
    const status = tabToStatus[tab];
    getAdminProducts({ status, search: search || undefined }).then(setProductList);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    loadProducts(activeTab, searchQuery);
  }, [activeTab, loadProducts]); // re-fetch on tab change

  // Client-side search filter (search runs on already-fetched list)
  const filteredProducts = productList.filter((product) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      product.sku.toLowerCase().includes(q) ||
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
    );
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    loadProducts(activeTab, value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Topbar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Page Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              PRODUCTS
            </h1>
            <p className="text-[11px] text-neutral-450 mt-1 font-medium">
              {productList.length} Total products in catalogue
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search Product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 pl-9 pr-4 py-2 border border-neutral-200 rounded-full bg-white text-xs outline-none focus:border-[#C99213] transition-all text-neutral-800 placeholder-neutral-400"
              />
            </div>

            {/* Add Product Button */}
            <Link href="/admin/products/new" className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer">
              <span className="text-[#C99213] font-bold text-sm leading-none">+</span>
              <span>Add Product</span>
            </Link>
          </div>
        </div>

        {/* Content Container (Tabs + Table) */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
          {/* Tabs Filter */}
          <div className="px-6 border-b border-neutral-100">
            <AdminTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">SKU</th>
                  <th className="py-4 px-6 font-semibold">PRODUCT</th>
                  <th className="py-4 px-6 font-semibold">CATEGORY</th>
                  <th className="py-4 px-6 font-semibold">SELLING PRICE</th>
                  <th className="py-4 px-6 font-semibold">CURRENT STOCK</th>
                  <th className="py-4 px-6 font-semibold">STOCK STATUS</th>
                  <th className="py-4 px-6 font-semibold">PUBLICATION STATUS</th>
                  <th className="py-4 px-6 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => {
                    const urlId = product.id || product.sku.replace("#", "").trim();
                    return (
                      <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                        {/* SKU */}
                        <td className="py-4 px-6 text-xs font-bold text-[#C99213] cursor-pointer hover:underline">
                          <Link href={`/admin/products/${urlId}`}>
                            {product.sku}
                          </Link>
                        </td>

                        {/* Product Thumbnail + Name */}
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-[#f4efdb] via-[#e8dbb4] to-[#c59b27]/40 border border-[#e8dbb4] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                              <svg className="w-4 h-4 text-[#8c6a16]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <circle cx="12" cy="14" r="5" />
                                <path d="M12 9V3m-3 2h6" />
                              </svg>
                            </div>
                            <Link href={`/admin/products/${urlId}`} className="text-xs font-semibold text-neutral-800 whitespace-nowrap hover:text-[#C99213] hover:underline">
                              {product.name}
                            </Link>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-6 text-xs text-neutral-450 font-semibold whitespace-nowrap">
                          {product.category}
                        </td>

                        {/* Selling Price */}
                        <td className="py-4 px-6 text-xs font-bold text-neutral-900">
                          {product.price}
                        </td>

                        {/* Current Stock */}
                        <td className="py-4 px-6 text-xs font-semibold text-neutral-600">
                          {product.stock}
                        </td>

                        {/* Stock Status */}
                        <td className="py-4 px-6">
                          <StatusBadge status={product.stockStatus} />
                        </td>

                        {/* Publication Status */}
                        <td className="py-4 px-6">
                          <StatusBadge status={product.publicationStatus} />
                        </td>

                          {/* Action buttons */}
                        <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap text-xs font-semibold">
                          <Link href={`/admin/products/${urlId}`} className="text-neutral-500 hover:text-neutral-900">
                            View
                          </Link>
                          <Link href={`/admin/products/${urlId}/edit`} className="text-[#C99213] hover:text-[#a9831e]">
                            Edit
                          </Link>
                          <Link href={`/admin/inventory/${urlId}/adjust`} className="text-neutral-500 hover:text-neutral-950 font-bold">
                            Adjust Stock
                          </Link>
                          {product.publicationStatus === "Archived" ? (
                            <>
                              <button
                                onClick={() => setConfirmProduct({ id: product.id || urlId, name: product.name, action: 'restore' })}
                                className="text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer border-none bg-transparent p-0"
                              >
                                Restore
                              </button>
                              {/* Permanent delete — only shown on Archived tab */}
                              <button
                                onClick={() => setConfirmProduct({ id: product.id || urlId, name: product.name, action: 'permanentDelete' })}
                                title="Permanently Delete"
                                className="inline-flex items-center justify-center text-rose-600 hover:text-rose-800 cursor-pointer border-none bg-transparent p-0 ml-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setConfirmProduct({ id: product.id || urlId, name: product.name, action: 'archive' })}
                              className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer border-none bg-transparent p-0"
                            >
                              Archive
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-xs text-neutral-400 font-medium">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {confirmProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 font-questrial" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-2">
              {confirmProduct.action === 'archive' ? 'Archive Product'
                : confirmProduct.action === 'restore' ? 'Restore Product'
                : 'Permanently Delete Product'}
            </h3>
            <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
              {confirmProduct.action === 'archive'
                ? `Are you sure you want to archive "${confirmProduct.name}"? It will be hidden from the storefront, but historical transactions and records will remain safe.`
                : confirmProduct.action === 'restore'
                ? `Are you sure you want to restore "${confirmProduct.name}"? It will become visible on the storefront again.`
                : `⚠️ Permanently delete "${confirmProduct.name}"? This cannot be undone. The product will be removed from the database forever.`}
            </p>
            <div className="flex justify-end space-x-3 text-xs font-semibold">
              <button
                onClick={() => setConfirmProduct(null)}
                className="px-4 py-2 border border-neutral-300 rounded text-neutral-650 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const { id, action } = confirmProduct;
                  setConfirmProduct(null);
                  try {
                    if (action === 'archive') {
                      await archiveProduct(id);
                    } else if (action === 'restore') {
                      await updateProduct(id, { status: 'ACTIVE' });
                    } else {
                      await permanentDeleteProduct(id);
                    }
                    loadProducts(activeTab, searchQuery);
                  } catch (err) {
                    console.error(err);
                    alert('Action failed. Please try again.');
                  }
                }}
                className={`px-4 py-2 text-white rounded shadow-sm cursor-pointer ${
                  confirmProduct.action === 'permanentDelete'
                    ? 'bg-rose-700 hover:bg-rose-800'
                    : confirmProduct.action === 'archive'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {confirmProduct.action === 'permanentDelete' ? 'Delete Forever' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
