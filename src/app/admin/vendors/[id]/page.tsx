"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Edit,
  History as HistoryIcon,
  MessageSquare,
  FileText,
  User,
  Power,
  MapPin,
  Send,
  Trash2
} from "lucide-react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { localStorageService } from "@/services/localStorage.service";
import { Vendor, VendorComment } from "@/types/vendor";
import { PurchaseOrder } from "@/types/purchase-order";

export default function VendorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vendorId = params.id as string;

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [activeTab, setActiveTab] = useState<"Overview" | "Comments" | "Bills" | "History">("Overview");
  
  // Comments state
  const [comments, setComments] = useState<VendorComment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  
  // History state
  const [historyLogs, setHistoryLogs] = useState<string[]>([]);

  useEffect(() => {
    if (vendorId) {
      const data = localStorageService.getVendorById(vendorId);
      if (data) {
        Promise.resolve().then(() => {
          setVendor(data);
          setComments(localStorageService.getVendorComments(vendorId));
          setHistoryLogs(localStorageService.getVendorHistory(vendorId));
          
          // Find POs related to this vendor
          const allPOs = localStorageService.getPurchaseOrders();
          const related = allPOs.filter((po) => po.vendorId === vendorId);
          setPurchaseOrders(related);
        });
      } else {
        router.push("/admin/vendors");
      }
    }
  }, [vendorId, router]);

  if (!vendor) return null;

  // Toggle status Active/Inactive
  const handleToggleStatus = () => {
    const nextStatus = vendor.status === "Active" ? "Inactive" : "Active";
    const updatedVendor = {
      ...vendor,
      status: nextStatus as "Active" | "Inactive"
    };
    localStorageService.saveVendor(updatedVendor);
    localStorageService.logHistory(vendor.id, `Vendor status changed to ${nextStatus}`);
    
    setVendor(updatedVendor);
    setHistoryLogs(localStorageService.getVendorHistory(vendor.id));
  };

  // Delete Vendor
  const handleDeleteVendor = () => {
    if (confirm(`Are you sure you want to delete vendor "${vendor.displayName}"? This will permanently remove their records.`)) {
      localStorageService.deleteVendor(vendor.id);
      router.push("/admin/vendors");
    }
  };

  // Submit comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const added = localStorageService.addVendorComment(vendor.id, newCommentText.trim());
    localStorageService.logHistory(vendor.id, `Internal comment added: "${newCommentText.substring(0, 30)}..."`);
    
    setComments([...comments, added]);
    setNewCommentText("");
    setHistoryLogs(localStorageService.getVendorHistory(vendor.id));
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Vendors", href: "/admin/vendors" },
    { label: vendor.displayName }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fb] admin-dashboard-root">
      {/* Topbar */}
      <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />

      <div className="flex-grow p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
        
        {/* Navigation back and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/admin/vendors"
              className="p-2 bg-white border border-[#e1e5f5] rounded-xl hover:bg-neutral-55 transition-colors text-neutral-500 hover:text-neutral-800"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                  {vendor.displayName}
                </h1>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  vendor.status === "Active"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-neutral-100 text-neutral-500 border border-neutral-200"
                }`}>
                  {vendor.status}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Vendor ID: {vendor.id} &bull; Registered {new Date(vendor.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Status Toggle Button */}
            <button
              onClick={handleToggleStatus}
              className={`flex items-center space-x-1.5 px-4 py-2 border rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                vendor.status === "Active"
                  ? "bg-white text-neutral-700 border-[#e1e5f5] hover:bg-neutral-50"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>Mark as {vendor.status === "Active" ? "Inactive" : "Active"}</span>
            </button>

            {/* Edit Button */}
            <Link
              href={`/admin/vendors/${vendor.id}/edit`}
              className="flex items-center space-x-1.5 px-4.5 py-2.5 bg-[#3762f9] hover:bg-[#2748c9] text-white rounded-full text-xs font-semibold cursor-pointer transition-colors shadow-sm"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Link>

            {/* Delete Button */}
            <button
              onClick={handleDeleteVendor}
              className="p-2.5 bg-white border border-[#e1e5f5] text-red-500 hover:text-red-750 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete Vendor"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT COLUMN: Summary Card Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Overview Quick Stats */}
            <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Accounts Balance
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f5f7fb] rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] text-neutral-455 font-bold uppercase tracking-wider">Payables</span>
                  <div className="text-base font-bold text-neutral-900">
                    ₹{vendor.payables.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-emerald-50/50 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Credits</span>
                  <div className="text-base font-bold text-emerald-600">
                    ₹{vendor.unusedCredits.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#e1e5f5] pt-4 space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-450">GST Treatment:</span>
                  <span className="text-neutral-800 font-semibold">{vendor.gstTreatment}</span>
                </div>
                {vendor.gstin && (
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-neutral-455">GSTIN:</span>
                    <span className="text-neutral-800 font-mono font-bold">{vendor.gstin}</span>
                  </div>
                )}
                {vendor.pan && (
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-neutral-455">PAN:</span>
                    <span className="text-neutral-800 font-mono font-bold">{vendor.pan}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-450">Source State:</span>
                  <span className="text-neutral-800 font-semibold">{vendor.sourceOfSupply}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-450">Payment Terms:</span>
                  <span className="text-neutral-800 font-semibold">{vendor.paymentTerms}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-450">TDS Rate:</span>
                  <span className="text-neutral-800 font-semibold">{vendor.tdsRate}</span>
                </div>
              </div>
            </div>

            {/* Primary Contact Details Card */}
            <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Primary Contact
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs">
                  <User className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="text-neutral-800 font-medium">
                    {vendor.salutation} {vendor.firstName} {vendor.lastName}
                  </span>
                </div>
                {vendor.companyName && (
                  <div className="flex items-center space-x-3 text-xs">
                    <Building2 className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="text-neutral-800 font-medium">{vendor.companyName}</span>
                  </div>
                )}
                {vendor.email && (
                  <div className="flex items-center space-x-3 text-xs">
                    <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                    <a href={`mailto:${vendor.email}`} className="text-[#3762f9] hover:underline truncate">
                      {vendor.email}
                    </a>
                  </div>
                )}
                {vendor.workPhone && (
                  <div className="flex items-center space-x-3 text-xs">
                    <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="text-neutral-800 font-medium">{vendor.workPhone}</span>
                  </div>
                )}
                {vendor.mobile && (
                  <div className="flex items-center space-x-3 text-xs">
                    <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="text-neutral-800 font-medium">{vendor.mobile} (Mobile)</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Tab Panel and Tabs Navigation */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tab navigation card */}
            <div className="bg-white border border-[#e1e5f5] rounded-3xl shadow-[0_30px_90px_-40px_rgba(15,23,42,0.1)] overflow-hidden flex flex-col min-h-[480px]">
              
              {/* Tab Header Buttons */}
              <div className="flex border-b border-[#e1e5f5] bg-[#f5f6ff]">
                {([
                  { id: "Overview", icon: User },
                  { id: "Comments", icon: MessageSquare },
                  { id: "Bills", icon: FileText },
                  { id: "History", icon: HistoryIcon }
                ] as const).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-4 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                        activeTab === tab.id
                          ? "border-[#3762f9] text-[#3762f9] bg-white"
                          : "border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50/50"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{tab.id}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Body Contents */}
              <div className="p-6 md:p-8 flex-grow">
                
                {/* 1. OVERVIEW TAB */}
                {activeTab === "Overview" && (
                  <div className="space-y-6">
                    {/* Billing/Shipping Address Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Billing Address Card */}
                      <div className="border border-[#e1e5f5] rounded-2xl p-4 bg-[#fafbff] space-y-2">
                        <div className="flex items-center space-x-2 text-[#3762f9] font-bold text-xs uppercase tracking-wider mb-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Billing Address</span>
                        </div>
                        <div className="text-xs text-neutral-600 space-y-1">
                          {vendor.billingAddress.attention && <p className="font-bold">{vendor.billingAddress.attention}</p>}
                          <p>{vendor.billingAddress.street1}</p>
                          {vendor.billingAddress.street2 && <p>{vendor.billingAddress.street2}</p>}
                          <p>{vendor.billingAddress.city}, {vendor.billingAddress.state} - {vendor.billingAddress.zipCode}</p>
                          <p>{vendor.billingAddress.countryRegion}</p>
                          {vendor.billingAddress.phone && <p className="mt-2 text-neutral-400">Phone: {vendor.billingAddress.phone}</p>}
                        </div>
                      </div>

                      {/* Shipping Address Card */}
                      <div className="border border-[#e1e5f5] rounded-2xl p-4 bg-[#fafbff] space-y-2">
                        <div className="flex items-center space-x-2 text-[#3762f9] font-bold text-xs uppercase tracking-wider mb-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Shipping Address</span>
                        </div>
                        <div className="text-xs text-neutral-600 space-y-1">
                          {vendor.shippingAddress.attention && <p className="font-bold">{vendor.shippingAddress.attention}</p>}
                          <p>{vendor.shippingAddress.street1}</p>
                          {vendor.shippingAddress.street2 && <p>{vendor.shippingAddress.street2}</p>}
                          <p>{vendor.shippingAddress.city}, {vendor.shippingAddress.state} - {vendor.shippingAddress.zipCode}</p>
                          <p>{vendor.shippingAddress.countryRegion}</p>
                          {vendor.shippingAddress.phone && <p className="mt-2 text-neutral-400">Phone: {vendor.shippingAddress.phone}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Bank Accounts details */}
                    {vendor.bankAccounts && vendor.bankAccounts.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Registered Bank Accounts
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {vendor.bankAccounts.map((acct, idx) => (
                            <div key={idx} className="border border-[#e1e5f5] rounded-2xl p-4 bg-white space-y-2">
                              <div className="flex justify-between items-center text-xs font-bold text-neutral-800">
                                <span>{acct.bankName}</span>
                                <span className="text-[10px] uppercase font-semibold text-neutral-400">IFSC: {acct.ifscCode}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
                                <div>
                                  <span className="text-neutral-400">A/C Name: </span>
                                  <span className="font-semibold">{acct.accountHolderName}</span>
                                </div>
                                <div>
                                  <span className="text-neutral-400">A/C Number: </span>
                                  <span className="font-mono font-bold text-neutral-800">{acct.accountNumber}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Remarks Card */}
                    {vendor.remarks && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Remarks</h3>
                        <p className="text-xs text-neutral-600 bg-neutral-50 border border-neutral-100 p-4 rounded-2xl italic leading-relaxed">
                          {vendor.remarks}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. COMMENTS TAB */}
                {activeTab === "Comments" && (
                  <div className="space-y-6 flex flex-col h-full">
                    {/* Add Comment form */}
                    <form onSubmit={handleAddComment} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type internal comment or note..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="flex-1 px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-800"
                      />
                      <button
                        type="submit"
                        className="p-2.5 bg-[#3762f9] hover:bg-[#2748c9] text-white rounded-xl cursor-pointer transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>

                    {/* Comments Timeline */}
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3 p-3.5 border border-neutral-100 rounded-2xl bg-neutral-50/50">
                            <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-700 uppercase shrink-0">
                              {comment.author.substring(0, 2)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-neutral-800">{comment.author}</span>
                                <span className="text-[9px] text-neutral-400 font-medium">{comment.date}</span>
                              </div>
                              <p className="text-xs text-neutral-600 leading-relaxed">{comment.text}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 text-center text-xs text-neutral-400 font-medium">
                          No comments posted yet.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. RELATED BILLS / POS */}
                {activeTab === "Bills" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                        Purchase Transactions
                      </h3>
                      <Link
                        href={`/admin/purchase-orders/new?vendorId=${vendor.id}`}
                        className="text-[10px] font-bold uppercase tracking-wider bg-[#3762f9]/10 hover:bg-[#3762f9]/20 text-[#3762f9] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        Create Purchase Order
                      </Link>
                    </div>

                    {purchaseOrders.length > 0 ? (
                      <div className="overflow-hidden border border-[#e1e5f5] rounded-2xl">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#f5f6ff] text-neutral-500 font-bold uppercase tracking-wider border-b border-[#e1e5f5]">
                              <th className="py-3 px-4 font-semibold">PO Number</th>
                              <th className="py-3 px-4 font-semibold">Date</th>
                              <th className="py-3 px-4 font-semibold">Status</th>
                              <th className="py-3 px-4 font-semibold text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {purchaseOrders.map((po) => (
                              <tr key={po.id} className="hover:bg-neutral-50/50">
                                <td className="py-3 px-4 font-bold text-[#3762f9] hover:underline cursor-pointer">
                                  <Link href={`/admin/purchase-orders/${po.id}`}>
                                    {po.id}
                                  </Link>
                                </td>
                                <td className="py-3 px-4 text-neutral-550">{po.date}</td>
                                <td className="py-3 px-4">
                                  <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                    po.status === "Received"
                                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                      : po.status === "Sent"
                                      ? "bg-purple-50 text-purple-600 border border-purple-100"
                                      : po.status === "Cancelled"
                                      ? "bg-red-50 text-red-650 border border-red-100"
                                      : "bg-neutral-100 text-neutral-500 border border-neutral-200"
                                  }`}>
                                    {po.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right font-semibold text-neutral-900">
                                  ₹{po.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="py-12 text-center text-xs text-neutral-400 font-medium border border-dashed border-[#e1e5f5] rounded-2xl bg-[#fafbff]">
                        No purchase orders recorded for this vendor yet.
                      </div>
                    )}
                  </div>
                )}

                {/* 4. HISTORY TAB */}
                {activeTab === "History" && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Activity Log
                    </h3>
                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                      {historyLogs.map((log, idx) => (
                        <div key={idx} className="flex items-start space-x-3 text-xs leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3762f9] mt-1.5 shrink-0" />
                          <span className="text-neutral-600 font-medium">{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
