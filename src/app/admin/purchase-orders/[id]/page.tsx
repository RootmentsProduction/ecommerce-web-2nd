"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Printer, FileText } from "lucide-react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { getPurchaseOrderById, updatePurchaseOrder, updatePurchaseOrderStatus, receivePurchaseOrderItems } from "@/services/purchase-orders.service";
import { PurchaseOrder } from "@/types/purchase-order";

export default function PurchaseOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const poId = params.id as string;

  const [po, setPo] = useState<PurchaseOrder | null>(null);
  
  // Goods receipt states
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [receivedBy, setReceivedBy] = useState("");
  const [receiveNotes, setReceiveNotes] = useState("");
  const [receiveQuantities, setReceiveQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (poId) {
      getPurchaseOrderById(poId).then((data) => {
        if (data) {
          setPo(data);
        } else {
          router.push("/admin/purchase-orders");
        }
      });
    }
  }, [poId, router]);

  useEffect(() => {
    if (po && isReceiveModalOpen) {
      const initialQtys: Record<string, number> = {};
      po.items.forEach((item) => {
        const remaining = item.quantity - (item.receivedQuantity || 0);
        initialQtys[item.sku] = remaining > 0 ? remaining : 0;
      });
      setReceiveQuantities(initialQtys);
    }
  }, [po, isReceiveModalOpen]);

  if (!po) return null;

  // Change status quick
  const handleUpdateStatus = async (newStatus: "Draft" | "Sent" | "Received" | "Cancelled" | "Partially_Received") => {
    try {
      const updated = await updatePurchaseOrderStatus(po.id, newStatus);
      setPo({ ...po, ...updated });
    } catch (err) {
      console.error("Failed to update PO status:", err);
    }
  };

  const handleConfirmReceive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receivedBy.trim()) {
      alert("Please enter who is receiving the goods.");
      return;
    }

    const payloadItems = Object.entries(receiveQuantities)
      .map(([sku, qty]) => ({
        sku,
        quantityReceived: Number(qty) || 0,
      }))
      .filter((item) => item.quantityReceived > 0);

    if (payloadItems.length === 0) {
      alert("Please enter a quantity greater than 0 for at least one item.");
      return;
    }

    try {
      await receivePurchaseOrderItems(po.id, {
        receivedBy,
        notes: receiveNotes || undefined,
        items: payloadItems,
      });

      // Close modal and reload PO details
      setIsReceiveModalOpen(false);
      setReceivedBy("");
      setReceiveNotes("");
      
      const refreshed = await getPurchaseOrderById(po.id);
      if (refreshed) {
        setPo(refreshed);
      }
    } catch (err: any) {
      alert(err.message || "Failed to receive goods.");
    }
  };

  // Delete PO  
  const handleDeletePO = async () => {
    if (confirm(`Are you sure you want to delete purchase order ${po.id}?`)) {
      try {
        await updatePurchaseOrderStatus(po.id, "Cancelled");
        router.push("/admin/purchase-orders");
      } catch (err) {
        console.error("Failed to delete PO:", err);
      }
    }
  };

  // Trigger browser print
  const handlePrint = () => {
    window.print();
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Purchase Orders", href: "/admin/purchase-orders" },
    { label: po.id }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fb] admin-dashboard-root print:bg-white print:p-0">
      
      {/* Topbar - Hide when printing */}
      <div className="print:hidden">
        <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />
      </div>

      <div className="flex-grow p-6 md:p-8 max-w-5xl w-full mx-auto space-y-6 print:p-0 print:max-w-full">
        
        {/* Navigation / Control Panel - Hide when printing */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
          <div className="flex items-center space-x-3">
            <Link
              href="/admin/purchase-orders"
              className="p-2 bg-white border border-[#e1e5f5] rounded-xl hover:bg-neutral-50 transition-colors text-neutral-505 hover:text-neutral-800"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                  Purchase Order Details
                </h1>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  po.status === "Received"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : po.status === "Partially_Received"
                    ? "bg-amber-50 text-amber-600 border border-amber-100"
                    : po.status === "Sent"
                    ? "bg-purple-55 text-purple-600 border border-purple-100"
                    : po.status === "Cancelled"
                    ? "bg-red-50 text-red-655 border border-red-100"
                    : "bg-neutral-100 text-neutral-500 border border-neutral-200"
                }`}>
                  {po.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Reference: {po.referenceNumber || "None"} &bull; Created {new Date(po.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Status updates triggers */}
            <div className="flex border border-[#e1e5f5] rounded-full overflow-hidden bg-white text-xs font-semibold">
              {po.status === "Draft" && (
                <button
                  onClick={() => handleUpdateStatus("Sent")}
                  className="px-3.5 py-2 hover:bg-purple-50 text-purple-600 transition-colors border-r border-[#e1e5f5] cursor-pointer"
                >
                  Mark Sent
                </button>
              )}
              {po.status !== "Received" && po.status !== "Cancelled" && (
                <button
                  onClick={() => setIsReceiveModalOpen(true)}
                  className="px-3.5 py-2 hover:bg-emerald-50 text-emerald-600 transition-colors border-r border-[#e1e5f5] cursor-pointer"
                >
                  Receive Goods
                </button>
              )}
              {po.status !== "Cancelled" && po.status !== "Received" && (
                <button
                  onClick={() => handleUpdateStatus("Cancelled")}
                  className="px-3.5 py-2 hover:bg-red-55 text-red-600 transition-colors cursor-pointer"
                >
                  Cancel Order
                </button>
              )}
            </div>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2.5 bg-white border border-[#e1e5f5] text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
              title="Print Order"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Edit */}
            <Link
              href={`/admin/purchase-orders/${po.id}/edit`}
              className="p-2.5 bg-white border border-[#e1e5f5] text-[#3762f9] hover:text-[#2748c9] rounded-xl hover:bg-neutral-50 transition-colors"
              title="Edit Order"
            >
              <Edit className="w-4 h-4" />
            </Link>

            {/* Delete */}
            <button
              onClick={handleDeletePO}
              className="p-2.5 bg-white border border-[#e1e5f5] text-red-500 hover:text-red-700 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete Order"
            >
              <Trash2 className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* HIGH FIDELITY INVOICE STYLE PREVIEW BLOCK */}
        <div className="bg-white border border-[#e1e5f5] rounded-3xl p-8 md:p-12 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.15)] space-y-8 print:border-none print:shadow-none print:p-0">
          
          {/* Top Invoice Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-neutral-100">
            {/* Branding details */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {/* Gold Asterisk Logo */}
                <svg className="w-5 h-5 text-[#C99213]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="4" x2="12" y2="20" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                  Jewelry by Zorucci
                </span>
              </div>
              <div className="text-[11px] text-neutral-500 font-medium leading-relaxed">
                <p>121 Solitaire Tower, BKC Area</p>
                <p>Mumbai, Maharashtra - 400051</p>
                <p>GSTIN: 27ZORUCCI1234F1Z0</p>
              </div>
            </div>

            {/* PO Info */}
            <div className="text-left md:text-right space-y-1 md:space-y-2">
              <span className="text-[10px] font-bold text-[#3762f9] uppercase tracking-wider bg-[#3762f9]/10 px-3 py-1 rounded-full">
                Purchase Order
              </span>
              <h2 className="text-2xl font-bold text-neutral-900 font-mono tracking-tight pt-1">
                {po.id}
              </h2>
              <div className="text-[11px] text-neutral-500 font-medium space-y-0.5">
                <p>Date: <span className="text-neutral-800 font-semibold">{po.date}</span></p>
                {po.deliveryDate && <p>Expected Delivery: <span className="text-neutral-800 font-semibold">{po.deliveryDate}</span></p>}
                <p>Terms: <span className="text-neutral-800 font-semibold">{po.paymentTerms}</span></p>
              </div>
            </div>
          </div>

          {/* Billed-From / Billed-To address columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
            
            {/* Vendor Card */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-450">Vendor / Supplier</span>
              <div className="text-xs text-neutral-700 space-y-1">
                <p className="font-bold text-neutral-900 text-sm hover:underline cursor-pointer">
                  <Link href={`/admin/vendors/${po.vendorId}`}>
                    {po.vendorName}
                  </Link>
                </p>
                {po.deliverToAddress && (
                  <>
                    <p>{po.deliverToBranch === "Mumbai Central Warehouse" && po.vendorName.includes("Apex") ? "BKC Bourse Building" : "Industrial Area Complex"}</p>
                    <p>Source State: <span className="font-semibold text-neutral-900">{po.vendorState}</span></p>
                  </>
                )}
              </div>
            </div>

            {/* Delivery warehouse Card */}
            <div className="space-y-2 md:text-right md:items-end">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 block">Deliver Destination</span>
              <div className="text-xs text-neutral-700 space-y-1 md:text-right">
                <p className="font-bold text-neutral-900 text-sm">{po.deliverToBranch}</p>
                <p className="max-w-xs md:ml-auto">{po.deliverToAddress}</p>
                <p>State: <span className="font-semibold text-neutral-900">{po.deliverToState}</span></p>
              </div>
            </div>

          </div>

          {/* Itemized Line Items Table */}
          <div className="overflow-x-auto border border-[#e1e5f5] rounded-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f5f6ff] text-neutral-500 font-bold uppercase tracking-wider border-b border-[#e1e5f5]">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Item & Description</th>
                  <th className="py-3 px-4 w-24 text-center">Size</th>
                  <th className="py-3 px-4 w-24 text-right">Qty</th>
                  <th className="py-3 px-4 w-32 text-right">Rate</th>
                  <th className="py-3 px-4 w-24 text-right">Tax Rate</th>
                  <th className="py-3 px-4 w-32 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {po.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/20">
                    <td className="py-4 px-4 text-center text-neutral-450 font-bold">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-neutral-950">{item.name}</p>
                      <p className="text-[10px] text-neutral-450 font-medium font-mono">{item.sku}</p>
                    </td>
                    <td className="py-4 px-4 text-center text-neutral-600 font-semibold">{item.size || "O/S"}</td>
                    <td className="py-4 px-4 text-right text-neutral-800 font-semibold">{item.quantity}</td>
                    <td className="py-4 px-4 text-right text-neutral-800 font-semibold">₹{item.rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 px-4 text-right text-neutral-600 font-semibold">{item.taxRate}%</td>
                    <td className="py-4 px-4 text-right font-bold text-neutral-900">₹{item.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Financial summary breakouts */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between pt-4">
            
            {/* Notes & Terms block */}
            <div className="flex-1 space-y-4 max-w-md">
              {po.customerNotes && (
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">Customer Notes</span>
                  <p className="text-[11px] text-neutral-600 leading-relaxed italic">{po.customerNotes}</p>
                </div>
              )}
              {po.termsAndConditions && (
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">Terms & Conditions</span>
                  <p className="text-[11px] text-neutral-600 leading-relaxed italic">{po.termsAndConditions}</p>
                </div>
              )}
              
              {/* Attachments */}
              {po.attachments && po.attachments.length > 0 && (
                <div className="space-y-1 pt-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">Attached Agreement Files</span>
                  <div className="flex flex-wrap gap-1.5">
                    {po.attachments.map((f) => (
                      <span key={f} className="inline-flex items-center space-x-1.5 bg-[#f5f7fb] border border-[#e1e5f5] px-2.5 py-0.5 rounded-lg text-[10px] font-semibold text-neutral-600">
                        <FileText className="w-3 h-3 text-neutral-450" />
                        <span>{f}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="w-full lg:w-96 space-y-3 bg-[#fafbff] border border-[#e1e5f5] p-6 rounded-2xl">
              
              {/* Subtotal */}
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-neutral-450 uppercase tracking-wider">Subtotal</span>
                <span className="text-neutral-800">
                  ₹{po.subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Discount */}
              {po.discountAmount > 0 && (
                <div className="flex justify-between items-center text-xs font-medium text-red-500">
                  <span className="italic">Discount {po.discountType === "transaction" ? `(${po.discountValue}${po.discountUnit})` : ""}</span>
                  <span>
                    -₹{po.discountAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              {/* Tax split lines */}
              <div className="border-t border-b border-neutral-100 py-2.5 space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between items-center font-bold text-[10px] uppercase text-neutral-450 pb-1">
                  <span>Tax split ({po.taxSplitType})</span>
                  <span>GST Total: ₹{po.taxTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </div>
                {po.taxSplitType === "Intra-state" ? (
                  <>
                    <div className="flex justify-between items-center italic">
                      <span>CGST Split (50% of GST)</span>
                      <span>₹{po.cgstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center italic">
                      <span>SGST Split (50% of GST)</span>
                      <span>₹{po.sgstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center italic">
                    <span>IGST Split (100% of GST)</span>
                    <span>₹{po.igstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
              </div>

              {/* TDS / TCS Deduction */}
              {po.tdsTcsType !== "None" && po.tdsTcsAmount > 0 && (
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-neutral-455">Deduction ({po.tdsTcsName})</span>
                  <span className={po.tdsTcsType === "TDS" ? "text-red-500" : "text-emerald-600"}>
                    {po.tdsTcsType === "TDS" ? "-" : "+"}₹{po.tdsTcsAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              {/* Adjustments */}
              {po.adjustment !== 0 && (
                <div className="flex justify-between items-center text-xs font-semibold text-neutral-600">
                  <span>Adjustments</span>
                  <span>₹{po.adjustment.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              {/* Final Total */}
              <div className="border-t border-neutral-200 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Final Total</span>
                <span className="text-base font-black text-[#3762f9]">
                  ₹{po.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>

            </div>

          </div>

          {/* Signature Block */}
          <div className="flex justify-end pt-12">
            <div className="text-center w-48 space-y-1">
              <div className="border-b border-neutral-300 h-10 w-full" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-450">Authorized Signature</span>
            </div>
          </div>

        </div>

      </div>

      {/* Goods Receipt Modal */}
      {isReceiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-[#e1e5f5] max-w-2xl w-full p-8 shadow-2xl mx-4 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 font-sans tracking-tight">Log Goods Receipt</h2>
              <p className="text-xs text-neutral-500 mt-1 font-medium">
                Record physical shipment receipt into inventory. This action automatically adjusts stock levels in the database.
              </p>
            </div>

            <form onSubmit={handleConfirmReceive} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Received By *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name / email"
                    value={receivedBy}
                    onChange={(e) => setReceivedBy(e.target.value)}
                    className="w-full border border-neutral-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#3762f9] focus:ring-1 focus:ring-[#3762f9] transition-all text-neutral-850 font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Notes / Invoice Ref</label>
                  <input
                    type="text"
                    placeholder="Optional details..."
                    value={receiveNotes}
                    onChange={(e) => setReceiveNotes(e.target.value)}
                    className="w-full border border-neutral-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#3762f9] focus:ring-1 focus:ring-[#3762f9] transition-all text-neutral-850 font-semibold"
                  />
                </div>
              </div>

              <div className="border border-neutral-100 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 text-[10px] font-bold uppercase text-neutral-450 border-b border-neutral-100 font-sans">
                      <th className="py-2.5 px-4 font-semibold">Item & SKU</th>
                      <th className="py-2.5 px-4 text-center font-semibold">Remaining</th>
                      <th className="py-2.5 px-4 text-right w-32 font-semibold">Qty Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-sans">
                    {po.items.map((item) => {
                      const remaining = item.quantity - (item.receivedQuantity || 0);
                      return (
                        <tr key={item.sku} className="hover:bg-neutral-50/20 transition-colors">
                          <td className="py-3 px-4">
                            <p className="font-bold text-neutral-900">{item.name}</p>
                            <p className="text-[10px] text-neutral-450 font-medium font-mono">{item.sku}</p>
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-neutral-600">
                            {remaining > 0 ? `${remaining} units` : "Fully Received"}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <input
                              type="number"
                              min="0"
                              max={remaining}
                              disabled={remaining <= 0}
                              value={receiveQuantities[item.sku] ?? 0}
                              onChange={(e) => {
                                const val = Math.min(remaining, Math.max(0, parseInt(e.target.value) || 0));
                                setReceiveQuantities((prev) => ({ ...prev, [item.sku]: val }));
                              }}
                              className="w-20 border border-neutral-200 rounded-lg px-2.5 py-1 text-center outline-none focus:border-[#3762f9] transition-all text-xs font-bold text-neutral-850 disabled:bg-neutral-100 disabled:text-neutral-400"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-100 font-sans">
                <button
                  type="button"
                  onClick={() => setIsReceiveModalOpen(false)}
                  className="px-4 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 text-xs font-semibold text-neutral-600 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Confirm Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
