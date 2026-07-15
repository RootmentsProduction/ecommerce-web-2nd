"use client";

import React, { useState } from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminStatCard from "@/components/admin/shared/AdminStatCard";
import CategoryTable from "@/components/admin/categories/CategoryTable";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import { getAdminCategories } from "@/services/categories.service";
import { AdminCategory } from "@/types/admin";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    getAdminCategories().then(setCategories);
  }, []);

  const breadcrumbs = [{ label: "Categories" }];

  // Calculations for stats
  const totalCategories = categories.length;
  const activeCategories = categories.filter((c) => c.status === "Active").length;
  const hiddenCategories = categories.filter((c) => c.status === "Hidden" || c.status === "Draft").length;
  const totalProductsAssigned = categories.reduce((sum, c) => sum + c.productCount, 0);

  const filteredCategories = categories.filter((cat) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        cat.name.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFormSubmit = (data: Partial<AdminCategory>) => {
    if (data.id) {
      // Editing
      setCategories((prev) =>
        prev.map((c) => (c.id === data.id ? { ...c, ...data } : c))
      );
      showToast(`Category "${data.name}" updated successfully!`);
    } else {
      // Creating
      const newCat: AdminCategory = {
        id: `cat-${Date.now()}`,
        name: data.name || "",
        slug: data.slug || "",
        description: data.description || "",
        status: data.status || "Active",
        productCount: 0,
        displayOrder: data.displayOrder || 1,
      };
      setCategories((prev) => [...prev, newCat]);
      showToast(`Category "${data.name}" created successfully!`);
    }
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleEditClick = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setIsFormOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === "Active" ? "Hidden" : "Active";
          showToast(`Category "${c.name}" marked as ${nextStatus}!`);
          return { ...c, status: nextStatus as "Active" | "Draft" | "Hidden" };
        }
        return c;
      })
    );
  };

  const handleDelete = (id: string) => {
    const name = categories.find((c) => c.id === id)?.name;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast(`Category "${name || id}" deleted successfully!`);
    if (editingCategory?.id === id) {
      setIsFormOpen(false);
      setEditingCategory(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1C1B19] text-white border border-[#C99213] rounded-lg shadow-xl px-5 py-3 text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <svg className="w-4 h-4 text-[#C99213]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Title and Top actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              CATEGORIES
            </h1>
            <p className="text-[11px] text-neutral-450 mt-1 font-medium">
              Manage product categories used across the customer website
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search filter input inside body */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-neutral-450" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search Categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 pl-9 pr-4 py-2 border border-neutral-200 rounded-full bg-white text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
              />
            </div>

            <button
              onClick={() => {
                setEditingCategory(null);
                setIsFormOpen(true);
              }}
              className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <span className="text-[#C99213] font-bold text-sm leading-none">+</span>
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Stats cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatCard
            title="TOTAL CATEGORIES"
            value={totalCategories.toString()}
            subNote=""
            icon={
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
          />
          <AdminStatCard
            title="ACTIVE CATEGORIES"
            value={activeCategories.toString()}
            subNote=""
            icon={
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <AdminStatCard
            title="DRAFT & HIDDEN"
            value={hiddenCategories.toString()}
            subNote=""
            icon={
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
          <AdminStatCard
            title="ASSIGNED PRODUCTS"
            value={totalProductsAssigned.toLocaleString()}
            subNote=""
            icon={
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
          />
        </div>

        {/* Dynamic List & Form Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Categories Table takes full or 2/3 space */}
          <div className={`${isFormOpen ? "lg:col-span-2" : "lg:col-span-3"} bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden flex flex-col`}>
            <CategoryTable
              categories={filteredCategories}
              onEdit={handleEditClick}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          </div>

          {/* Form inline card on the side */}
          {isFormOpen && (
            <div className="lg:col-span-1">
              <CategoryForm
                initialData={editingCategory}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingCategory(null);
                }}
              />
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
