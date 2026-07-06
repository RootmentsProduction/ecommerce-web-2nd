import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function InstagramSection() {
  // Alternating between the main and hover images for a curated feed look
  const feed = [
    { src: '/product-main.png', alt: 'Instagram look 1' },
    { src: '/product-hover.jpg', alt: 'Instagram look 2' },
    { src: '/product-main.png', alt: 'Instagram look 3' },
    { src: '/product-hover.jpg', alt: 'Instagram look 4' },
    { src: '/product-main.png', alt: 'Instagram look 5' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white relative">
      
      {/* Header aligns with grid lines */}
      <div className="w-full px-[6.5%] mx-auto max-w-none relative z-10 mb-8">
        <div className="flex items-center gap-2 font-questrial text-[22px] leading-[26px] tracking-normal text-[#B78924] font-normal mb-1 sm:mb-4">
          <span>✳</span>
          <span>Shared Moments</span>
        </div>
        <div className="flex items-baseline justify-between pb-4">
          <h2 className="font-raleway font-medium text-[36px] leading-[100%] tracking-normal text-[#453920]">
            Follow Us On Instagram
          </h2>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-questrial font-light text-[24px] leading-[26px] tracking-normal text-[#B78924] hover:text-gold-600 no-underline border-b border-[#B78924] pb-[2px] text-right inline-block"
          >
            @Jewelrybyzorucci
          </Link>
        </div>
      </div>

      {/* Gallery (Full-width edge-to-edge auto-scrolling marquee) */}
      <div className="w-full overflow-hidden relative">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee-scroll 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="animate-marquee gap-4 px-4">
          {/* Double the array elements to ensure seamless loop */}
          {[...feed, ...feed].map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-square w-[220px] sm:w-[280px] md:w-[320px] flex-shrink-0 overflow-hidden bg-neutral-100"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 220px, 320px"
                className="object-cover transition-transform duration-700 ease-out hover:scale-103"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
