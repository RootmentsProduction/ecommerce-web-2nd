import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminProductFormData, AdminProductMedia, AdminProductVariant } from "@/types/admin";
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

  const handleSubmit = (e: React.FormEvent, statusOverride?: "Draft" | "Active") => {
    e.preventDefault();

    if (!validateForm()) {
      setToastMessage("Please fix the errors before submitting.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsSubmitting(true);
    
    // Simulating save
    setTimeout(() => {
      setIsSubmitting(false);
      const actionText = mode === "create" ? "created" : "updated";
      const finalStatus = statusOverride || formData.status;
      
      setToastMessage(`Product successfully ${actionText} as ${finalStatus}!`);
      
      setTimeout(() => {
        setToastMessage(null);
        router.push("/admin/products");
      }, 1500);
    }, 1000);
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
          />

          <ProductVariantsSection
            variants={formData.variants}
            onChange={handleVariantsChange}
            basePrice={formData.sellingPrice}
            baseSku={formData.sku}
          />

          <ProductVisibilitySection
            formData={formData}
            onChange={handleFieldChange}
          />

          {/* Form Actions footer */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="px-6 py-2.5 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Cancel
            </button>

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

        {/* Right Column - Catalog Live Preview */}
        <div className="lg:col-span-1">
          <ProductPreviewCard formData={formData} />
        </div>
      </form>
    </div>
  );
}
