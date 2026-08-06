import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/services/categories.service';
import { getSystemSettings } from '@/services/system-settings.service';

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
const DEFAULT_CRAFTS_CATEGORIES = [
  { id: 'cat-1', name: 'Toys', slug: 'toys', image: '/crafts/hero_stacking_toy.png' },
  { id: 'cat-2', name: 'Plush Toys', slug: 'plush-toys', image: '/crafts/cat_plush_toys.png' },
  { id: 'cat-3', name: 'Stationaries', slug: 'stationaries', image: '/crafts/cat_stationaries.png' },
  { id: 'cat-4', name: 'Art & Crafts', slug: 'art-crafts', image: '/crafts/cat_stationaries.png' },
  { id: 'cat-5', name: 'Keychains', slug: 'keychains', image: '/crafts/cat_keychains.png' },
  { id: 'cat-6', name: 'Diary', slug: 'diary', image: '/crafts/cat_stationaries.png' },
  { id: 'cat-7', name: 'Bags & Pouches', slug: 'bags-pouches', image: '/crafts/bear_keychain.png' },
  { id: 'cat-8', name: 'Home & Living', slug: 'home-living', image: '/crafts/cat_home_living.png' },
  { id: 'cat-9', name: 'Hair Accessories', slug: 'hair-accessories', image: '/crafts/teething_ring_toy.png' },
  { id: 'cat-10', name: 'Drinkware', slug: 'drinkware', image: '/crafts/plush_rocking_horse.png' },
  { id: 'cat-11', name: 'Candles', slug: 'candles', image: '/crafts/plush_teddy_bear.png' },
  { id: 'cat-12', name: 'Gifting', slug: 'gifting', image: '/crafts/cat_keychains.png' },
];

export default async function CategorySection() {
  const raw = await getCategories();
  const backendCategories = raw as unknown as BackendCategory[];

  const categories = backendCategories.length > 0
    ? backendCategories.map((c, i) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        image: c.image || DEFAULT_CRAFTS_CATEGORIES[i % DEFAULT_CRAFTS_CATEGORIES.length].image,
      }))
    : DEFAULT_CRAFTS_CATEGORIES;

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="w-full px-[6.5%] mx-auto max-w-none">

        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-raleway font-medium text-[30px] sm:text-[40px] leading-[100%] tracking-normal text-[#3c2f1d]">
            Shop By Categories
          </h2>
        </div>

        {/* 3-Column Category Grid matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="flex items-center justify-between py-4 border-b border-neutral-200 group hover:border-neutral-400 transition-colors"
            >
              <div className="flex items-center gap-5">
                {/* Image Thumbnail */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#f7f5f0] overflow-hidden flex-shrink-0">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Category Name */}
                <span className="font-questrial font-normal text-lg sm:text-[21px] text-neutral-800 group-hover:text-neutral-950 transition-colors">
                  {cat.name}
                </span>
              </div>

              {/* Arrow Up-Right Icon ↗ */}
              <div className="text-neutral-700 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M7 17L17 7M17 7H9M17 7V15" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
