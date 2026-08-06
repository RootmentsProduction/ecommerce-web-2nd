import React from 'react';
import Image from 'next/image';

const INSTAGRAM_CRAFTS_IMAGES = [
  { id: 1, src: '/crafts/teething_ring_toy.png', alt: 'Flower Hairpins' },
  { id: 2, src: '/crafts/bear_keychain.png', alt: 'Pastel Hair Elastic Ties' },
  { id: 3, src: '/crafts/cat_keychains.png', alt: 'Bunny Hair Elastics' },
  { id: 4, src: '/crafts/cat_home_living.png', alt: 'Cute Bunny Keychains' },
  { id: 5, src: '/crafts/plush_teddy_bear.png', alt: 'Plush Craft Gift' },
];

export default function InstagramSection() {
  // Repeat gallery items for endless smooth horizontal scrolling
  const marqueeImages = [
    ...INSTAGRAM_CRAFTS_IMAGES,
    ...INSTAGRAM_CRAFTS_IMAGES,
    ...INSTAGRAM_CRAFTS_IMAGES,
    ...INSTAGRAM_CRAFTS_IMAGES,
  ];

  return (
    <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="w-full px-[6.5%] mx-auto max-w-none relative z-10 mb-8">
        
        {/* Sub-heading */}
        <div className="flex items-center gap-2 font-doodle text-xl sm:text-2xl text-[#7c3aed] font-medium mb-2">
          <span>✳</span>
          <span>Shared Moments</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-2">
          <h2 className="font-fredoka font-semibold text-3xl sm:text-4xl text-neutral-900 tracking-tight">
            Follow Us On Instagram
          </h2>
        </div>

      </div>

      {/* Hardware-Accelerated Smooth GPU Auto-Scroll Gallery Container */}
      <div className="w-full overflow-hidden">
        <div className="animate-marquee-slow flex gap-6">
          {marqueeImages.map((img, idx) => (
            <div
              key={`${img.id}-${idx}`}
              className="relative aspect-[3/4] w-[200px] sm:w-[260px] md:w-[290px] flex-shrink-0 overflow-hidden bg-[#f7f5f0] rounded-2xl group shadow-xs hover:shadow-md transition-shadow"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-fredoka text-xs sm:text-sm tracking-wider uppercase bg-black/40 px-4 py-2 rounded-full backdrop-blur-xs">
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


