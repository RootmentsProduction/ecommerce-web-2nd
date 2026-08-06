import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import ProductCard from '../product/ProductCard';

interface BestSellerSectionProps {
  products: Product[];
}

export default function BestSellerSection({ products: bestSellers }: BestSellerSectionProps) {
  if (!bestSellers || bestSellers.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-white relative">
        <div className="w-full px-[6.5%] mx-auto max-w-none text-center py-12">
          <p className="text-neutral-500 font-questrial text-sm">No best sellers available yet.</p>
        </div>
      </section>
    );
  }

  // Duplicate items twice for smooth endless horizontal loop
  const marqueeItems = [...bestSellers, ...bestSellers, ...bestSellers, ...bestSellers];

  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
      <div className="w-full px-[6.5%] mx-auto max-w-none relative z-10">
        
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-8 pb-2">
          <h2 className="font-fredoka font-semibold text-3xl sm:text-4xl text-neutral-900 tracking-tight">
            Best Sellers
          </h2>
          <Link
            href="/shop?filter=bestseller"
            className="font-fredoka font-medium text-xs sm:text-sm text-[#7c3aed] hover:text-[#6d28d9] uppercase tracking-widest no-underline border-b border-[#7c3aed] pb-1 transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Hardware-Accelerated Smooth GPU Auto-Scroll Container */}
        <div className="w-full overflow-hidden py-1">
          <div className="animate-marquee-slow flex gap-6">
            {marqueeItems.map((product, idx) => (
              <div 
                key={`${product.id}-${idx}`} 
                className="w-[240px] sm:w-[280px] md:w-[300px] flex-shrink-0"
              >
                <ProductCard product={product} centered={true} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
