"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import { Plus, ArrowRight, X, ChevronDown } from "lucide-react";
import { PurchaseOrder, POItem } from "@/types/purchase-order";
import { Vendor } from "@/types/vendor";
import { localStorageService, INDIAN_STATES } from "@/services/localStorage.service";
import { adminProductsDetailFixture } from "@/data/fixtures/products";
import PortalDropdown from "@/components/admin/shared/PortalDropdown";

// Deliver-to Warehouse Options
const WAREHOUSES = [
  {
    name: "Mumbai Central Warehouse",
    state: "Maharashtra",
    address: "Building 4B, Sanjay Gandhi Industrial Estate, Kandivali East, Mumbai, MH - 400101"
  },
  {
    name: "Bengaluru Design Studio",
    state: "Karnataka",
    address: "75/C, 2nd Main Road, Indiranagar, Bengaluru, KA - 560038"
  },
  {
    name: "Delhi Boutique Store",
    state: "Delhi",
    address: "G-8, South Extension I, Main Ring Road, New Delhi, DL - 110049"
  }
];

// Product catalog options mapped from fixtures
const PRODUCTS = Object.values(adminProductsDetailFixture).map((p) => ({
  sku: p.sku,
  name: p.name,
  description: p.shortDescription || p.description,
  costPrice: Number(p.costPrice || 0) || Number(p.sellingPrice || 0) * 0.7 // fallback
}));

// Tax Rates
const TAX_RATES = [
  { label: "GST 0% [0%]", value: 0 },
  { label: "GST 3% [3%]", value: 3 }, // Common jewelry tax rate in India
  { label: "GST 5% [5%]", value: 5 },
  { label: "GST 12% [12%]", value: 12 },
  { label: "GST 18% [18%]", value: 18 },
  { label: "GST 28% [28%]", value: 28 },
  { label: "Out of Scope [0%]", value: 0 },
  { label: "Non-GST [0%]", value: 0 }
];

const TDS_TCS_OPTIONS = [
  { label: "None", value: 0 },
  { label: "Contractors [2%]", value: 2 },
  { label: "Professional Fees [10%]", value: 10 },
  { label: "Commission / Brokerage [5%]", value: 5 },
  { label: "TCS on Goods [0.1%]", value: 0.1 }
];

interface PurchaseOrderFormProps {
  initialPOId?: string;
}

export default function PurchaseOrderForm({ initialPOId }: PurchaseOrderFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = !!initialPOId;

  // Vendors lists
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  
  // Header details
  const [poNumber, setPoNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [date, setDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [shipmentPreference, setShipmentPreference] = useState("Insured Air Cargo");
  
  // Deliver-to Warehouse
  const [selectedWarehouseIdx, setSelectedWarehouseIdx] = useState(0);

  // Modal portal state for New Vendor Creation
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  // Line items
  const [items, setItems] = useState<POItem[]>([
    { sku: "", name: "", size: "16", quantity: 1, rate: 0, taxRate: 3, taxAmount: 0, amount: 0 }
  ]);

  // Financial summary panel state
  const [discountType, setDiscountType] = useState<"line" | "transaction">("transaction");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountUnit, setDiscountUnit] = useState<"%" | "₹">("%");
  const [discountAfterTax, setDiscountAfterTax] = useState(false);
  
  // TDS/TCS details
  const [tdsTcsType, setTdsTcsType] = useState<"TDS" | "TCS" | "None">("None");
  const [tdsTcsName, setTdsTcsName] = useState("None");
  const [tdsTcsRate, setTdsTcsRate] = useState(0);
  
  // Adjustments & Notes
  const [adjustment, setAdjustment] = useState(0);
  const [customerNotes, setCustomerNotes] = useState("Please ensure assay certificates are included.");
  const [termsAndConditions, setTermsAndConditions] = useState("Goods subject to purity inspection upon arrival.");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [fileInputVal, setFileInputVal] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 1. Initial configuration
  useEffect(() => {
    // Load vendors list
    const activeVendors = localStorageService.getVendors();
    
    // Default dates
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const twoWeeksLater = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    
    Promise.resolve().then(() => {
      setVendors(activeVendors);

      // Set auto-generated PO number
      if (!isEdit) {
        const generatedNo = `PO-${String(Math.floor(1000 + Math.random() * 9000))}`;
        setPoNumber(generatedNo);
        setDate(today);
        setDeliveryDate(twoWeeksLater);

        // Pre-select vendor from search query if any
        const qVendorId = searchParams.get("vendorId");
        if (qVendorId) {
          setSelectedVendorId(qVendorId);
        } else if (activeVendors.length > 0) {
          setSelectedVendorId(activeVendors[0].id);
        }
      } else if (isEdit && initialPOId) {
        // Prepopulate
        const po = localStorageService.getPurchaseOrderById(initialPOId);
        if (po) {
          setPoNumber(po.id);
          setSelectedVendorId(po.vendorId);
          setReferenceNumber(po.referenceNumber || "");
          
          // Convert dates from DD/MM/YYYY back to YYYY-MM-DD for picker
          const parseDate = (dStr?: string) => {
            if (!dStr) return "";
            const parts = dStr.split("/");
            if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
            return dStr;
          };
          setDate(parseDate(po.date));
          setDeliveryDate(parseDate(po.deliveryDate));
          
          setPaymentTerms(po.paymentTerms);
          setShipmentPreference(po.shipmentPreference || "");
          
          // Match warehouse
          const wIdx = WAREHOUSES.findIndex((w) => w.name === po.deliverToBranch);
          if (wIdx >= 0) setSelectedWarehouseIdx(wIdx);
          
          setItems(po.items);
          setDiscountType(po.discountType);
          setDiscountValue(po.discountValue);
          setDiscountUnit(po.discountUnit);
          setDiscountAfterTax(po.discountAfterTax);
          
          setTdsTcsType(po.tdsTcsType);
          setTdsTcsRate(po.tdsTcsRate);
          setTdsTcsName(po.tdsTcsName || "None");
          
          setAdjustment(po.adjustment);
          setCustomerNotes(po.customerNotes || "");
          setTermsAndConditions(po.termsAndConditions || "");
          setAttachments(po.attachments || []);
        }
      }
    });
  }, [isEdit, initialPOId, searchParams]);

  // Listen to new vendor added triggers from portal modal
  const handleReloadVendors = (newId?: string) => {
    const updated = localStorageService.getVendors();
    setVendors(updated);
    if (newId) {
      setSelectedVendorId(newId);
    }
  };

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);
  const selectedWarehouse = WAREHOUSES[selectedWarehouseIdx];

  // Helper calculations
  const calculateLineAmount = (qty: number, rate: number) => {
    return Number((qty * rate).toFixed(2));
  };

  const handleRowItemChange = (idx: number, sku: string) => {
    const match = PRODUCTS.find((p) => p.sku === sku);
    if (match) {
      const updated = [...items];
      updated[idx] = {
        ...updated[idx],
        sku,
        name: match.name,
        rate: match.costPrice,
        amount: calculateLineAmount(updated[idx].quantity, match.costPrice)
      };
      setItems(updated);
    }
  };

  const handleRowQtyChange = (idx: number, qty: number) => {
    const updated = [...items];
    updated[idx] = {
      ...updated[idx],
      quantity: qty,
      amount: calculateLineAmount(qty, updated[idx].rate)
    };
    setItems(updated);
  };

  const handleRowRateChange = (idx: number, rate: number) => {
    const updated = [...items];
    updated[idx] = {
      ...updated[idx],
      rate,
      amount: calculateLineAmount(updated[idx].quantity, rate)
    };
    setItems(updated);
  };

  const handleRowTaxChange = (idx: number, taxRate: number) => {
    const updated = [...items];
    updated[idx] = {
      ...updated[idx],
      taxRate
    };
    setItems(updated);
  };

  const handleRowSizeChange = (idx: number, size: string) => {
    const updated = [...items];
    updated[idx] = {
      ...updated[idx],
      size
    };
    setItems(updated);
  };

  const addRow = () => {
    setItems([
      ...items,
      { sku: "", name: "", size: "16", quantity: 1, rate: 0, taxRate: 3, taxAmount: 0, amount: 0 }
    ]);
  };

  const removeRow = (idx: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  // FINANCIAL SUMMARY FORMULA LOGIC
  const subtotal = items.reduce((acc, current) => acc + (current.amount || 0), 0);

  // Compute Discount Amount
  let discountAmount = 0;
  if (discountType === "transaction" && discountValue > 0) {
    if (discountUnit === "%") {
      discountAmount = Number(((subtotal * discountValue) / 100).toFixed(2));
    } else {
      discountAmount = Number(discountValue.toFixed(2));
    }
  }

  // Tax split assessment
  const isIntraState = selectedVendor && selectedWarehouse && selectedVendor.sourceOfSupply === selectedWarehouse.state;
  const taxSplitType = isIntraState ? ("Intra-state" as const) : ("Inter-state" as const);

  // CGST, SGST, IGST totals
  let cgstAmount = 0;
  let sgstAmount = 0;
  let igstAmount = 0;
  let taxTotal = 0;

  // Map updated tax amounts to line items and gather global tax sum
  const calculatedItems = items.map((item) => {
    // If discount is applied before tax, discount line proportion or divide
    const lineProportion = subtotal > 0 ? item.amount / subtotal : 0;
    const lineDiscount = discountAfterTax ? 0 : discountAmount * lineProportion;
    const taxableLineAmount = Math.max(0, item.amount - lineDiscount);
    const taxAmount = Number(((taxableLineAmount * item.taxRate) / 100).toFixed(2));
    
    return {
      ...item,
      taxAmount
    };
  });

  const lineTaxes = calculatedItems.map((item) => {
    return {
      taxRate: item.taxRate,
      amount: item.taxAmount
    };
  });

  taxTotal = lineTaxes.reduce((sum, item) => sum + item.amount, 0);

  if (taxSplitType === "Intra-state") {
    cgstAmount = Number((taxTotal / 2).toFixed(2));
    sgstAmount = Number((taxTotal / 2).toFixed(2));
    igstAmount = 0;
  } else {
    igstAmount = taxTotal;
    cgstAmount = 0;
    sgstAmount = 0;
  }

  // TDS / TCS Calculations
  let tdsTcsAmount = 0;
  const tdsBasisValue = Math.max(0, subtotal - discountAmount); // Standard GST rules: TDS calculated on taxable value excluding tax
  if (tdsTcsType !== "None" && tdsTcsRate > 0) {
    tdsTcsAmount = Number(((tdsBasisValue * tdsTcsRate) / 100).toFixed(2));
  }

  // Adjustments & Final Total Calculation
  const totalTaxes = cgstAmount + sgstAmount + igstAmount;
  let finalTotal = subtotal - discountAmount + totalTaxes + Number(adjustment);
  
  if (tdsTcsType === "TDS") {
    // TDS is deducted from the payable total
    finalTotal -= tdsTcsAmount;
  } else if (tdsTcsType === "TCS") {
    // TCS is added to the payable total
    finalTotal += tdsTcsAmount;
  }

  finalTotal = Number(finalTotal.toFixed(2));

  // Attachment upload helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setAttachments([...attachments, ...names]);
      setFileInputVal("");
    }
  };

  const removeAttachment = (name: string) => {
    setAttachments(attachments.filter((f) => f !== name));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const validationErrors: Record<string, string> = {};
    if (!selectedVendorId) validationErrors.vendor = "Please select a vendor.";
    if (!poNumber) validationErrors.poNumber = "PO Number is required.";
    if (items.some((item) => !item.sku)) validationErrors.items = "Please select a product for all rows.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Convert dates from YYYY-MM-DD to DD/MM/YYYY for presentation
    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const parts = dateString.split("-");
      if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
      return dateString;
    };

    const poPayload: PurchaseOrder = {
      id: poNumber,
      vendorId: selectedVendorId,
      vendorName: selectedVendor?.displayName || "Unknown Vendor",
      vendorState: selectedVendor?.sourceOfSupply || "Maharashtra",
      deliverToBranch: selectedWarehouse.name,
      deliverToState: selectedWarehouse.state,
      deliverToAddress: selectedWarehouse.address,
      referenceNumber,
      date: formatDate(date),
      deliveryDate: formatDate(deliveryDate),
      paymentTerms,
      shipmentPreference,
      status: isEdit ? (localStorageService.getPurchaseOrderById(initialPOId!)?.status || "Draft") : "Draft",
      items: calculatedItems,
      subtotal,
      discountType,
      discountValue,
      discountUnit,
      discountAfterTax,
      discountAmount,
      taxSplitType,
      cgstAmount,
      sgstAmount,
      igstAmount,
      taxTotal,
      tdsTcsType,
      tdsTcsRate,
      tdsTcsAmount,
      tdsTcsName,
      adjustment,
      total: finalTotal,
      customerNotes,
      termsAndConditions,
      attachments,
      createdAt: isEdit ? (localStorageService.getPurchaseOrderById(initialPOId!)?.createdAt || new Date().toISOString()) : new Date().toISOString()
    };

    localStorageService.savePurchaseOrder(poPayload);
    router.push(`/admin/purchase-orders/${poNumber}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* PO Basic Information Block */}
        <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            Purchase Order Information
          </h2>

          {errors.vendor && (
            <div className="flex items-center space-x-2 text-xs text-red-650 bg-red-50 px-4 py-2 rounded-xl">
              <span>{errors.vendor}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Vendor Selector & Modal trigger */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Vendor</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <PortalDropdown
                    align="left"
                    trigger={(isOpen, toggle) => (
                      <button
                        type="button"
                        onClick={toggle}
                        className="w-full flex items-center justify-between px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-800 text-left cursor-pointer"
                      >
                        <span>
                          {selectedVendor
                            ? `${selectedVendor.displayName} [${selectedVendor.gstTreatment}]`
                            : "-- Choose Vendor --"}
                        </span>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      </button>
                    )}
                    renderContent={(close) => (
                      <div className="py-1 max-h-60 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedVendorId("");
                            close();
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs text-neutral-450 transition-colors"
                        >
                          -- Choose Vendor --
                        </button>
                        {vendors.map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              setSelectedVendorId(v.id);
                              close();
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                              selectedVendorId === v.id ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                            }`}
                          >
                            {v.displayName} [{v.gstTreatment}]
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsVendorModalOpen(true)}
                  className="px-4 py-2 border border-[#d7dcf5] hover:border-[#3762f9] rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap"
                >
                  + New Vendor
                </button>
              </div>

              {selectedVendor && (
                <div className="mt-2 text-[10px] text-neutral-455 font-medium">
                  Source of Supply: <span className="font-semibold text-neutral-700">{selectedVendor.sourceOfSupply}</span> &bull; Terms: <span className="font-semibold text-neutral-700">{selectedVendor.paymentTerms}</span>
                </div>
              )}
            </div>

            {/* Deliver To Branch */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Deliver To</label>
              <PortalDropdown
                align="left"
                trigger={(isOpen, toggle) => (
                  <button
                    type="button"
                    onClick={toggle}
                    className="w-full flex items-center justify-between px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-800 text-left cursor-pointer"
                  >
                    <span>{selectedWarehouse.name} [{selectedWarehouse.state}]</span>
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  </button>
                )}
                renderContent={(close) => (
                  <div className="py-1 max-h-60 overflow-y-auto">
                    {WAREHOUSES.map((w, idx) => (
                      <button
                        key={w.name}
                        type="button"
                        onClick={() => {
                          setSelectedWarehouseIdx(idx);
                          close();
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                          selectedWarehouseIdx === idx ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                        }`}
                      >
                        {w.name} [{w.state}]
                      </button>
                    ))}
                  </div>
                )}
              />
              <p className="mt-2 text-[10px] text-neutral-400 truncate font-medium">
                Address: {selectedWarehouse.address}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 border-t border-neutral-100 pt-5">
            {/* PO Number */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Purchase Order#</label>
              <input
                type="text"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-800 font-mono font-bold"
                required
              />
            </div>

            {/* Reference Number */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Reference Number</label>
              <input
                type="text"
                placeholder="e.g. REF-1234"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-800"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-800"
                required
              />
            </div>

            {/* Delivery Date */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Expected Delivery Date</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            {/* Payment Terms */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Payment Terms</label>
              <PortalDropdown
                align="left"
                trigger={(isOpen, toggle) => (
                  <button
                    type="button"
                    onClick={toggle}
                    className="w-full flex items-center justify-between px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-800 text-left cursor-pointer"
                  >
                    <span>{paymentTerms}</span>
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  </button>
                )}
                renderContent={(close) => (
                  <div className="py-1 max-h-60 overflow-y-auto">
                    {["Due on Receipt", "Net 15", "Net 30", "Net 45", "Net 60"].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setPaymentTerms(term);
                          close();
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                          paymentTerms === term ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Shipment Preference */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Shipment Preference</label>
              <input
                type="text"
                placeholder="e.g. Insured Air Cargo, Vault Delivery"
                value={shipmentPreference}
                onChange={(e) => setShipmentPreference(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-800"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Line Items Table Block */}
        <div className="bg-white border border-[#e1e5f5] rounded-3xl overflow-hidden shadow-[0_30px_90px_-40px_rgba(15,23,42,0.15)] flex flex-col">
          
          <div className="p-5 border-b border-[#e1e5f5] bg-[#f5f6ff] flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">Line Items</h3>
            {errors.items && <span className="text-xs text-red-650 font-semibold">{errors.items}</span>}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e1e5f5] text-[10px] font-bold uppercase tracking-wider text-neutral-450 bg-neutral-50/50">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Item details</th>
                  <th className="py-3 px-4 w-28">Size</th>
                  <th className="py-3 px-4 w-28 text-right">Quantity</th>
                  <th className="py-3 px-4 w-32 text-right">Rate</th>
                  <th className="py-3 px-4 w-40 text-left">GST Tax Option</th>
                  <th className="py-3 px-4 w-32 text-right">Amount (₹)</th>
                  <th className="py-3 px-4 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e5f5]">
                {items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/30">
                    {/* Index */}
                    <td className="py-3 px-4 text-xs font-bold text-neutral-400 text-center">
                      {idx + 1}
                    </td>

                    {/* Item selector */}
                    <td className="py-3 px-4">
                      <PortalDropdown
                        align="left"
                        trigger={(isOpen, toggle) => (
                          <button
                            type="button"
                            onClick={toggle}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] text-neutral-800 text-left cursor-pointer"
                          >
                            <span className="truncate">
                              {item.sku
                                ? `${PRODUCTS.find((p) => p.sku === item.sku)?.name} (${item.sku})`
                                : "-- Select Product --"}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 ml-1" />
                          </button>
                        )}
                        renderContent={(close) => (
                          <div className="py-1 max-h-60 overflow-y-auto max-w-[320px]">
                            <button
                              type="button"
                              onClick={() => {
                                handleRowItemChange(idx, "");
                                close();
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs text-neutral-400 transition-colors"
                            >
                              -- Select Product --
                            </button>
                            {PRODUCTS.map((p) => (
                              <button
                                key={p.sku}
                                type="button"
                                onClick={() => {
                                  handleRowItemChange(idx, p.sku);
                                  close();
                                }}
                                className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                                  item.sku === p.sku ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                                }`}
                              >
                                <div className="font-semibold truncate text-left">{p.name}</div>
                                <div className="text-[10px] text-neutral-455 mt-0.5 text-left">
                                  SKU: {p.sku} &bull; ₹{p.costPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      />
                      {item.sku && (
                        <p className="mt-1 text-[10px] text-neutral-400 leading-normal line-clamp-1">
                          {PRODUCTS.find((p) => p.sku === item.sku)?.description}
                        </p>
                      )}
                    </td>

                    {/* Size */}
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={item.size}
                        onChange={(e) => handleRowSizeChange(idx, e.target.value)}
                        placeholder="Size"
                        className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none text-center"
                      />
                    </td>

                    {/* Quantity */}
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min={0.01}
                        step={0.01}
                        value={item.quantity}
                        onChange={(e) => handleRowQtyChange(idx, Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none text-right font-medium"
                        required
                      />
                    </td>

                    {/* Rate */}
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={item.rate}
                        onChange={(e) => handleRowRateChange(idx, Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none text-right font-medium"
                        required
                      />
                    </td>

                    {/* Tax Dropdown */}
                    <td className="py-3 px-4">
                      <PortalDropdown
                        align="left"
                        trigger={(isOpen, toggle) => (
                          <button
                            type="button"
                            onClick={toggle}
                            className="w-full flex items-center justify-between px-2 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] text-neutral-800 text-left cursor-pointer"
                          >
                            <span>{TAX_RATES.find((t) => t.value === item.taxRate)?.label || `${item.taxRate}%`}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 ml-1" />
                          </button>
                        )}
                        renderContent={(close) => (
                          <div className="py-1 max-h-60 overflow-y-auto">
                            {TAX_RATES.map((t) => (
                              <button
                                key={t.label}
                                type="button"
                                onClick={() => {
                                  handleRowTaxChange(idx, t.value);
                                  close();
                                }}
                                className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                                  item.taxRate === t.value ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                                }`}
                              >
                                {t.label}
                              </button>
                            ))}
                          </div>
                        )}
                      />
                    </td>

                    {/* Line Amount */}
                    <td className="py-3 px-4 text-right text-xs font-bold text-neutral-800">
                      ₹{item.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>

                    {/* Delete action */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(idx)}
                        className={`text-neutral-400 hover:text-red-500 cursor-pointer ${
                          items.length === 1 ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                        disabled={items.length === 1}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-neutral-50/50 border-t border-[#e1e5f5]">
            <button
              type="button"
              onClick={addRow}
              className="flex items-center space-x-1.5 px-4 py-2 bg-[#3762f9]/10 text-[#3762f9] hover:bg-[#3762f9]/20 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Row</span>
            </button>
          </div>

        </div>

        {/* BOTTOM FINANCIAL SUMMARY BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Notes and Terms area */}
          <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Customer Notes</label>
              <textarea
                rows={3}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full px-4 py-3 bg-[#f5f7fb] border border-[#d7dcf5] rounded-2xl text-xs outline-none text-neutral-800"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Terms & Conditions</label>
              <textarea
                rows={3}
                value={termsAndConditions}
                onChange={(e) => setTermsAndConditions(e.target.value)}
                className="w-full px-4 py-3 bg-[#f5f7fb] border border-[#d7dcf5] rounded-2xl text-xs outline-none text-neutral-800"
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Attachments</label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    value={fileInputVal}
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 border border-[#e1e5f5] rounded-xl bg-white text-neutral-700 text-xs font-semibold cursor-pointer"
                  >
                    Choose Files
                  </button>
                </div>
              </div>

              {attachments.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {attachments.map((f) => (
                    <div
                      key={f}
                      className="flex items-center space-x-2 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-xl text-xs font-medium text-neutral-700"
                    >
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(f)}
                        className="text-neutral-450 hover:text-red-500 cursor-pointer"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Core computations panel */}
          <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 md:p-8 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.15)] space-y-4">
            
            {/* 1. Subtotal */}
            <div className="flex justify-between items-center text-xs font-medium pb-2 border-b border-neutral-100">
              <span className="text-neutral-450 uppercase tracking-wider">Subtotal</span>
              <span className="text-neutral-800 font-bold">
                ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* 2. Discount */}
            <div className="py-2 border-b border-neutral-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-455 font-semibold">Discount</span>
                <div className="flex gap-2">
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as "line" | "transaction")}
                    className="px-2 py-1 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-[10px] outline-none font-bold"
                  >
                    <option value="line">Line Level</option>
                    <option value="transaction">Transaction Level</option>
                  </select>
                  
                  {discountType === "transaction" && (
                    <div className="flex border border-[#d7dcf5] rounded-lg overflow-hidden bg-[#f5f7fb] text-[10px] font-bold">
                      <button
                        type="button"
                        onClick={() => setDiscountUnit("%")}
                        className={`px-2.5 py-1 cursor-pointer transition-all ${discountUnit === "%" ? "bg-neutral-800 text-white" : ""}`}
                      >
                        %
                      </button>
                      <button
                        type="button"
                        onClick={() => setDiscountUnit("₹")}
                        className={`px-2.5 py-1 cursor-pointer transition-all ${discountUnit === "₹" ? "bg-neutral-800 text-white" : ""}`}
                      >
                        ₹
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {discountType === "transaction" && (
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="number"
                    min={0}
                    placeholder="Enter discount value"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-28 px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none text-right font-medium"
                  />
                  <div className="text-xs text-neutral-500 font-semibold flex items-center gap-2">
                    <span>Amount:</span>
                    <span className="text-neutral-800">
                      -₹{discountAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}

              {discountType === "transaction" && (
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="discountAfterTax"
                    checked={discountAfterTax}
                    onChange={(e) => setDiscountAfterTax(e.target.checked)}
                    className="rounded border-neutral-300"
                  />
                  <label htmlFor="discountAfterTax" className="text-[10px] text-neutral-450 font-bold uppercase tracking-wide cursor-pointer">
                    Apply discount after tax
                  </label>
                </div>
              )}
            </div>

            {/* 3. GST Tax Breakdowns */}
            <div className="py-2 border-b border-neutral-100 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-455">
                <span>Tax Category Breakdowns</span>
                <span className="text-[10px] bg-[#f5f6ff] text-[#3762f9] px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                  {taxSplitType}
                </span>
              </div>
              
              {taxSplitType === "Intra-state" ? (
                <>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-450 italic">CGST Split (50% of GST)</span>
                    <span className="text-neutral-800 font-medium">
                      ₹{cgstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-455 italic">SGST Split (50% of GST)</span>
                    <span className="text-neutral-800 font-medium">
                      ₹{sgstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-455 italic">IGST Split (100% of GST)</span>
                  <span className="text-neutral-800 font-medium">
                    ₹{igstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}
            </div>

            {/* 4. TDS / TCS Deduction Selection */}
            <div className="py-2 border-b border-neutral-100 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-455">
                <span>TDS / TCS Selection</span>
                <div className="flex gap-4">
                  {(["None", "TDS", "TCS"] as const).map((type) => (
                    <label key={type} className="inline-flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="tdsTcsType"
                        checked={tdsTcsType === type}
                        onChange={() => {
                          setTdsTcsType(type);
                          if (type === "None") {
                            setTdsTcsRate(0);
                            setTdsTcsName("None");
                          } else {
                            const standardOpt = TDS_TCS_OPTIONS.find((o) => o.value > 0);
                            if (standardOpt) {
                              setTdsTcsRate(standardOpt.value);
                              setTdsTcsName(standardOpt.label);
                            }
                          }
                        }}
                        className="text-[#3762f9] focus:ring-[#3762f9]"
                      />
                      <span className="text-xs text-neutral-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {tdsTcsType !== "None" && (
                <div className="flex items-center justify-between gap-4">
                  <PortalDropdown
                    align="left"
                    trigger={(isOpen, toggle) => (
                      <button
                        type="button"
                        onClick={toggle}
                        className="flex items-center justify-between px-2.5 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none text-neutral-800 text-left cursor-pointer min-w-[180px]"
                      >
                        <span>{tdsTcsName}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-400 ml-2" />
                      </button>
                    )}
                    renderContent={(close) => (
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {TDS_TCS_OPTIONS.filter((o) => o.value > 0).map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => {
                              setTdsTcsName(opt.label);
                              setTdsTcsRate(opt.value);
                              close();
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                              tdsTcsName === opt.label ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />

                  <div className="text-xs text-neutral-500 font-semibold flex items-center gap-2">
                    <span>{tdsTcsType === "TDS" ? "Deduction:" : "Addition:"}</span>
                    <span className={tdsTcsType === "TDS" ? "text-red-500" : "text-emerald-600"}>
                      {tdsTcsType === "TDS" ? "-" : "+"}₹{tdsTcsAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Adjustments */}
            <div className="flex justify-between items-center py-2 border-b border-neutral-100">
              <span className="text-xs text-neutral-450 uppercase tracking-wider">Adjustments</span>
              <input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(Number(e.target.value))}
                className="w-24 px-3 py-1 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none text-right font-medium"
              />
            </div>

            {/* 6. Grand Total */}
            <div className="flex justify-between items-center pt-4">
              <span className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Final Total (INR)</span>
              <span className="text-lg font-bold text-[#3762f9]">
                ₹{finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

          </div>

        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-3 justify-end pt-4 border-t border-[#e1e5f5]">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-[#e1e5f5] rounded-full bg-white text-neutral-700 hover:bg-neutral-50 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center space-x-2 px-8 py-3 bg-[#3762f9] hover:bg-[#2748c9] text-white rounded-full text-xs font-bold tracking-wide transition-all shadow-[0_4px_12px_rgba(55,98,249,0.2)] cursor-pointer"
          >
            <span>Save Purchase Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

      {/* REACT PORTAL OVERLAY MODAL FOR CREATING A NEW VENDOR ON-THE-FLY */}
      {isVendorModalOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white border border-[#e1e5f5] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsVendorModalOpen(false)}
                className="absolute right-6 top-6 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-500 rounded-xl cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-neutral-900 tracking-tight">Onboard New Vendor</h3>
                <p className="text-xs text-neutral-500">Add a supplier without losing your current Purchase Order form entries.</p>
              </div>

              {/* Vendor Form Container */}
              <div className="border-t border-neutral-150 pt-5">
                {/* Custom Wrapper of VendorForm that handles submission completion locally instead of direct redirection */}
                <CustomOnTheFlyVendorForm
                  onComplete={(newVendor) => {
                    handleReloadVendors(newVendor.id);
                    setIsVendorModalOpen(false);
                  }}
                  onCancel={() => setIsVendorModalOpen(false)}
                />
              </div>

            </div>
          </div>,
          document.body
        )}
    </>
  );
}

// Inner Helper component for registering vendor in portal popup
function CustomOnTheFlyVendorForm({ onComplete, onCancel }: { onComplete: (v: Vendor) => void; onCancel: () => void }) {
  // Simple form properties
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [gstTreatment, setGstTreatment] = useState("Registered Business - Regular");
  const [sourceOfSupply, setSourceOfSupply] = useState("Maharashtra");
  const [gstin, setGstin] = useState("");
  const [pan, setPan] = useState("");

  const handleGstinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setGstin(val);
    if (val.length >= 10) {
      setPan(val.substring(2, 12));
    }
  };

  const getDisplayNameOptions = () => {
    const list = [];
    const fullName = `${firstName} ${lastName}`.trim();
    if (fullName) list.push(fullName);
    if (companyName) list.push(companyName);
    if (companyName && fullName) {
      list.push(`${companyName} (${fullName})`);
    }
    return list;
  };

  useEffect(() => {
    const opts = getDisplayNameOptions();
    if (opts.length > 0 && !displayName) {
      Promise.resolve().then(() => {
        setDisplayName(opts[0]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, companyName]);

  const handleFormSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName) return;

    const id = `VND-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const newVendor: Vendor = {
      id,
      salutation: "Mr.",
      firstName,
      lastName,
      companyName: companyName || displayName,
      displayName,
      email,
      workPhone: "",
      mobile: "",
      language: "English",
      gstTreatment,
      sourceOfSupply,
      pan,
      gstin,
      currency: "INR - Indian Rupee",
      paymentTerms: "Net 30",
      tdsRate: "None",
      billingAddress: { street1: "Main St", city: "Mumbai", state: sourceOfSupply, zipCode: "400001" },
      shippingAddress: { street1: "Main St", city: "Mumbai", state: sourceOfSupply, zipCode: "400001" },
      contactPersons: [],
      bankAccounts: [],
      remarks: "Onboarded during Purchase Order drafting.",
      payables: 0,
      unusedCredits: 0,
      status: "Active",
      createdAt: new Date().toISOString()
    };

    localStorageService.saveVendor(newVendor);
    onComplete(newVendor);
  };

  return (
    <form onSubmit={handleFormSave} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Company Name</label>
          <input
            type="text"
            placeholder="e.g. Apex Jewelry Sourcing"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Contact Email</label>
          <input
            type="email"
            placeholder="vendor@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Display Name</label>
          <input
            type="text"
            placeholder="Enter Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
        <div>
          <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">GST Treatment</label>
          <PortalDropdown
            align="left"
            trigger={(isOpen, toggle) => (
              <button
                type="button"
                onClick={toggle}
                className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none text-neutral-800 text-left cursor-pointer"
              >
                <span>{gstTreatment}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 ml-1" />
              </button>
            )}
            renderContent={(close) => (
              <div className="py-1 max-h-60 overflow-y-auto">
                {[
                  "Registered Business - Regular",
                  "Registered Business - Composition",
                  "Unregistered",
                  "Overseas"
                ].map((treat) => (
                  <button
                    key={treat}
                    type="button"
                    onClick={() => {
                      setGstTreatment(treat);
                      close();
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                      gstTreatment === treat ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                    }`}
                  >
                    {treat}
                  </button>
                ))}
              </div>
            )}
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">Source of Supply / State</label>
          <PortalDropdown
            align="left"
            trigger={(isOpen, toggle) => (
              <button
                type="button"
                onClick={toggle}
                className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none text-neutral-800 text-left cursor-pointer"
              >
                <span>{sourceOfSupply}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 ml-1" />
              </button>
            )}
            renderContent={(close) => (
              <div className="py-1 max-h-60 overflow-y-auto">
                {INDIAN_STATES.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setSourceOfSupply(st);
                      close();
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                      sourceOfSupply === st ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">GSTIN</label>
          <input
            type="text"
            maxLength={15}
            placeholder="e.g. 27BBBBB2222B2Z2"
            value={gstin}
            onChange={handleGstinChange}
            className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none uppercase"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">PAN</label>
          <input
            type="text"
            maxLength={10}
            placeholder="Auto-extracted"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
            className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none uppercase"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-4 border-t border-neutral-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border border-neutral-250 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#3762f9] hover:bg-[#2748c9] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
        >
          Add and Select Vendor
        </button>
      </div>

    </form>
  );
}
