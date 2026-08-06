'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  centered?: boolean;
}

export default function ProductCard({ product, centered = false }: ProductCardProps) {
  const router = useRouter();
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
    router.push('/cart');
  };

  return (
    <div className="group relative flex flex-col bg-white">

      {/* Product Image Box */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-white border border-neutral-200/90 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300"
      >
        <Image
          src={product.primaryImage || product.images[0] || '/placeholder.png'}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.title} – hover view`}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          />
        )}

        {/* Sticker Pill Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-[#fbbf24] text-neutral-950 font-fredoka text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
              ⭐ Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#7c3aed] text-white font-fredoka text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
              ✨ New
            </span>
          )}
        </div>

        {/* Quick add on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-xs py-2.5 px-3 border-t border-neutral-200">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-neutral-900 hover:bg-[#7c3aed] text-white transition-colors duration-300 py-2.5 text-[10px] uppercase tracking-widest font-questrial rounded-full shadow-xs"
          >
            Add to Bag
          </button>
        </div>
      </Link>

      {/* Product details */}
      <div className={`pt-2 pb-4 px-3 ${centered ? 'text-center' : 'text-left'}`}>
        <Link
          href={`/product/${product.slug}`}
          className="block md:truncate mb-1 hover:text-[#7c3aed] transition-colors"
          style={{
            fontFamily: 'Questrial, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#4E4E4E',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {product.title}
        </Link>
        <p
          style={{
            fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
            fontWeight: 500,
            fontSize: '15px',
            lineHeight: '22px',
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
