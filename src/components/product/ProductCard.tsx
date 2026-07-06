'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  centered?: boolean;
}

export default function ProductCard({ product, centered = false }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultAttributes = product.category === 'Rings'
      ? [{ name: 'Ring Size', value: '7' }]
      : product.category === 'Necklaces'
        ? [{ name: 'Length', value: '18 inches' }]
        : [];
    addToCart(product, 1, defaultAttributes);
    alert(`${product.title} added to your shopping bag!`);
  };

  return (
    <div className="group relative flex flex-col bg-white">

      {/* Product Image Box */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-white border border-neutral-200"
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.title} alternate`}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          />
        )}
        {/* Quick add on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white py-2.5 px-3 border-t border-neutral-200">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-neutral-900 hover:bg-[#B78924] text-white transition-colors duration-300 py-2 text-[10px] uppercase tracking-widest font-questrial"
          >
            Add to Bag
          </button>
        </div>
      </Link>

      {/* Product details */}
      <div className={`pt-2 pb-4 px-3 ${centered ? 'text-center' : 'text-left'}`}>
        {/* Product name: Questrial 400, 18px, 26px line-height, #4E4E4E */}
        <Link
          href={`/product/${product.slug}`}
          className="block md:truncate mb-1 hover:text-[#B78924] transition-colors"
          style={{
            fontFamily: 'Questrial, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0%',
            color: '#4E4E4E',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {product.title}
        </Link>
        {/* Price: Google Sans Flex 500, 15px, 22px line-height, #312409 */}
        <p
          style={{
            fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
            fontWeight: 500,
            fontSize: '15px',
            lineHeight: '22px',
            letterSpacing: '0%',
            color: '#312409',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {centered ? `From RS. ${product.price.toLocaleString('en-IN')}` : `₹ ${product.price.toLocaleString('en-IN')}`}
        </p>
      </div>

    </div>
  );
}
