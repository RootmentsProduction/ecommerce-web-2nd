"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const INSTAGRAM_CRAFTS_IMAGES = [
  { id: 1, src: '/crafts/teething_ring_toy.png', alt: 'Flower Hairpins' },
  { id: 2, src: '/crafts/bear_keychain.png', alt: 'Pastel Hair Elastic Ties' },
  { id: 3, src: '/crafts/cat_keychains.png', alt: 'Bunny Hair Elastics' },
  { id: 4, src: '/crafts/cat_home_living.png', alt: 'Cute Bunny Keychains' },
  { id: 5, src: '/crafts/plush_teddy_bear.png', alt: 'Plush Craft Gift' },
];

export default function InstagramSection() {
  return (
    <section className="py-12 bg-white relative sm:py-20">
      <div className="w-full px-[6.5%] mx-auto max-w-none relative z-10 mb-8">
        
        {/* Sub-heading */}
        <div className="flex items-center gap-2 font-questrial text-[18px] sm:text-[22px] text-[#8b5cf6] font-normal mb-2">
          <span>✳</span>
          <span>Shared Moments</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4">
          <h2 className="font-raleway font-medium text-[30px] sm:text-[40px] leading-[100%] tracking-normal text-[#3c2f1d]">
            Follow Us On Instagram
          </h2>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-questrial text-[18px] sm:text-[24px] text-[#8b5cf6] hover:text-[#7c3aed] no-underline border-b border-[#8b5cf6] pb-[2px] inline-block transition-colors"
          >
            @Craftsbyzorucci
          </Link>
        </div>

      </div>

      {/* Gallery Grid / Slider matching Screenshot 5 */}
      <div className="w-full px-[6.5%] overflow-x-auto scrollbar-none">
        <div className="flex gap-6 min-w-max pb-4">
          {INSTAGRAM_CRAFTS_IMAGES.map((img) => (
            <div
              key={img.id}
              className="relative aspect-[3/4] w-[200px] sm:w-[260px] md:w-[290px] flex-shrink-0 overflow-hidden bg-[#f7f5f0] group shadow-xs hover:shadow-md transition-shadow"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-questrial text-sm tracking-wider uppercase bg-black/40 px-4 py-2 rounded-full backdrop-blur-xs">
                  View Post
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


