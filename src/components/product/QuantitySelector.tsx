'use client';

import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (qty: number) => void;
  maxStock?: number;
}

export default function QuantitySelector({
  quantity,
  setQuantity,
  maxStock = 99,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-neutral-250 w-fit">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-gold-600 disabled:opacity-30 disabled:hover:text-neutral-500 transition-colors focus:outline-none"
        aria-label="Decrease quantity"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12H4" />
        </svg>
      </button>

      <span className="w-10 text-center text-xs font-light text-neutral-800 select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= maxStock}
        className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-gold-600 disabled:opacity-30 disabled:hover:text-neutral-500 transition-colors focus:outline-none"
        aria-label="Increase quantity"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
