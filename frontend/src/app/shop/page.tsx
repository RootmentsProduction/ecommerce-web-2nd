'use client';

import React, { useState, useEffect, use } from 'react';
import { getProductsPaginated, getFilterMetadata, FilterMetadata } from '../../services/products.service';
import { Product } from '../../types/product';
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
  const paramSearch = resolvedParams.q as string || '';
  const paramGender = resolvedParams.gender as string || '';
  const paramOccasion = resolvedParams.occasion as string || '';
  const paramStock = resolvedParams.inStock as string || '';
  const paramMaxPrice = resolvedParams.maxPrice as string || '';
  const paramPage = resolvedParams.page as string || '1';

  // State bindings
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [selectedGender, setSelectedGender] = useState(paramGender);
  const [selectedOccasion, setSelectedOccasion] = useState(paramOccasion);
  const [selectedStock, setSelectedStock] = useState(paramStock === 'true' ? 'in' : paramStock === 'false' ? 'out' : '');
  const [priceRange, setPriceRange] = useState<number[]>([0, 250000]);
  const [sortBy, setSortBy] = useState(paramSort);
  const [searchQuery, setSearchQuery] = useState(paramSearch);
  const [currentPage, setCurrentPage] = useState(parseInt(paramPage, 10) || 1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [metadata, setMetadata] = useState<FilterMetadata>({
    categories: [],
    price: { min: 0, max: 250000 },
    occasions: [],
    genders: [],
    purities: [],
    brands: [],
    availability: { inStock: 0, outOfStock: 0 },
  });

  const maxPriceBound = metadata.price?.max ?? 250000;
  const minPriceBound = metadata.price?.min ?? 0;

  // Load filter metadata once on mount
  useEffect(() => {
    getFilterMetadata().then((meta) => {
      setMetadata(meta);
      if (meta.price?.max) {
        // Initialize priceRange with values from metadata or URL query maxPrice
        const initialMax = paramMaxPrice ? Number(paramMaxPrice) : meta.price.max;
        setPriceRange([meta.price.min, initialMax]);
      }
    });
  }, [paramMaxPrice]);

  // Synchronize state and URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedOccasion) params.set('occasion', selectedOccasion);
    if (selectedGender) params.set('gender', selectedGender);
    if (selectedStock) {
      params.set('inStock', selectedStock === 'in' ? 'true' : 'false');
    }
    if (priceRange[1] < maxPriceBound) {
      params.set('maxPrice', String(priceRange[1]));
    }
    if (sortBy !== 'featured') params.set('sort', sortBy);
    if (searchQuery) params.set('q', searchQuery);
    if (currentPage > 1) params.set('page', String(currentPage));

    const newUrl = params.toString() ? `/shop?${params.toString()}` : '/shop';
    window.history.pushState({}, '', newUrl);
  }, [
    selectedCategory,
    selectedOccasion,
    selectedGender,
    selectedStock,
    priceRange,
    sortBy,
    searchQuery,
    currentPage,
    maxPriceBound,
  ]);

  // Fetch paginated products based on filters
  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) setLoading(true);
    });

    const queryParams: Record<string, string | number | boolean> = {
      page: currentPage,
      limit: 12,
    };
    if (selectedCategory) queryParams.category = selectedCategory;
    if (selectedOccasion) queryParams.occasion = selectedOccasion;
    if (selectedGender) queryParams.gender = selectedGender;
    if (selectedStock) {
      queryParams.inStock = selectedStock === 'in';
    }
    if (priceRange[1] < maxPriceBound) {
      queryParams.maxPrice = priceRange[1];
    }
    if (sortBy) queryParams.sort = sortBy;
    if (searchQuery) queryParams.search = searchQuery;

    getProductsPaginated(queryParams)
      .then((res) => {
        if (active) {
          setProductsList(res.products);
          setTotalPages(res.totalPages);
          setError(false);
        }
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [
    selectedCategory,
    selectedOccasion,
    selectedGender,
    selectedStock,
    priceRange,
    sortBy,
    searchQuery,
    currentPage,
    maxPriceBound,
  ]);

  // Reset page helper actions
  const changeCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };
  const changeOccasion = (occ: string) => {
    setSelectedOccasion(occ);
    setCurrentPage(1);
  };
  const changeGender = (gen: string) => {
    setSelectedGender(gen);
    setCurrentPage(1);
  };
  const changeStock = (stock: string) => {
    setSelectedStock(stock);
    setCurrentPage(1);
  };
  const changePriceRange = (range: number[]) => {
    setPriceRange(range);
    setCurrentPage(1);
  };
  const changeSortBy = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedCategory('');
    setSelectedGender('');
    setSelectedOccasion('');
    setSelectedStock('');
    setPriceRange([minPriceBound, maxPriceBound]);
    setSortBy('featured');
    setSearchQuery('');
    setCurrentPage(1);
    window.history.pushState({}, '', '/shop');
  };

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-12">
      {/* Content wrapper */}
      <div className="w-full px-[6.5%] flex gap-8 xl:gap-12">
        {/* LEFT SIDEBAR — fixed narrow width, full-height sticky */}
        <aside className="hidden lg:flex flex-col w-[240px] flex-shrink-0 border-r border-neutral-200 sticky top-28 self-start h-[calc(100vh-8rem)] overflow-y-auto pt-6 pr-8">
          <FilterSidebar
            metadata={metadata}
            selectedCategory={selectedCategory}
            setSelectedCategory={changeCategory}
            selectedGender={selectedGender}
            setSelectedGender={changeGender}
            selectedOccasion={selectedOccasion}
            setSelectedOccasion={changeOccasion}
            selectedStock={selectedStock}
            setSelectedStock={changeStock}
            priceRange={priceRange}
            setPriceRange={changePriceRange}
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
            <div className="flex items-center gap-4">
              {searchQuery && (
                <div className="hidden sm:flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded-full text-xs font-questrial text-neutral-600">
                  Search: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')} className="hover:text-black font-bold ml-1">×</button>
                </div>
              )}
              <SortDropdown sortBy={sortBy} setSortBy={changeSortBy} />
            </div>
          </div>

          {/* Search bar inside content on mobile / desktop */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full max-w-md border border-neutral-300 px-4 py-2 text-sm font-questrial placeholder-neutral-400 focus:outline-none focus:border-neutral-800 transition-colors"
            />
          </div>

          {/* Mobile filter button */}
          <div className="flex lg:hidden pt-2 pb-4 justify-between items-center">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 border border-neutral-300 px-4 py-2 text-[11px] uppercase tracking-widest text-neutral-700 font-questrial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 4h18M7 12h10M11 20h2" />
              </svg>
              Filter
            </button>
            {searchQuery && (
              <span className="text-xs font-questrial text-neutral-500">
                Found {productsList.length} items
              </span>
            )}
          </div>

          {/* Product Grid */}
          <div className="px-0">
            {loading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neutral-800" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center font-questrial">
                <p className="text-red-500 mb-2 font-medium">Failed to load products.</p>
                <button
                  onClick={() => handleClearAll()}
                  className="px-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Reset Page
                </button>
              </div>
            ) : productsList.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center font-questrial text-neutral-500">
                <p className="mb-4">No products found for the selected filters.</p>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 border border-neutral-800 text-neutral-800 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <ProductGrid products={productsList} />

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-6 mt-12 font-questrial">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-4 py-2 border border-neutral-300 text-xs uppercase tracking-widest text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-neutral-700 select-none">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-4 py-2 border border-neutral-300 text-xs uppercase tracking-widest text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative flex flex-col w-full max-w-xs py-6 px-6 overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-neutral-800 font-questrial">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterSidebar
              metadata={metadata}
              selectedCategory={selectedCategory}
              setSelectedCategory={changeCategory}
              selectedGender={selectedGender}
              setSelectedGender={changeGender}
              selectedOccasion={selectedOccasion}
              setSelectedOccasion={changeOccasion}
              selectedStock={selectedStock}
              setSelectedStock={changeStock}
              priceRange={priceRange}
              setPriceRange={changePriceRange}
              onClearAll={() => {
                handleClearAll();
                setMobileFiltersOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
