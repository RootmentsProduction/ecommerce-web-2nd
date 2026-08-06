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
  { id: 'cat-1', name: 'Stationery', slug: 'stationery', image: '/crafts/cat_stationaries.png' },
  { id: 'cat-2', name: 'Art & Craft', slug: 'art-craft', image: '/crafts/cat_stationaries.png' },
  { id: 'cat-3', name: 'Drinkware', slug: 'drinkware', image: '/crafts/plush_rocking_horse.png' },
  { id: 'cat-4', name: 'Hair Accessories', slug: 'hair-accessories', image: '/crafts/teething_ring_toy.png' },
  { id: 'cat-5', name: 'Bags & Pouches', slug: 'bags-pouches', image: '/crafts/bear_keychain.png' },
  { id: 'cat-6', name: 'Plush Toys', slug: 'plush-toys', image: '/crafts/cat_plush_toys.png' },
  { id: 'cat-7', name: 'Keychains', slug: 'keychains', image: '/crafts/cat_keychains.png' },
  { id: 'cat-8', name: 'Home & Living', slug: 'home-living', image: '/crafts/cat_home_living.png' },
  { id: 'cat-9', name: 'Gifting', slug: 'gifting', image: '/crafts/hero_stacking_toy.png' },
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
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="w-full px-[6.5%] mx-auto max-w-none">

        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-doodle text-2xl sm:text-3xl text-[#7c3aed] font-medium block mb-1">
            ✨ Handcrafted Collections ✨
          </span>
          <h2 className="font-fredoka font-semibold text-3xl sm:text-4xl text-neutral-900 tracking-tight">
            Shop By Categories
          </h2>
        </div>

        {/* 3-Column Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/80 group hover:border-[#7c3aed] hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Image Thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#f7f5f0] rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Category Name */}
                <span className="font-fredoka font-medium text-base sm:text-lg text-neutral-900 group-hover:text-[#7c3aed] transition-colors">
                  {cat.name}
                </span>
              </div>

              {/* Arrow Up-Right Icon ↗ */}
              <div className="text-[#7c3aed] bg-purple-50 p-2 rounded-full group-hover:bg-[#7c3aed] group-hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H9M17 7V15" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
