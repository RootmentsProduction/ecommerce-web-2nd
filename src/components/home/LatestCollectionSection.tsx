import React from 'react';
import Link from 'next/link';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';

export default function LatestCollectionSection() {
  // Pull 4 products for latest collection display
  const latestProducts = products.slice(0, 4);

  return (
    <section className="py-12 bg-white relative">
      <div className="w-full px-[6.5%] mx-auto max-w-none relative z-10">
        
        {/* Mobile Section Header (centered style matching screenshot) */}
        <div className="flex flex-col items-center text-center mb-6">
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
            <span>Featured</span>
          </div>
          
          <h2 className="font-raleway font-medium text-[26px] leading-[32px] tracking-wide text-neutral-900 uppercase max-w-xs mx-auto mb-3">
            Latest Collection
          </h2>
          
          <div className="w-full text-right px-2 mt-2">
            <Link
              href="/shop"
              className="font-questrial font-light text-[15px] text-[#B78924] hover:text-gold-600 no-underline border-b border-[#B78924] pb-[2px] inline-block"
            >
              View More
            </Link>
          </div>
        </div>

        {/* Product Grid / Scrollable Container */}
        <div className="flex overflow-x-auto gap-6 pb-6 px-1 snap-x snap-mandatory scrollbar-none">
          {latestProducts.map((product) => (
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
