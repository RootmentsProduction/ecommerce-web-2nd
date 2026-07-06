import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategorySection() {
  const categoryRows = [
    {
      name: 'Bracelets',
      href: '/shop?category=bracelets',
      img: '/thumb_bracelets.png',
    },
    {
      name: 'Earrings',
      href: '/shop?category=earrings',
      img: '/thumb_earrings1.png',
    },
    {
      name: 'Necklace',
      href: '/shop?category=necklaces',
      img: '/thumb_necklace.png',
    },
    {
      name: 'Earrings',
      href: '/shop?category=earrings',
      img: '/thumb_earrings2.png',
    },
    {
      name: 'Rings',
      href: '/shop?category=rings',
      img: '/thumb_rings.png',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="w-full px-[6.5%] mx-auto max-w-none">
        
        {/* Desktop Centered Heading (hidden on mobile) */}
        <div className="hidden sm:block text-center mb-10 sm:mb-14">
          <h2 className="font-raleway font-medium text-[36px] leading-[100%] tracking-normal text-center text-[#453920]">
            Shop By Categories
          </h2>
        </div>

        {/* Mobile Centered Heading (centered style matching mobile screenshot) */}
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
            <span>Our Collection</span>
          </div>
          <h2 className="font-raleway font-medium text-[26px] leading-[32px] tracking-wide text-neutral-900 uppercase max-w-xs mx-auto">
            Shop By Categories
          </h2>
        </div>

        {/* Split Grid Layout with swap order on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (5 Category Rows) - order 2 on mobile, order 1 on desktop */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            {categoryRows.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className={`flex items-center justify-between py-[22px] group transition-colors duration-300 hover:bg-neutral-50/50 px-0 ${
                  idx !== categoryRows.length - 1 ? 'border-b border-neutral-200' : ''
                }`}
              >
                <div className="flex items-center gap-8">
                  {/* Category Small Thumbnail */}
                  <div className="relative w-[72px] h-[72px] bg-neutral-50 overflow-hidden flex-shrink-0">
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  {/* Category Name */}
                  <span className="font-questrial font-normal text-[22px] leading-[26px] tracking-normal text-neutral-800">
                    {cat.name}
                  </span>
                </div>

                {/* Arrow indicator */}
                <div className="text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5 19L19 5m0 0H9m10 0v10" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column (Large Visual Image) - order 1 on mobile, order 2 on desktop */}
          <div className="lg:col-span-7 h-full order-1 lg:order-2">
            <div className="relative aspect-[4/3.1] w-full overflow-hidden bg-neutral-50">
              <Image
                src="/cat_large.png"
                alt="Layered Gold Necklaces Styling"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
