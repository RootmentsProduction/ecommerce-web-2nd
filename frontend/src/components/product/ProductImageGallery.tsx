'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Image
      setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev Image
      setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Main Image Container */}
      <div 
        className="relative w-full aspect-square bg-[#f7f7f5] overflow-hidden border border-neutral-200"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[activeIdx]}
          alt="Product view"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-300 ease-in-out"
        />
        
        {/* Left Arrow overlay (Translucent Circle) */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/20 hover:bg-black/45 text-white rounded-full backdrop-blur-xs transition-all hover:scale-105 cursor-pointer z-10"
            aria-label="Previous image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Right Arrow overlay (Translucent Circle) */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/20 hover:bg-black/45 text-white rounded-full backdrop-blur-xs transition-all hover:scale-105 cursor-pointer z-10"
            aria-label="Next image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {images.map((img, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 aspect-square overflow-hidden bg-[#f7f7f5] border transition-all cursor-pointer rounded-lg flex-shrink-0 ${
                  isActive 
                    ? 'border-[#C99213] ring-1 ring-[#C99213]/40 opacity-100 shadow-sm' 
                    : 'border-neutral-200 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
