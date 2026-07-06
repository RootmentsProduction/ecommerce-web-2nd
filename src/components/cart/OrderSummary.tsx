'use client';

import React, { useState } from 'react';
import { formatPrice } from '../../lib/utils';

interface OrderSummaryProps {
  subtotal: number;
}

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Shipping is complimentary
  const shipping = 0;
  // Tax estimate: 8% of subtotal
  const tax = Math.round(subtotal * 0.08);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.toUpperCase() === 'JEWEL10') {
      setDiscount(Math.round(subtotal * 0.1));
      setPromoSuccess('Promo code JEWEL10 applied successfully (10% off)!');
    } else {
      setPromoError('Invalid promo code. Try JEWEL10 for 10% off.');
    }
  };

  const total = subtotal - discount + shipping + tax;

  return (
    <div className="bg-luxury-sand border border-gold-subtle/40 p-6 sm:p-8 space-y-6 text-left">
      <h3 className="text-xs uppercase tracking-widest font-semibold text-neutral-850 pb-3 border-b border-gold-subtle/30">
        Order Summary
      </h3>

      <div className="space-y-3.5 text-xs font-light text-neutral-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-neutral-900 font-normal">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-gold-700">
            <span>Discount (JEWEL10)</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span className="text-gold-600 font-medium uppercase tracking-wider text-[10px]">
            Complimentary
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Sales Tax (8%)</span>
          <span className="text-neutral-900 font-normal">{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-gold-subtle/30 pt-4 flex justify-between text-sm font-semibold text-neutral-950">
          <span>Total Estimate</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Static Promo Code Input */}
      <div className="pt-4 border-t border-gold-subtle/30">
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <input
            type="text"
            placeholder="Promo Code (e.g. JEWEL10)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full bg-white border border-neutral-250 py-2.5 px-3 text-xs font-light focus:outline-none focus:border-gold-500 placeholder-neutral-400"
          />
          <button
            type="submit"
            className="bg-neutral-900 hover:bg-gold-650 text-white hover:text-white px-4 text-[10px] uppercase tracking-widest font-medium transition-colors"
          >
            Apply
          </button>
        </form>
        {promoError && <p className="text-[10px] text-red-500 font-light mt-2">{promoError}</p>}
        {promoSuccess && <p className="text-[10px] text-gold-700 font-light mt-2">{promoSuccess}</p>}
      </div>

      {/* Checkout CTA */}
      <div className="pt-2">
        <button
          onClick={() => alert('Proceeding to luxury checkout secure gateway...')}
          className="w-full bg-gold-600 hover:bg-gold-700 text-white transition-all duration-300 py-4 text-[10px] uppercase tracking-[0.25em] font-medium shadow-md hover:shadow-lg text-center"
        >
          Secure Checkout
        </button>
      </div>

      <div className="text-center pt-2">
        <p className="text-[9px] text-neutral-400 font-light tracking-wider uppercase">
          🛡️ SSL Encrypted Checkout
        </p>
      </div>
    </div>
  );
}
