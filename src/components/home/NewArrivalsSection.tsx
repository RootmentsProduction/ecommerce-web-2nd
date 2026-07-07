"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';

export default function NewArrivalsSection() {
  // Filter new arrivals and limit to 4 to match the screenshot grid
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !newArrivals || newArrivals.length === 0) return;

    const isMobile = () => window.innerWidth < 640;

    let animationFrameId: number;
    let isInteracting = false;
    let interactionTimeout: NodeJS.Timeout;
    const scrollSpeed = 0.25; // Very slow scroll speed for Products (px/frame)
    const originalCount = newArrivals.length;
    let scrollPos = container.scrollLeft;

    const handleInteractionStart = () => {
      isInteracting = true;
      scrollPos = container.scrollLeft;
      clearTimeout(interactionTimeout);
    };

    const handleInteractionEnd = () => {
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isInteracting = false;
        scrollPos = container.scrollLeft;
      }, 2000);
    };

    container.addEventListener('touchstart', handleInteractionStart, { passive: true });
    container.addEventListener('touchend', handleInteractionEnd, { passive: true });
    container.addEventListener('mousedown', handleInteractionStart);
    container.addEventListener('mouseup', handleInteractionEnd);
    container.addEventListener('mouseleave', handleInteractionEnd);

    const handleScroll = () => {
      if (isInteracting) {
        scrollPos = container.scrollLeft;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
          isInteracting = false;
        }, 2000);
      }
    };
    container.addEventListener('scroll', handleScroll, { passive: true });

    const step = () => {
      if (!isInteracting && isMobile() && container.children.length >= originalCount * 2) {
        scrollPos += scrollSpeed;

        const firstSetEndElement = container.children[originalCount] as HTMLElement;
        if (firstSetEndElement) {
          const W = firstSetEndElement.offsetLeft - (container.children[0] as HTMLElement).offsetLeft;
          if (scrollPos >= W) {
            scrollPos -= W;
          }
        }
        container.scrollLeft = scrollPos;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(interactionTimeout);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
      container.removeEventListener('mousedown', handleInteractionStart);
      container.removeEventListener('mouseup', handleInteractionEnd);
      container.removeEventListener('mouseleave', handleInteractionEnd);
      container.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newArrivals.length]);

  return (
    <section className="py-12 sm:py-16 bg-white relative">
      <div className="w-full px-[6.5%] mx-auto max-w-none relative z-10">

        {/* Desktop Section Header (hidden on mobile) */}
        <div className="hidden sm:flex items-baseline justify-between mb-4 sm:mb-8 pb-1">
          <h2 className="font-raleway font-medium text-[36px] leading-[100%] tracking-normal text-[#453920]">
            New Arrivals
          </h2>
          <Link
            href="/shop?sort=newest"
            className="font-questrial font-light text-[22px] leading-[26px] tracking-normal text-[#B78924] hover:text-gold-600 no-underline border-b border-[#B78924] pb-[2px] text-right inline-block"
          >
            View More
          </Link>
        </div>

        {/* Mobile Section Header (centered style matching mobile screenshot) */}
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
            <span>New Arrivals</span>
          </div>
          <h2 className="font-raleway font-medium text-[26px] leading-[32px] tracking-wide text-neutral-900 uppercase max-w-xs mx-auto mb-3">
            Discover Our Latest Jewelry Designs.
          </h2>
          <div className="w-full text-right px-2 mt-2">
            <Link
              href="/shop?sort=newest"
              className="font-questrial font-light text-[15px] text-[#B78924] hover:text-gold-600 no-underline border-b border-[#B78924] pb-[2px] inline-block"
            >
              View More
            </Link>
          </div>
        </div>

        {/* Desktop Product Grid (Hidden on mobile) */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} centered={true} />
          ))}
        </div>

        {/* Mobile Product Scrollable Container (Visible on mobile only) */}
        <div 
          ref={scrollRef}
          className="flex sm:hidden overflow-x-auto gap-6 pb-6 px-1 scrollbar-none"
        >
          {[...newArrivals, ...newArrivals, ...newArrivals].map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="min-w-[270px] max-w-[290px] w-[78vw] flex-shrink-0"
            >
              <ProductCard product={product} centered={true} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
