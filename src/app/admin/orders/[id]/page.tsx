"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import OrderDetailsSummary from "@/components/admin/orders/OrderDetailsSummary";
import OrderCustomerCard from "@/components/admin/orders/OrderCustomerCard";
import OrderItemsTable from "@/components/admin/orders/OrderItemsTable";
import OrderPaymentCard from "@/components/admin/orders/OrderPaymentCard";
import OrderTimeline from "@/components/admin/orders/OrderTimeline";
import { getOrderById } from "@/services/orders.service";
import { AdminOrderDetails, StatusType } from "@/types/admin";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminOrderDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [order, setOrder] = useState<AdminOrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    getOrderById(id).then((res) => {
      setOrder(res || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Order not found. <Link href="/admin/orders" className="text-[#C99213] underline">Go back</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Orders", href: "/admin/orders" },
    { label: order.id }
  ];

  const handleStatusChange = (newStatus: StatusType) => {
    // Dynamically update local order status and timeline
    setOrder((prev) => {
      if (!prev) return prev;
      
      // Construct a new timeline matching the status
      const updatedTimeline = prev.timeline.map((step) => {
        // Simple mock mapping to adjust completed steps based on new order state
        let stepStatus = step.status;
        if (newStatus === "Delivered") {
          stepStatus = "completed";
        } else if (newStatus === "Pending Payment") {
          stepStatus = step.title === "Order Placed" ? "completed" : step.title === "Payment Confirmed" ? "current" : "upcoming";
        } else if (newStatus === "Confirmed") {
          stepStatus = step.title === "Order Placed" || step.title === "Payment Confirmed" ? "completed" : step.title === "Processing" ? "current" : "upcoming";
        } else if (newStatus === "Processing" || newStatus === "Packed") {
          stepStatus = step.title === "Order Placed" || step.title === "Payment Confirmed" || step.title === "Processing" ? "completed" : step.title === "Shipped" ? "current" : "upcoming";
        } else if (newStatus === "Shipped") {
          stepStatus = step.title !== "Delivered" ? "completed" : "current";
        }
        
        return { ...step, status: stepStatus as "completed" | "current" | "upcoming" };
      });

      return {
        ...prev,
        status: newStatus,
        timeline: updatedTimeline,
      };
    });

    setToastMessage(`Order status updated to "${newStatus}"!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Toast alert */}
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
        
        {/* Title row */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push("/admin/orders")}
            className="px-3.5 py-1.5 border border-neutral-200 rounded-full bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-700 flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <span>&larr;</span> <span>Back</span>
          </button>
          <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
            ORDER DETAILS
          </h1>
        </div>

        {/* Order Details Header */}
        <OrderDetailsSummary
          orderId={order.id}
          orderDate={order.date}
          status={order.status}
          paymentStatus={order.payment.status}
          onStatusChange={handleStatusChange}
        />

        {/* Details Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main items and history */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items table */}
            <OrderItemsTable items={order.items} />

            {/* Timeline progression */}
            <OrderTimeline timeline={order.timeline} />
          </div>

          {/* Customer profile & Financial details */}
          <div className="lg:col-span-1 space-y-6">
            <OrderCustomerCard
              name={order.customerName}
              phone={order.customerPhone}
              email={order.customerEmail}
              shippingAddress={order.shippingAddress}
              billingAddress={order.billingAddress}
            />

            <OrderPaymentCard
              payment={order.payment}
              stockDeductionStatus={order.stockDeductionStatus}
              stockDeductedQty={order.stockDeductedQty}
              stockDeductionTime={order.stockDeductionTime}
              stockDeductionRef={order.stockDeductionRef}
              stockDeductionProduct={order.stockDeductionProduct}
              stockDeductionVariant={order.stockDeductionVariant}
              stockDeductionBeforeStock={order.stockDeductionBeforeStock}
              stockDeductionAfterStock={order.stockDeductionAfterStock}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
