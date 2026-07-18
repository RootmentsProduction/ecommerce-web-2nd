import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/services/categories.service';

// ---------------------------------------------------------------------------
// Types – matches what the backend /api/categories endpoint returns.
// The public endpoint only returns isActive: true records, so no client-side
// filtering is needed here.
// ---------------------------------------------------------------------------
interface BackendCategory {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  isActive: boolean;
  sortOrder: number;
  productCount?: number;
  // The Category type in @/types/category uses `count` but the backend
  // field is `productCount`. The service maps them identically so we accept
  // both shapes via optional spread fields.
  count?: number;
}

// ---------------------------------------------------------------------------
// Loading skeleton – exported so page.tsx can use it as a Suspense fallback
// ---------------------------------------------------------------------------
export function CategorySectionSkeleton() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="w-full px-[6.5%] mx-auto max-w-none">
        {/* Desktop heading skeleton */}
        <div className="hidden sm:block text-center mb-10 sm:mb-14">
          <div className="h-9 w-56 bg-neutral-100 rounded mx-auto animate-pulse" />
        </div>
        {/* Mobile heading skeleton */}
        <div className="flex flex-col items-center text-center mb-6 sm:hidden">
          <div className="h-4 w-32 bg-neutral-100 rounded mb-2 animate-pulse" />
          <div className="h-7 w-48 bg-neutral-100 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left – row skeletons */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-[22px] ${
                  i !== 3 ? 'border-b border-neutral-200' : ''
                }`}
              >
                <div className="flex items-center gap-8">
                  <div className="w-[72px] h-[72px] bg-neutral-100 rounded-md animate-pulse flex-shrink-0" />
                  <div className="h-5 w-28 bg-neutral-100 rounded animate-pulse" />
                </div>
                <div className="w-7 h-7 bg-neutral-100 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
          {/* Right – image skeleton */}
          <div className="lg:col-span-7 h-full order-1 lg:order-2">
            <div className="relative aspect-[4/3.1] w-full bg-neutral-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
function EmptyCategories() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="w-full px-[6.5%] mx-auto max-w-none">
        <div className="hidden sm:block text-center mb-10 sm:mb-14">
          <h2 className="font-raleway font-medium text-[36px] leading-[100%] tracking-normal text-center text-[#453920]">
            Shop By Categories
          </h2>
        </div>
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
              textTransform: 'uppercase',
            }}
          >
            <span className="text-[16px]">✳</span>
            <span>Our Collection</span>
          </div>
          <h2 className="font-raleway font-medium text-[26px] leading-[32px] tracking-wide text-neutral-900 uppercase max-w-xs mx-auto">
            Shop By Categories
          </h2>
        </div>
        <p className="text-center text-neutral-400 text-sm py-8">
          No categories available yet.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main async server component
// ---------------------------------------------------------------------------
export default async function CategorySection() {
  // getCategories() already catches all errors and returns [] on failure.
  const raw = await getCategories();

  // Cast to the richer backend shape. The service may return objects where
  // `count` maps to productCount; both are optional here and we don't use them
  // in the UI, so no mapping is required beyond slug/image.
  const categories = raw as unknown as BackendCategory[];

  if (categories.length === 0) {
    return <EmptyCategories />;
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="w-full px-[6.5%] mx-auto max-w-none">

        {/* Desktop Centered Heading (hidden on mobile) */}
        <div className="hidden sm:block text-center mb-10 sm:mb-14">
          <h2 className="font-raleway font-medium text-[36px] leading-[100%] tracking-normal text-center text-[#453920]">
            Shop By Categories
          </h2>
        </div>

        {/* Mobile Centered Heading */}
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
              textTransform: 'uppercase',
            }}
          >
            <span className="text-[16px]">✳</span>
            <span>Our Collection</span>
          </div>
          <h2 className="font-raleway font-medium text-[26px] leading-[32px] tracking-wide text-neutral-900 uppercase max-w-xs mx-auto">
            Shop By Categories
          </h2>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column – live category rows */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className={`flex items-center justify-between py-[22px] group transition-colors duration-300 hover:bg-neutral-50/50 px-0 ${
                  idx !== categories.length - 1 ? 'border-b border-neutral-200' : ''
                }`}
              >
                <div className="flex items-center gap-8">
                  {/* Category Thumbnail */}
                  <div className="relative w-[72px] h-[72px] bg-neutral-50 overflow-hidden flex-shrink-0 rounded-md border border-neutral-100">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="72px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        unoptimized={false}
                      />
                    ) : (
                      /* Placeholder when no image is set */
                      <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                        <svg
                          className="w-6 h-6 text-neutral-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
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

          {/* Right Column – large editorial image */}
          <div className="lg:col-span-7 h-full order-1 lg:order-2">
            <div className="relative aspect-[4/3.1] w-full overflow-hidden bg-neutral-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-500">
              <Image
                src="/cat_large.png"
                alt="Layered Gold Necklaces Styling"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
