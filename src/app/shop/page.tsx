'use client';

import React, { useState, use } from 'react';
import { products } from '../../data/products';
import ProductGrid from '../../components/product/ProductGrid';
import FilterSidebar from '../../components/shop/FilterSidebar';
import SortDropdown from '../../components/shop/SortDropdown';

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = use(searchParams);
  const paramCategory = resolvedParams.category as string || '';
  const paramSort = resolvedParams.sort as string || 'featured';
  const paramFilter = resolvedParams.filter as string || '';
  const paramSearch = resolvedParams.q as string || '';
  const paramCollection = resolvedParams.collection as string || '';

  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 240700]);
  const [sortBy, setSortBy] = useState(paramSort);
  const [searchQuery] = useState(paramSearch);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [prevCategory, setPrevCategory] = useState(paramCategory);
  const [prevSort, setPrevSort] = useState(paramSort);

  if (paramCategory !== prevCategory) { setPrevCategory(paramCategory); setSelectedCategory(paramCategory); }
  if (paramSort !== prevSort) { setPrevSort(paramSort); setSortBy(paramSort); }

  const handleClearAll = () => {
    setSelectedCategory(''); setSelectedGender(''); setSelectedOccasion('');
    setPriceRange([0, 240700]); setSortBy('featured');
    window.history.pushState({}, '', '/shop');
  };

  let filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (selectedGender && product.gender.toLowerCase() !== selectedGender.toLowerCase()) return false;
    if (selectedOccasion && !product.occasion.map(o => o.toLowerCase()).includes(selectedOccasion.toLowerCase())) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!product.title.toLowerCase().includes(q) && !product.description.toLowerCase().includes(q) && !product.category.toLowerCase().includes(q)) return false;
    }
    if (paramFilter === 'bestseller' && !product.isBestSeller) return false;
    if (paramFilter === 'newest' && !product.isNewArrival) return false;
    if (paramCollection === 'aurelia' && !product.title.toLowerCase().includes('aurelia')) return false;
    return true;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'rating_desc': return b.rating - a.rating;
      case 'newest': return a.isNewArrival === b.isNewArrival ? 0 : a.isNewArrival ? -1 : 1;
      default: return a.isBestSeller === b.isBestSeller ? 0 : a.isBestSeller ? -1 : 1;
    }
  });

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-12">

      {/* Content wrapper with px-[6.5%] horizontal margins */}
      <div className="w-full px-[6.5%] flex gap-8 xl:gap-12">

        {/* LEFT SIDEBAR — fixed narrow width, full-height sticky */}
        <aside className="hidden lg:flex flex-col w-[240px] flex-shrink-0 border-r border-neutral-200 sticky top-28 self-start h-[calc(100vh-8rem)] overflow-y-auto pt-6 pr-8">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedOccasion={selectedOccasion}
            setSelectedOccasion={setSelectedOccasion}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onClearAll={handleClearAll}
          />
        </aside>

        {/* RIGHT CONTENT — fills remaining width */}
        <main className="flex-1 min-w-0 pl-4">

          {/* SHOP NOW heading row */}
          <div className="flex items-center justify-between pt-6 pb-5">
            <h1 className="font-raleway font-medium text-[28px] sm:text-[32px] leading-[100%] tracking-normal text-neutral-900 uppercase">
              Shop Now
            </h1>
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          {/* Mobile filter button */}
          <div className="flex lg:hidden px-4 pt-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 border border-neutral-300 px-4 py-2 text-[11px] uppercase tracking-widest text-neutral-700 font-questrial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 4h18M7 12h10M11 20h2" />
              </svg>
              Filter
            </button>
          </div>

          {/* Product Grid */}
          <div className="px-0">
            <ProductGrid products={filteredProducts} />
          </div>
        </main>
      </div> {/* Closing content wrapper */}

      {/* Mobile Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative flex flex-col w-full max-w-xs py-6 px-6 overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-neutral-800">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={(v) => { setSelectedCategory(v); setMobileFiltersOpen(false); }}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              selectedOccasion={selectedOccasion}
              setSelectedOccasion={(v) => { setSelectedOccasion(v); setMobileFiltersOpen(false); }}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onClearAll={() => { handleClearAll(); setMobileFiltersOpen(false); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
