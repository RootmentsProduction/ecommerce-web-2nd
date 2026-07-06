import React from 'react';
import Link from 'next/link';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';

export default function BestSellerSection() {
  // Filter bestsellers and limit to 4 to match the screenshot grid
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-12 bg-white relative sm:py-16">
      <div className="w-full px-[6.5%] mx-auto max-w-none relative z-10">
        
        {/* Desktop Section Header (Left aligned title, Right aligned View More link) */}
        <div className="hidden sm:flex items-baseline justify-between mb-6 sm:mb-8 pb-2">
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

        {/* Mobile Section Header (centered style matching latest collection layout) */}
        <div className="flex flex-col items-center text-center mb-6 sm:hidden">
          <div 
            className="flex items-center gap-2 mb-2"
            style={{
              color: '#B78924',
              fontFamily: "'Questrial', sans-serif",
              fontWeight: 200,
              fontSize: '18px',
              lineHeight: '26px',
              letterSpacing: '0%',
              textTransform: 'uppercase'
            }}
          >
            <span className="text-[16px]">✳</span>
            <span>Bestsellers</span>
          </div>
          
          <h2 className="font-raleway font-medium text-[26px] leading-[32px] tracking-wide text-neutral-900 uppercase max-w-xs mx-auto mb-3">
            Best Sellers
          </h2>
          
          <div className="w-full text-right px-2 mt-2">
            <Link
              href="/shop?filter=bestseller"
              className="font-questrial font-light text-[15px] text-[#B78924] hover:text-gold-600 no-underline border-b border-[#B78924] pb-[2px] inline-block"
            >
              View More
            </Link>
          </div>
        </div>

        {/* Desktop Product Grid (Hidden on mobile) */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} centered={true} />
          ))}
        </div>

        {/* Mobile Product Scrollable Container (Visible on mobile only, matching latest collection) */}
        <div className="flex sm:hidden overflow-x-auto gap-6 pb-6 px-1 snap-x snap-mandatory scrollbar-none">
          {bestSellers.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[270px] max-w-[290px] w-[78vw] snap-start flex-shrink-0"
            >
              <ProductCard product={product} centered={true} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
