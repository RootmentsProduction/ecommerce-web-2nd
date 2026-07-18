'use client';

import React from 'react';

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Best Rated' },
];

export default function SortDropdown({ sortBy, setSortBy }: SortDropdownProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="appearance-none font-questrial text-[12px] uppercase tracking-widest text-neutral-700 bg-white border border-neutral-300 pl-4 pr-10 py-2.5 cursor-pointer focus:outline-none hover:border-neutral-500 transition-colors"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#1E1E1E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
