'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '../../types/cart';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import QuantitySelector from '../product/QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 sm:gap-6 py-6 border-b border-neutral-100 items-start text-left">
      
      {/* Product Image Thumbnail */}
      <Link
        href={`/product/${item.product.slug}`}
        className="relative block w-20 sm:w-28 aspect-square bg-neutral-50 border border-neutral-150 overflow-hidden flex-shrink-0"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.title}
          fill
          sizes="(max-width: 640px) 80px, 112px"
          className="object-cover"
        />
      </Link>

      {/* Details Box */}
      <div className="flex-1 flex flex-col md:flex-row md:justify-between gap-4">
        
        <div className="space-y-1 sm:space-y-1.5">
          <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-light">
            {item.product.category}
          </p>
          <Link
            href={`/product/${item.product.slug}`}
            className="text-xs sm:text-sm font-serif-luxury font-medium text-neutral-850 hover:text-gold-600 transition-colors block leading-tight"
          >
            {item.product.title}
          </Link>
          
          {/* Selected Attributes List (Size, Metal) */}
          {item.selectedAttributes.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1.5">
              {item.selectedAttributes.map((attr, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-neutral-500 font-light tracking-wide bg-neutral-50 px-2 py-0.5 border border-neutral-100 rounded-sm"
                >
                  <span className="font-normal text-neutral-400 uppercase tracking-widest text-[8px] mr-1">
                    {attr.name}:
                  </span>
                  {attr.value}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quantity control and Price display */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
          <div className="text-right">
            <span className="text-sm font-semibold text-neutral-950 block">
              {formatPrice(item.product.price * item.quantity)}
            </span>
            {item.quantity > 1 && (
              <span className="text-[10px] text-neutral-450 font-light block">
                {formatPrice(item.product.price)} each
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 md:mt-2">
            <QuantitySelector
              quantity={item.quantity}
              setQuantity={(qty) => updateQuantity(item.id, qty)}
              maxStock={item.product.stock}
            />
            
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-neutral-400 hover:text-red-500 p-1.5 transition-colors"
              aria-label="Remove item"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
