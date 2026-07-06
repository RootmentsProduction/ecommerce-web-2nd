import React from 'react';
import Link from 'next/link';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';

export default function BestSellerSection() {
  // Filter bestsellers and limit to 4 to match the screenshot grid
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-white relative">
      <div className="w-full px-[6.5%] mx-auto max-w-none relative z-10">
        
        {/* Section Header (Left aligned title, Right aligned View More link) */}
        <div className="flex items-baseline justify-between mb-6 sm:mb-8 pb-2">
          <h2 className="font-raleway font-medium text-[36px] leading-[100%] tracking-normal text-[#453920]">
            Best Sellers
          </h2>
          <Link
            href="/shop?filter=bestseller"
            className="font-questrial font-light text-[22px] leading-[26px] tracking-normal text-[#B78924] hover:text-gold-600 no-underline border-b border-[#B78924] pb-[2px] text-right inline-block"
          >
            View More
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} centered={true} />
          ))}
        </div>

      </div>
    </section>
  );
}
