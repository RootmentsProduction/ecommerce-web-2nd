import React from "react";
import { AdminAddress } from "@/types/admin";

interface OrderCustomerProps {
  name: string;
  phone: string;
  email: string;
  shippingAddress: AdminAddress;
  billingAddress: AdminAddress;
}

export default function OrderCustomerCard({
  name,
  phone,
  email,
  shippingAddress,
  billingAddress,
}: OrderCustomerProps) {
  const formatAddress = (addr: AdminAddress) => {
    return `${addr.street}, ${addr.city}, ${addr.state} - ${addr.zipCode}, ${addr.country}`;
  };

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
      <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
        Customer Profile & Shipments
      </h2>

      {/* Customer Contact */}
      <div className="space-y-2 text-xs">
        <div className="flex flex-col space-y-0.5">
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Customer Name</span>
          <span className="font-bold text-neutral-800">{name}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-0.5">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Mobile Number</span>
            <span className="font-semibold text-neutral-700">{phone}</span>
          </div>
          <div className="flex flex-col space-y-0.5">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Email Address</span>
            <span className="font-semibold text-neutral-700 break-all">{email}</span>
          </div>
        </div>
      </div>

      {/* Address Blocks */}
      <div className="border-t border-neutral-50 pt-4 space-y-4 text-xs">
        {/* Shipping address */}
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Shipping Address</span>
          <p className="text-neutral-700 leading-relaxed font-normal bg-neutral-50 border border-neutral-100 rounded p-3">
            {formatAddress(shippingAddress)}
          </p>
        </div>

        {/* Billing address */}
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Billing Address</span>
          <p className="text-neutral-700 leading-relaxed font-normal bg-neutral-50 border border-neutral-100 rounded p-3">
            {formatAddress(billingAddress)}
          </p>
        </div>
      </div>
    </div>
  );
}
