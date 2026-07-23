import React from "react";
import { PaymentDetails } from "@/types/admin";

interface OrderPaymentProps {
  payment: PaymentDetails;
  stockDeductionStatus: string;
  stockDeductedQty: number;
  stockDeductionTime?: string;
  stockDeductionRef?: string;
  stockDeductionProduct?: string;
  stockDeductionVariant?: string;
  stockDeductionBeforeStock?: number;
  stockDeductionAfterStock?: number;
}

export default function OrderPaymentCard({
  payment,
  stockDeductionStatus,
  stockDeductedQty,
  stockDeductionTime,
  stockDeductionRef,
  stockDeductionProduct,
  stockDeductionVariant,
  stockDeductionBeforeStock,
  stockDeductionAfterStock,
}: OrderPaymentProps) {
  return (
    <div className="space-y-6">
      {/* Financial Details */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
          Payment & Transaction Breakdown
        </h2>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-neutral-400 font-semibold">Payment Method</span>
            <span className="font-bold text-neutral-800">{payment.method}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400 font-semibold">Payment Provider</span>
            <span className="font-bold text-neutral-800">{payment.provider || "PhonePe"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400 font-semibold">Merchant Transaction ID</span>
            <span className="font-mono text-neutral-700">{payment.merchantTransactionId || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400 font-semibold">PhonePe Transaction ID</span>
            <span className="font-mono text-neutral-700">{payment.phonepeTransactionId || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400 font-semibold">Payment Date</span>
            <span className="text-neutral-700 font-semibold">{payment.paymentCompletedAt || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400 font-semibold">Verification Status</span>
            <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
              payment.status === "PAID"
                ? "bg-[#E8F5E9] text-[#2E7D32]"
                : "bg-[#FFEBEE] text-[#C62828]"
            }`}>
              {payment.status === "PAID" ? "VERIFIED" : "UNVERIFIED"}
            </span>
          </div>
          <div className="flex justify-between border-b border-neutral-50 pb-2 mb-2">
            <span className="text-neutral-400 font-semibold">Transaction Status</span>
            <span className={`font-bold ${
              payment.status === "PAID" ? "text-[#2E7D32]" : "text-amber-600"
            }`}>{payment.status}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500 font-medium">Subtotal</span>
            <span className="font-semibold text-neutral-800">{payment.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500 font-medium">Shipping & Delivery</span>
            <span className="font-semibold text-neutral-800">{payment.shipping}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500 font-medium">Estimated Taxes (GST)</span>
            <span className="font-semibold text-neutral-800">{payment.tax}</span>
          </div>
          {parseFloat(payment.discount.replace(/[^\d]/g, "")) > 0 && (
            <div className="flex justify-between text-[#2E7D32]">
              <span>Discounts Applied</span>
              <span className="font-bold">-{payment.discount}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm font-extrabold text-neutral-900 border-t border-neutral-100 pt-3">
            <span>Grand Total</span>
            <span className="text-[#C99213]">
              {payment.grandTotal}
            </span>
          </div>

          {payment.paymentResponse && (
            <div className="pt-2 border-t border-neutral-100">
              <span className="text-neutral-400 font-semibold block mb-1">Gateway Response</span>
              <pre className="bg-neutral-50 p-2 rounded text-[10px] font-mono overflow-x-auto text-neutral-700 max-h-24 leading-normal">
                {payment.paymentResponse}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Stock Deduction Card */}
      <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
          Stock Deduction Audit
        </h2>

        <div className="space-y-3 text-xs">
          {/* Status */}
          <div className="flex justify-between">
            <span className="text-neutral-400 font-semibold">Deduction Status</span>
            <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
              stockDeductionStatus === "Completed" || stockDeductedQty > 0
                ? "bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]/40"
                : "bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2]/40"
            }`}>
              {stockDeductionStatus}
            </span>
          </div>

          {/* Product */}
          {stockDeductionProduct && (
            <div className="flex justify-between">
              <span className="text-neutral-400 font-semibold">Product</span>
              <span className="font-semibold text-neutral-850">{stockDeductionProduct}</span>
            </div>
          )}

          {/* Variant */}
          {stockDeductionVariant && (
            <div className="flex justify-between">
              <span className="text-neutral-400 font-semibold">Variant</span>
              <span className="font-semibold text-neutral-500">{stockDeductionVariant}</span>
            </div>
          )}

          {/* Quantity */}
          <div className="flex justify-between">
            <span className="text-neutral-400 font-semibold">Quantity Deducted</span>
            <span className="font-bold text-neutral-800">{stockDeductedQty} units</span>
          </div>

          {/* Before Stock */}
          {stockDeductionBeforeStock !== undefined && (
            <div className="flex justify-between">
              <span className="text-neutral-400 font-semibold">Before Stock</span>
              <span className="font-medium text-neutral-500">{stockDeductionBeforeStock} units</span>
            </div>
          )}

          {/* After Stock */}
          {stockDeductionAfterStock !== undefined && (
            <div className="flex justify-between">
              <span className="text-neutral-400 font-semibold">After Stock</span>
              <span className="font-bold text-[#C99213]">{stockDeductionAfterStock} units</span>
            </div>
          )}

          {/* Reference */}
          {stockDeductionRef && (
            <div className="flex justify-between border-t border-neutral-50 pt-2">
              <span className="text-neutral-400 font-semibold">Transaction Reference</span>
              <span className="font-mono text-neutral-850 font-bold">{stockDeductionRef}</span>
            </div>
          )}

          {/* Time */}
          {stockDeductionTime && (
            <div className="flex justify-between">
              <span className="text-neutral-400 font-semibold">Deduction Time</span>
              <span className="font-semibold text-neutral-700">{stockDeductionTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
