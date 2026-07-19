"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { Plus, X, Trash2, ArrowRight } from "lucide-react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminTabs from "@/components/admin/shared/AdminTabs";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { getOrders, getCustomers, placeOrder } from "@/services/orders.service";
import { getAdminProducts, getAdminProductById } from "@/services/products.service";
import { AdminOrder, AdminCustomer, AdminProduct } from "@/types/admin";

interface OrderItemRow {
  productId: string;
  variantId: string;
  name: string;
  sku: string;
  variantName: string;
  quantity: number;
  price: number;
  variants: any[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");

  // Create Order Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [productsList, setProductsList] = useState<AdminProduct[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  
  // Shipping Address
  const [shippingStreet, setShippingStreet] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  
  // Billing Address
  const [isBillingSame, setIsBillingSame] = useState(true);
  const [billingStreet, setBillingStreet] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  
  const [orderItems, setOrderItems] = useState<OrderItemRow[]>([
    { productId: "", variantId: "", name: "", sku: "", variantName: "", quantity: 1, price: 0, variants: [] }
  ]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const breadcrumbs = [{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Orders" }];

  const tabs = [
    "All Orders",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returns",
  ];

  const loadAllOrders = () => {
    getOrders().then(setOrders);
  };

  useEffect(() => {
    loadAllOrders();
  }, []);

  // Fetch customers & products when modal opens
  useEffect(() => {
    if (isCreateModalOpen) {
      getCustomers().then(setCustomers);
      getAdminProducts().then(setProductsList);
    }
  }, [isCreateModalOpen]);

  // Filter orders based on selected tab and search query
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeTab !== "All Orders") {
      if (activeTab === "Returns") {
        return order.status.toLowerCase() === "returned";
      }
      if (order.status.toLowerCase() !== activeTab.toLowerCase()) {
        return false;
      }
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.productName.toLowerCase().includes(q)
      );
    }

    return true;
  });

  // CSV Export handler
  const handleExport = () => {
    if (filteredOrders.length === 0) {
      alert("No orders to export.");
      return;
    }
    const headers = ["Order ID", "Customer", "Product", "Value", "Status", "Date"];
    const csvRows = [
      headers.join(","),
      ...filteredOrders.map(order => {
        return [
          order.id,
          order.customerName,
          order.productName,
          order.value.replace(/[^\d.]/g, ''),
          order.status,
          order.date
        ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(",");
      })
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Line Items Handlers
  const handleAddItemRow = () => {
    setOrderItems([
      ...orderItems,
      { productId: "", variantId: "", name: "", sku: "", variantName: "", quantity: 1, price: 0, variants: [] }
    ]);
  };

  const handleRemoveItemRow = (index: number) => {
    if (orderItems.length === 1) return;
    setOrderItems(orderItems.filter((_, idx) => idx !== index));
  };

  const handleProductChange = async (index: number, productId: string) => {
    const selectedProd = productsList.find(p => p.id === productId);
    if (!selectedProd) return;
    
    try {
      const fullProd = await getAdminProductById(productId);
      const variants = fullProd?.variants || [];
      const defaultPrice = Number(fullProd?.sellingPrice || selectedProd.price.replace(/[^\d.]/g, '')) || 0;
      
      const newItems = [...orderItems];
      newItems[index] = {
        productId,
        variantId: "",
        name: selectedProd.name,
        sku: selectedProd.sku,
        variantName: "",
        quantity: 1,
        price: defaultPrice,
        variants: variants,
      };
      setOrderItems(newItems);
    } catch (err) {
      console.error("Failed to load product details:", err);
    }
  };

  const handleVariantChange = (index: number, variantId: string) => {
    const item = orderItems[index];
    const selectedVar = item.variants.find(v => v.id === variantId);
    if (!selectedVar) return;
    
    const newItems = [...orderItems];
    newItems[index] = {
      ...item,
      variantId,
      variantName: selectedVar.name,
      sku: selectedVar.sku,
      price: Number(selectedVar.price.replace(/[^\d.]/g, '')) || 0,
    };
    setOrderItems(newItems);
  };

  const handleQuantityChange = (index: number, qty: number) => {
    const newItems = [...orderItems];
    newItems[index].quantity = Math.max(1, qty);
    setOrderItems(newItems);
  };

  const handlePriceChange = (index: number, price: number) => {
    const newItems = [...orderItems];
    newItems[index].price = Math.max(0, price);
    setOrderItems(newItems);
  };

  // Live calculations
  const subtotal = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const taxTotal = Math.round(subtotal * 0.03 * 100) / 100; // 3% GST
  const grandTotal = Math.max(0, subtotal + taxTotal + shippingCharge - discountAmount);

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!selectedCustomerId) errors.customer = "Please select a customer";
    if (!shippingStreet.trim()) errors.shippingStreet = "Street address is required";
    if (!shippingCity.trim()) errors.shippingCity = "City is required";
    if (!shippingState.trim()) errors.shippingState = "State is required";
    if (!shippingZip.trim()) errors.shippingZip = "ZIP code is required";
    
    if (!isBillingSame) {
      if (!billingStreet.trim()) errors.billingStreet = "Billing street is required";
      if (!billingCity.trim()) errors.billingCity = "Billing city is required";
      if (!billingState.trim()) errors.billingState = "Billing state is required";
      if (!billingZip.trim()) errors.billingZip = "Billing ZIP code is required";
    }

    // Check item rows
    const emptyRows = orderItems.some(item => !item.productId);
    if (emptyRows) {
      errors.items = "All item rows must have a product selected";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Order Creation
  const handleCreateOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const payload = {
        customerId: selectedCustomerId,
        subtotal,
        taxTotal,
        shippingCharge,
        discountAmount,
        total: grandTotal,
        shippingAddress: {
          street1: shippingStreet,
          city: shippingCity,
          state: shippingState,
          zipCode: shippingZip,
          country: "India",
        },
        billingAddress: isBillingSame ? {
          street1: shippingStreet,
          city: shippingCity,
          state: shippingState,
          zipCode: shippingZip,
          country: "India",
        } : {
          street1: billingStreet,
          city: billingCity,
          state: billingState,
          zipCode: billingZip,
          country: "India",
        },
        notes: orderNotes || undefined,
        items: orderItems.map(item => ({
          productId: item.productId,
          variantId: item.variantId || undefined,
          name: item.name,
          sku: item.sku,
          variantName: item.variantName || undefined,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      
      await placeOrder(payload);
      setIsCreateModalOpen(false);
      
      // Reset Form State
      setSelectedCustomerId("");
      setShippingStreet("");
      setShippingCity("");
      setShippingState("");
      setShippingZip("");
      setIsBillingSame(true);
      setBillingStreet("");
      setBillingCity("");
      setBillingState("");
      setBillingZip("");
      setOrderItems([{ productId: "", variantId: "", name: "", sku: "", variantName: "", quantity: 1, price: 0, variants: [] }]);
      setDiscountAmount(0);
      setShippingCharge(0);
      setOrderNotes("");
      setFormErrors({});
      
      loadAllOrders();
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Failed to create order. Please check inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8] admin-dashboard-root">
      {/* Top Header Bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={true}
        searchPlaceholder="Search anything..."
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Page Title & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              ORDERS
            </h1>
            <p className="text-[11px] text-neutral-500 mt-1 font-medium">
              Manage all customer orders
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2.5 border border-neutral-200 rounded-full bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export</span>
            </button>

            {/* Create Order Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-sm"
            >
              <span className="text-[#C99213] font-bold text-sm leading-none">+</span>
              <span>Create Order</span>
            </button>
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
                  <th className="py-4 px-6 font-semibold">ORDER ID</th>
                  <th className="py-4 px-6 font-semibold">CUSTOMER</th>
                  <th className="py-4 px-6 font-semibold">PRODUCT</th>
                  <th className="py-4 px-6 font-semibold">VALUE</th>
                  <th className="py-4 px-6 font-semibold">STATUS</th>
                  <th className="py-4 px-6 font-semibold">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, idx) => {
                    const urlId = order.id.replace("#", "").trim();
                    return (
                      <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                        {/* Order ID */}
                        <td className="py-4 px-6 text-xs font-bold text-[#C99213] cursor-pointer hover:underline">
                          <Link href={`/admin/orders/${urlId}`}>
                            {order.id}
                          </Link>
                        </td>

                        {/* Customer Name */}
                        <td className="py-4 px-6 text-xs font-medium text-neutral-800">
                          {order.customerName}
                        </td>

                        {/* Product details */}
                        <td className="py-4 px-6 text-xs text-neutral-500 font-medium">
                          {order.productName}
                        </td>

                        {/* Order Value */}
                        <td className="py-4 px-6 text-xs font-semibold text-neutral-900">
                          {order.value}
                        </td>

                        {/* Status badge */}
                        <td className="py-4 px-6">
                          <StatusBadge status={order.status} />
                        </td>

                        {/* Order Date */}
                        <td className="py-4 px-6 text-xs text-neutral-400 font-medium">
                          {order.date}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-xs text-neutral-400 font-medium">
                      No orders found matching the filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CREATE CUSTOM ORDER MODAL (PORTAL) */}
      {isCreateModalOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white border border-[#E5E5E5] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative flex flex-col font-sans">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-6">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-raleway">
                    Create Custom Customer Order
                  </h2>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    Generate an offline/manual customer transaction with automatic inventory deduction.
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer text-neutral-450 hover:text-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleCreateOrderSubmit} className="space-y-6">
                
                {formErrors.items && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[11px] text-red-600 font-medium">
                    ⚠️ {formErrors.items}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Customer & Delivery Details */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    {/* Customer Info Card */}
                    <div className="bg-[#FAF9F6]/40 border border-neutral-200 rounded-2xl p-5 space-y-4">
                      <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest border-b border-neutral-200 pb-2">
                        Customer Account Details
                      </h3>
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1.5">
                          Select Customer Account *
                        </label>
                        <select
                          value={selectedCustomerId}
                          onChange={(e) => {
                            setSelectedCustomerId(e.target.value);
                            if (formErrors.customer) {
                              setFormErrors(prev => { const copy = { ...prev }; delete copy.customer; return copy; });
                            }
                          }}
                          className={`w-full px-3 py-2 border rounded-xl text-xs bg-white outline-none focus:border-[#C99213] text-neutral-800 transition-colors ${
                            formErrors.customer ? "border-red-500" : "border-neutral-200"
                          }`}
                        >
                          <option value="">-- Select Registered Account --</option>
                          {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.firstName || c.name ? `${c.firstName || ""} ${c.lastName || ""}`.trim() : c.email} ({c.email})
                            </option>
                          ))}
                        </select>
                        {formErrors.customer && (
                          <span className="text-[9px] text-red-500 mt-1 block">{formErrors.customer}</span>
                        )}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-[#FAF9F6]/40 border border-neutral-200 rounded-2xl p-5 space-y-4">
                      <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest border-b border-neutral-200 pb-2">
                        Shipping Destination Address
                      </h3>
                      
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1.5">Street Address *</label>
                          <input
                            type="text"
                            placeholder="e.g. Apartment/Villa, Road name"
                            value={shippingStreet}
                            onChange={(e) => setShippingStreet(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-[#C99213] bg-white text-neutral-800 transition-colors ${
                              formErrors.shippingStreet ? "border-red-500" : "border-neutral-200"
                            }`}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">City *</label>
                            <input
                              type="text"
                              placeholder="City"
                              value={shippingCity}
                              onChange={(e) => setShippingCity(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-[#C99213] bg-white text-neutral-800 transition-colors ${
                                formErrors.shippingCity ? "border-red-500" : "border-neutral-200"
                              }`}
                            />
                          </div>

                          <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">State *</label>
                            <input
                              type="text"
                              placeholder="State"
                              value={shippingState}
                              onChange={(e) => setShippingState(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-[#C99213] bg-white text-neutral-800 transition-colors ${
                                formErrors.shippingState ? "border-red-500" : "border-neutral-200"
                              }`}
                            />
                          </div>

                          <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">ZIP *</label>
                            <input
                              type="text"
                              placeholder="ZIP"
                              value={shippingZip}
                              onChange={(e) => setShippingZip(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-[#C99213] bg-white text-neutral-800 transition-colors ${
                                formErrors.shippingZip ? "border-red-500" : "border-neutral-200"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Address Toggle */}
                    <div className="bg-[#FAF9F6]/40 border border-neutral-200 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="billingSame"
                          checked={isBillingSame}
                          onChange={(e) => setIsBillingSame(e.target.checked)}
                          className="w-4 h-4 accent-[#C99213] text-[#C99213] rounded focus:ring-[#C99213]"
                        />
                        <label htmlFor="billingSame" className="text-xs font-semibold text-neutral-700 cursor-pointer">
                          Billing Address is the same as Shipping Address
                        </label>
                      </div>

                      {!isBillingSame && (
                        <div className="space-y-3.5 pt-3 border-t border-neutral-200/50">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1.5">Billing Street Address *</label>
                            <input
                              type="text"
                              placeholder="Billing street address"
                              value={billingStreet}
                              onChange={(e) => setBillingStreet(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-[#C99213] bg-white text-neutral-800 transition-colors ${
                                formErrors.billingStreet ? "border-red-500" : "border-neutral-200"
                              }`}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">Billing City *</label>
                              <input
                                type="text"
                                placeholder="City"
                                value={billingCity}
                                onChange={(e) => setBillingCity(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-[#C99213] bg-white text-neutral-800 transition-colors ${
                                  formErrors.billingCity ? "border-red-500" : "border-neutral-200"
                                }`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">Billing State *</label>
                              <input
                                type="text"
                                placeholder="State"
                                value={billingState}
                                onChange={(e) => setBillingState(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-[#C99213] bg-white text-neutral-800 transition-colors ${
                                  formErrors.billingState ? "border-red-500" : "border-neutral-200"
                                }`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">Billing ZIP *</label>
                              <input
                                type="text"
                                placeholder="ZIP"
                                value={billingZip}
                                onChange={(e) => setBillingZip(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-[#C99213] bg-white text-neutral-800 transition-colors ${
                                  formErrors.billingZip ? "border-red-500" : "border-neutral-200"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order Notes */}
                    <div className="bg-[#FAF9F6]/40 border border-neutral-200 rounded-2xl p-5 space-y-2">
                      <label className="block text-[10px] font-bold text-neutral-455 uppercase mb-1">Internal Notes / Instructions</label>
                      <textarea
                        rows={2}
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Add details about packaging, delivery instructions or custom notes..."
                        className="w-full px-3 py-2 border border-neutral-200 rounded-xl text-xs outline-none focus:border-[#C99213] bg-white text-neutral-800 transition-all resize-none"
                      />
                    </div>

                  </div>

                  {/* Right Column: Line Items & Totals Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    
                    {/* Item List Box */}
                    <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4 flex-1">
                      <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                        <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                          Purchased Line Items
                        </h3>
                        <button
                          type="button"
                          onClick={handleAddItemRow}
                          className="flex items-center space-x-1 px-3 py-1 bg-[#C99213]/10 hover:bg-[#C99213]/20 text-[#C99213] rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Item</span>
                        </button>
                      </div>

                      <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-1 no-scrollbar">
                        {orderItems.map((item, idx) => (
                          <div key={idx} className="bg-neutral-50/50 p-3 border border-neutral-200 rounded-xl space-y-3 relative">
                            {orderItems.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveItemRow(idx)}
                                className="absolute top-2.5 right-2.5 p-1 text-neutral-400 hover:text-red-500 hover:bg-neutral-100 rounded transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Product Selector */}
                            <div>
                              <label className="block text-[9px] font-bold text-neutral-455 uppercase mb-1">Product *</label>
                              <select
                                value={item.productId}
                                onChange={(e) => handleProductChange(idx, e.target.value)}
                                className="w-full px-2 py-1.5 border border-neutral-200 rounded-lg text-[11px] bg-white outline-none focus:border-[#C99213] text-neutral-800"
                              >
                                <option value="">-- Choose Product --</option>
                                {productsList.map((p) => (
                                  <option key={p.id} value={p.id}>
                                    {p.name} ({p.sku})
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Variant & Grid */}
                            <div className="grid grid-cols-3 gap-2">
                              {/* Variant Selector (if product has variants) */}
                              <div className="col-span-1.5">
                                <label className="block text-[9px] font-bold text-neutral-455 uppercase mb-1">Variant</label>
                                <select
                                  value={item.variantId}
                                  onChange={(e) => handleVariantChange(idx, e.target.value)}
                                  disabled={!item.variants || item.variants.length === 0}
                                  className="w-full px-2 py-1 border border-neutral-200 rounded-lg text-[11px] bg-white outline-none focus:border-[#C99213] text-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400"
                                >
                                  <option value="">Base Product</option>
                                  {item.variants?.map((v) => (
                                    <option key={v.id} value={v.id}>
                                      {v.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Quantity */}
                              <div>
                                <label className="block text-[9px] font-bold text-neutral-455 uppercase mb-1">Qty</label>
                                <input
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(idx, parseInt(e.target.value) || 1)}
                                  className="w-full px-2 py-1 border border-neutral-200 rounded-lg text-[11px] outline-none text-center focus:border-[#C99213] text-neutral-850"
                                />
                              </div>

                              {/* Overridable Price */}
                              <div>
                                <label className="block text-[9px] font-bold text-neutral-455 uppercase mb-1">Price (₹)</label>
                                <input
                                  type="number"
                                  min={0}
                                  value={item.price}
                                  onChange={(e) => handlePriceChange(idx, parseFloat(e.target.value) || 0)}
                                  className="w-full px-2 py-1 border border-neutral-200 rounded-lg text-[11px] outline-none text-right focus:border-[#C99213] text-neutral-850"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Financial Calculations Box */}
                    <div className="bg-neutral-900 text-white rounded-2xl p-5 space-y-3.5 border border-neutral-800 shadow-md">
                      
                      <div className="flex justify-between items-center text-xs text-neutral-400">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs text-neutral-400">
                        <span>GST Tax (3% standard jewelry levy)</span>
                        <span>₹{taxTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5 border-t border-b border-neutral-800 py-3">
                        <div>
                          <label className="block text-[8px] font-bold text-neutral-400 uppercase mb-1">Shipping Charge (INR)</label>
                          <input
                            type="number"
                            min={0}
                            value={shippingCharge}
                            onChange={(e) => setShippingCharge(parseFloat(e.target.value) || 0)}
                            className="w-full px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-lg text-xs outline-none text-right text-white focus:border-[#C99213]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-neutral-400 uppercase mb-1">Discount Amount (INR)</label>
                          <input
                            type="number"
                            min={0}
                            value={discountAmount}
                            onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                            className="w-full px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-lg text-xs outline-none text-right text-white focus:border-[#C99213]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Grand Total (INR)</span>
                        <span className="text-base font-extrabold text-[#C99213]">
                          ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Footer buttons */}
                <div className="flex items-center gap-3 justify-end pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-5 py-2 border border-neutral-300 rounded-full bg-white text-neutral-750 hover:bg-neutral-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-8 py-2.5 bg-[#C99213] hover:bg-[#a9831e] disabled:bg-neutral-350 text-white rounded-full text-xs font-bold tracking-wide transition-all shadow-[0_4px_12px_rgba(201,146,19,0.2)] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Saving Order...</span>
                    ) : (
                      <>
                        <span>Submit Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </div>,
          document.body
        )}

    </div>
  );
}
