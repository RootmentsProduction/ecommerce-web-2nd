'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

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

  return (
    <div className="relative w-full aspect-square bg-[#f7f7f5] overflow-hidden border border-neutral-200">
      <Image
        src={images[activeIdx]}
        alt="Product view"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      
      {/* Left Arrow overlay */}
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
          aria-label="Previous image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Right Arrow overlay */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
          aria-label="Next image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
