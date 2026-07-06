'use client';

import React, { useState } from 'react';

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occasion: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  onClearAll: () => void;
}

const productTypes = [
  { label: 'All', value: '' },
  { label: 'Bangles', value: 'Bangles', count: 65 },
  { label: 'Bracelets', value: 'Bracelets', count: 78 },
  { label: 'Chain', value: 'Chain', count: 56 },
  { label: 'Necklaces', value: 'Necklaces', count: 94 },
  { label: 'Rings', value: 'Rings', count: 84 },
];

const occasions = [
  { label: 'All Occassions', value: '' },
  { label: 'Casual', value: 'Casual', count: 421 },
  { label: 'Classic', value: 'Classic', count: 245 },
  { label: 'Everyday', value: 'Everyday', count: 210 },
  { label: 'Bridal', value: 'Bridal', count: 142 },
];

const MAX_PRICE = 240700;

/* Section heading style: Raleway 500, 14px, uppercase, letter-spacing 13%, #B78924 */
const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: 'Raleway, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '100%',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  color: '#B78924',
};

/* Checkbox option text style: matches items in sidebar */
const optionTextStyle: React.CSSProperties = {
  fontFamily: 'Raleway, sans-serif',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '20px',
  color: '#1E1E1E',
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="7" viewBox="0 0 12 7" fill="none"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M1 1L6 6L11 1" stroke="#1E1E1E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedOccasion,
  setSelectedOccasion,
  priceRange,
  setPriceRange,
}: FilterSidebarProps) {
  const [productTypeOpen, setProductTypeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [occasionsOpen, setOccasionsOpen] = useState(true);

  return (
    <div className="w-full text-left select-none">

      {/* "Filters" title — Raleway 500, 18px, #1E1E1E */}
      <p
        className="mb-4"
        style={{
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '26px',
          color: '#1E1E1E',
        }}
      >
        Filters
      </p>

      {/* ── PRODUCT TYPE ── */}
      <div className="">
        <button
          className="w-full flex items-center justify-between py-3"
          onClick={() => setProductTypeOpen(o => !o)}
        >
          <span style={sectionHeadingStyle}>Product Type</span>
          <Chevron open={productTypeOpen} />
        </button>
        {productTypeOpen && (
          <div className="pb-4 space-y-2.5">
            {productTypes.map((type) => (
              <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory === type.value}
                  onChange={() => setSelectedCategory(type.value)}
                  className="w-3.5 h-3.5 flex-shrink-0 border border-neutral-400 rounded-sm accent-neutral-800"
                />
                <span style={optionTextStyle}>
                  {type.label}
                  {type.count !== undefined && (
                    <span style={{ color: '#6B6B6B' }}> ({type.count})</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── PRICE ── */}
      <div className="border-t border-neutral-200">
        <button
          className="w-full flex items-center justify-between py-3"
          onClick={() => setPriceOpen(o => !o)}
        >
          <span style={sectionHeadingStyle}>Price</span>
          <Chevron open={priceOpen} />
        </button>
        {priceOpen && (
          <div className="pb-5">
            {/* Price labels */}
            <div className="flex justify-between mb-3">
              <span
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  color: '#1E1E1E',
                }}
              >
                ₹ 0
              </span>
              <span
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  color: '#1E1E1E',
                }}
              >
                ₹ {priceRange[1].toLocaleString('en-IN')}
              </span>
            </div>
            {/* Slider */}
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full cursor-pointer"
              style={{ accentColor: '#1E1E1E', height: '2px' }}
            />
          </div>
        )}
      </div>

      {/* ── OCCASIONS ── */}
      <div className="border-t border-neutral-200">
        <button
          className="w-full flex items-center justify-between py-3"
          onClick={() => setOccasionsOpen(o => !o)}
        >
          <span style={sectionHeadingStyle}>Occasions</span>
          <Chevron open={occasionsOpen} />
        </button>
        {occasionsOpen && (
          <div className="pb-4 space-y-2.5">
            {occasions.map((occ) => (
              <label key={occ.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOccasion === occ.value}
                  onChange={() => setSelectedOccasion(occ.value)}
                  className="w-3.5 h-3.5 flex-shrink-0 border border-neutral-400 rounded-sm accent-neutral-800"
                />
                <span style={optionTextStyle}>
                  {occ.label}
                  {occ.count !== undefined && (
                    <span style={{ color: '#6B6B6B' }}> ({occ.count})</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200" />
    </div>
  );
}
