'use client';

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Ananya Sharma",
    product: "Plush Toys & Keychains",
    quote: "The plush teddy bear and keychains came wrapped in cute lavender paper with a handwritten note!",
    avatar: "A",
    color: "bg-purple-600",
  },
  {
    id: 2,
    name: "Priya Patel",
    product: "Art & Craft Supplies",
    quote: "Super soft yarn quality in the DIY crochet kit. Step-by-step instructions made it so fun!",
    avatar: "P",
    color: "bg-pink-600",
  },
  {
    id: 3,
    name: "Rohan Verma",
    product: "Drinkware & Accessories",
    quote: "The ceramic bunny mug finish is so premium. Delivered in 48 hours with zero damage!",
    avatar: "R",
    color: "bg-amber-600",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const active = REVIEWS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-10 bg-white border-t border-neutral-100">
      <div className="w-full px-[6.5%] mx-auto">
        
        {/* Soft Lavender Banner Card */}
        <div className="bg-[#f5efff] rounded-2xl p-6 sm:p-8 border border-purple-200/50 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          
          {/* Left Rating Accent */}
          <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-purple-200/80 pb-4 md:pb-0 md:pr-8 flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#8b5cf6] text-white font-fredoka text-xl font-bold flex items-center justify-center shadow-xs">
              4.9
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-500 mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="font-fredoka text-xs text-neutral-800 font-semibold">
                1,000+ Happy Crafters
              </p>
            </div>
          </div>

          {/* Center Quote Display */}
          <div className="flex-1 max-w-2xl px-2 text-center md:text-left">
            <Quote className="w-6 h-6 text-[#8b5cf6]/40 mb-1 inline-block md:block" />
            <p className="font-questrial text-neutral-800 text-sm sm:text-base leading-relaxed font-medium">
              &ldquo;{active.quote}&rdquo;
            </p>
            <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
              <span className="font-fredoka text-xs font-semibold text-neutral-900">
                {active.name}
              </span>
              <span className="text-neutral-400 text-xs">•</span>
              <span className="font-questrial text-xs text-[#8b5cf6] font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Verified Buyer ({active.product})
              </span>
            </div>
          </div>

          {/* Right Navigation Dots & Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white text-neutral-700 hover:bg-[#8b5cf6] hover:text-white flex items-center justify-center transition-colors border border-purple-200/60 shadow-xs"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 px-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-6 bg-[#8b5cf6]' : 'w-2 bg-purple-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white text-neutral-700 hover:bg-[#8b5cf6] hover:text-white flex items-center justify-center transition-colors border border-purple-200/60 shadow-xs"
              aria-label="Next Review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
