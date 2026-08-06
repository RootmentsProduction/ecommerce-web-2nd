"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import ProductCard from '../product/ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
}

export default function NewArrivalsSection({ products: newArrivals }: NewArrivalsSectionProps) {

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

    let expectedScrollLeft = container.scrollLeft;

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
      const isProgrammatic = Math.abs(container.scrollLeft - expectedScrollLeft) < 1;
      if (!isProgrammatic) {
        isInteracting = true;
        scrollPos = container.scrollLeft;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
          isInteracting = false;
        }, 2000);
      }
    };
    container.addEventListener('scroll', handleScroll, { passive: true });

    const step = () => {
      if (!isMobile()) return;
      if (!isInteracting && container.children.length >= originalCount * 2) {
        scrollPos += scrollSpeed;

        const firstSetEndElement = container.children[originalCount] as HTMLElement;
        if (firstSetEndElement) {
          const W = firstSetEndElement.offsetLeft - (container.children[0] as HTMLElement).offsetLeft;
          if (scrollPos >= W) {
            scrollPos -= W;
          }
        }
        container.scrollLeft = scrollPos;
        expectedScrollLeft = container.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    if (isMobile()) {
      animationFrameId = requestAnimationFrame(step);
    }

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

  if (!newArrivals || newArrivals.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-white relative">
        <div className="w-full px-[6.5%] mx-auto max-w-none text-center py-12">
          <p className="text-neutral-500 font-questrial text-sm">No new arrivals available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-white relative">
      <div className="w-full px-[6.5%] mx-auto max-w-none relative z-10">

        {/* Desktop Section Header */}
        <div className="hidden sm:flex items-baseline justify-between mb-6 sm:mb-8 pb-1">
          <h2 className="font-raleway font-medium text-[32px] sm:text-[36px] leading-[100%] tracking-normal text-[#3c2f1d]">
            New Arrivals
          </h2>
          <Link
            href="/shop?sort=newest"
            className="font-questrial text-[18px] sm:text-[20px] tracking-normal text-[#8b5cf6] hover:text-[#7c3aed] no-underline border-b border-[#8b5cf6] pb-[2px] text-right inline-block transition-colors"
          >
            View More
          </Link>
        </div>

        {/* Mobile Section Header */}
        <div className="flex items-center justify-between mb-4 sm:hidden px-1">
          <h2 className="font-raleway font-medium text-[24px] text-[#3c2f1d]">
            New Arrivals
          </h2>
          <Link
            href="/shop?sort=newest"
            className="font-questrial text-[14px] text-[#8b5cf6] hover:text-[#7c3aed] border-b border-[#8b5cf6] pb-[2px]"
          >
            View More
          </Link>
        </div>

        {/* Desktop Product Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} centered={true} />
          ))}
        </div>

        {/* Mobile Product Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex sm:hidden overflow-x-auto gap-4 pb-6 px-1 scrollbar-none"
        >
          {newArrivals.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="min-w-[240px] max-w-[260px] w-[75vw] flex-shrink-0"
            >
              <ProductCard product={product} centered={true} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
