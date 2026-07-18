import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminProductFormData, AdminProductMedia, AdminProductVariant, AdminCategory } from "@/types/admin";
import { createProduct, updateProduct, archiveProduct } from "@/services/products.service";
import { getAdminCategories } from "@/services/categories.service";
import { uploadFile } from "@/services/media.service";
import ProductBasicInfoSection from "./ProductBasicInfoSection";
import ProductPricingSection from "./ProductPricingSection";
import ProductMediaSection from "./ProductMediaSection";
import ProductInventorySection from "./ProductInventorySection";
import ProductVisibilitySection from "./ProductVisibilitySection";
import ProductVariantsSection from "./ProductVariantsSection";
import ProductPreviewCard from "./ProductPreviewCard";

interface ProductFormProps {
  initialData?: AdminProductFormData;
  mode: "create" | "edit";
}

const defaultFormData: AdminProductFormData = {
  name: "",
  sku: "",
  slug: "",
  shortDescription: "",
  description: "",
  category: "",
  gender: "Unisex",
  occasion: "Everyday",
  material: "Gold",
  sellingPrice: "",
  mrp: "",
  discountPercent: 0,
  taxCategory: "GST 3%",
  costPrice: "",
  trackInventory: true,
  initialStock: 10,
  minStock: 2,
  allowBackorder: false,
  status: "Draft",
  isFeatured: false,
  isNewArrival: true,
  isBestSeller: false,
  showOnHomepage: false,
  publishDate: "",
  media: [],
  variants: [],
};

export default function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<AdminProductFormData>(initialData || defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState<'archive' | 'restore' | null>(null);

  useEffect(() => {
    getAdminCategories().then((data) => {
      // Backend returns isActive: boolean; AdminCategory type declares status (mismatch).
      // Cast to access the real field and keep only active categories.
      const active = (data as unknown as { id: string; name: string; isActive: boolean }[]).filter(
        (c) => c.isActive
      );
      setCategories(active as unknown as AdminCategory[]);
      setCategoriesLoading(false);
    });
  }, []);


  const handleFieldChange = (
    field: keyof AdminProductFormData,
    value: string | number | boolean | AdminProductMedia[] | AdminProductVariant[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error on type
    if (errors[field as string]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field as string];
        return copy;
      });
    }
  };

  const handleMediaChange = (media: AdminProductMedia[]) => {
    handleFieldChange("media", media);
  };

  const handleVariantsChange = (variants: AdminProductVariant[]) => {
    handleFieldChange("variants", variants);
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Product name is required";
    if (!formData.sku.trim()) tempErrors.sku = "SKU is required";
    if (!formData.slug.trim()) tempErrors.slug = "Slug is required";
    if (!formData.category) tempErrors.category = "Category selection is required";
    if (!formData.mrp) tempErrors.mrp = "MRP is required";
    if (!formData.sellingPrice) tempErrors.sellingPrice = "Selling price is required";

    const mrpNum = parseFloat(formData.mrp);
    const sellNum = parseFloat(formData.sellingPrice);
    if (mrpNum && sellNum && sellNum > mrpNum) {
      tempErrors.sellingPrice = "Selling price cannot exceed MRP";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, statusOverride?: "Draft" | "Active") => {
    e.preventDefault();

    if (!validateForm()) {
      setToastMessage("Please fix the errors before submitting.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload files to S3/fallback storage asynchronously
      const uploadPromises = formData.media.map(async (m) => {
        if (m.file) {
          const uploadedUrl = await uploadFile(m.file, "products/images");
          // Remove the File object from the object so it doesn't get serialized to JSON
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { file, ...rest } = m;
          return {
            ...rest,
            url: uploadedUrl,
          };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { file, ...rest } = m;
        return rest;
      });
      const finalMedia = await Promise.all(uploadPromises);

      // 2. Prepare payload to match NestJS DTO specifications
      const finalStatus = statusOverride || formData.status;
      const { isNewArrival, isBestSeller, isFeatured } = formData;
      
      const payload = {
        name: formData.name,
        sku: formData.sku,
        slug: formData.slug,
        shortDescription: formData.shortDescription || undefined,
        description: formData.description || undefined,
        sellingPrice: parseFloat(formData.sellingPrice),
        mrp: parseFloat(formData.mrp),
        costPrice: formData.costPrice ? parseFloat(formData.costPrice) : undefined,
        categoryId: formData.category,
        status: finalStatus,
        featured: isFeatured,
        newArrival: isNewArrival,
        bestSeller: isBestSeller,
        showOnHomepage: formData.showOnHomepage,
        occasion: formData.occasion,
        gender: formData.gender,
        trackInventory: formData.trackInventory,
        initialStock: Number(formData.initialStock),
        minStock: Number(formData.minStock),
        images: finalMedia.map((m, index) => ({
          url: m.url,
          altText: m.altText || "",
          isPrimary: m.imageRole === "PRIMARY",
          imageRole: m.imageRole || "GALLERY",
          sortOrder: index + 1,
        })),
        variants: formData.variants.map((v) => ({
          id: v.id || undefined,
          name: v.name,
          sku: v.sku,
          sellingPrice: v.price ? parseFloat(v.price) : undefined,
          isActive: v.status === "Active",
        })),
      };

      // 3. Call backend services
      if (mode === "create") {
        await createProduct(payload);
      } else {
        const productId = initialData?.id;
        if (!productId) {
          throw new Error("Product ID not found for editing");
        }
        await updateProduct(productId, payload);
      }

      const actionText = mode === "create" ? "created" : "updated";
      setToastMessage(`Product successfully ${actionText} as ${finalStatus}!`);
      
      setTimeout(() => {
        setToastMessage(null);
        router.push("/admin/products");
      }, 1500);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Failed to save product.";
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1C1B19] text-white border border-[#C99213] rounded-lg shadow-xl px-5 py-3 text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <svg className="w-4 h-4 text-[#C99213]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Form Main Layout */}
      <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns - Form Cards */}
        <div className="lg:col-span-2 space-y-6">
          <ProductBasicInfoSection
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
            categories={categories}
            categoriesLoading={categoriesLoading}
          />

          <ProductPricingSection
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
          />

          <ProductMediaSection
            media={formData.media}
            onChange={handleMediaChange}
          />

          <ProductInventorySection
            formData={formData}
            onChange={handleFieldChange}
            mode={mode}
          />

          <ProductVariantsSection
            variants={formData.variants}
            onChange={handleVariantsChange}
            basePrice={formData.sellingPrice}
            baseSku={formData.sku}
            productId={formData.id}
            mode={mode}
          />

          <ProductVisibilitySection
            formData={formData}
            onChange={handleFieldChange}
          />

          {/* Form Actions footer */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/products")}
                className="px-6 py-2.5 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                Cancel
              </button>
              {mode === "edit" && initialData?.id && (
                <button
                  type="button"
                  onClick={() => setConfirmAction(initialData.status === "Archived" ? "restore" : "archive")}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-colors cursor-pointer ${
                    initialData.status === "Archived"
                      ? "border-emerald-300 hover:bg-emerald-50 text-emerald-650"
                      : "border-rose-300 hover:bg-rose-50 text-rose-650"
                  }`}
                >
                  {initialData.status === "Archived" ? "Restore Product" : "Archive Product"}
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={(e) => {
                  setFormData((prev) => ({ ...prev, status: "Draft" }));
                  handleSubmit(e, "Draft");
                }}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full text-xs font-semibold tracking-wide transition-all border border-neutral-300 cursor-pointer disabled:opacity-50"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setFormData((prev) => ({ ...prev, status: "Active" }));
                  handleSubmit(e, "Active");
                }}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : mode === "create" ? "Publish Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        {confirmAction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 font-questrial" role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-2">
                {confirmAction === 'archive' ? 'Archive Product' : 'Restore Product'}
              </h3>
              <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
                {confirmAction === 'archive'
                  ? `Are you sure you want to archive "${formData.name}"? It will be hidden from the storefront, but historical transactions and records will remain safe.`
                  : `Are you sure you want to restore "${formData.name}"? It will become visible on the storefront again.`}
              </p>
              <div className="flex justify-end space-x-3 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setConfirmAction(null)}
                  className="px-4 py-2 border border-neutral-300 rounded text-neutral-650 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const action = confirmAction;
                    setConfirmAction(null);
                    if (initialData?.id) {
                      setIsSubmitting(true);
                      try {
                        if (action === 'archive') {
                          await archiveProduct(initialData.id);
                        } else {
                          await updateProduct(initialData.id, { status: 'ACTIVE' });
                        }
                        router.push("/admin/products");
                      } catch (err) {
                        console.error(err);
                      } finally {
                        setIsSubmitting(false);
                      }
                    }
                  }}
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-white rounded shadow-sm cursor-pointer disabled:opacity-50 ${
                    confirmAction === 'archive'
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Column - Catalog Live Preview */}
        <div className="lg:col-span-1">
          <ProductPreviewCard formData={formData} />
        </div>
      </form>
    </div>
  );
}
