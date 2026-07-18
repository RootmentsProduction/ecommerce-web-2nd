'use client';

import React, { useState } from 'react';
import { FilterMetadata } from '@/services/products.service';

interface FilterSidebarProps {
  metadata: FilterMetadata;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occasion: string) => void;
  selectedStock: string; // "" | "in" | "out"
  setSelectedStock: (stock: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  onClearAll: () => void;
}

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
  metadata,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  selectedOccasion,
  setSelectedOccasion,
  selectedStock,
  setSelectedStock,
  priceRange,
  setPriceRange,
  onClearAll,
}: FilterSidebarProps) {
  const [productTypeOpen, setProductTypeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [occasionsOpen, setOccasionsOpen] = useState(true);
  const [genderOpen, setGenderOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);

  // Fallbacks if metadata price range is empty or invalid
  const minPriceBound = metadata.price?.min ?? 0;
  const maxPriceBound = metadata.price?.max ?? 250000;

  return (
    <div className="w-full text-left select-none">
      <div className="flex items-center justify-between mb-4">
        <p
          className="m-0"
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
        <button
          onClick={onClearAll}
          className="text-neutral-500 hover:text-neutral-900 text-xs font-questrial tracking-widest uppercase transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* ── PRODUCT TYPE (CATEGORIES) ── */}
      <div className="border-t border-neutral-200">
        <button
          className="w-full flex items-center justify-between py-3"
          onClick={() => setProductTypeOpen(o => !o)}
        >
          <span style={sectionHeadingStyle}>Product Type</span>
          <Chevron open={productTypeOpen} />
        </button>
        {productTypeOpen && (
          <div className="pb-4 space-y-2.5">
            {metadata.categories.length === 0 ? (
              <p className="text-neutral-400 text-xs italic font-questrial">No types available</p>
            ) : (
              metadata.categories.map((cat) => (
                <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategory.toLowerCase() === cat.slug.toLowerCase()}
                    onChange={() => {
                      if (selectedCategory.toLowerCase() === cat.slug.toLowerCase()) {
                        setSelectedCategory('');
                      } else {
                        setSelectedCategory(cat.slug);
                      }
                    }}
                    className="w-3.5 h-3.5 flex-shrink-0 border border-neutral-400 rounded-sm accent-neutral-800"
                  />
                  <span style={optionTextStyle}>
                    {cat.name}
                    <span style={{ color: '#6B6B6B' }}> ({cat.count})</span>
                  </span>
                </label>
              ))
            )}
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
            <div className="flex justify-between mb-3">
              <span
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  color: '#1E1E1E',
                }}
              >
                ₹ {minPriceBound.toLocaleString('en-IN')}
              </span>
              <span
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  color: '#1E1E1E',
                }}
              >
                ₹ {(priceRange[1] < minPriceBound ? maxPriceBound : priceRange[1]).toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={minPriceBound}
              max={maxPriceBound === minPriceBound ? maxPriceBound + 1000 : maxPriceBound}
              step={maxPriceBound - minPriceBound > 10000 ? 1000 : 100}
              value={priceRange[1] < minPriceBound ? maxPriceBound : priceRange[1]}
              onChange={(e) => setPriceRange([minPriceBound, Number(e.target.value)])}
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
            {metadata.occasions.length === 0 ? (
              <p className="text-neutral-400 text-xs italic font-questrial">No occasions available</p>
            ) : (
              metadata.occasions.map((occ) => (
                <label key={occ.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedOccasion.toLowerCase() === occ.value.toLowerCase()}
                    onChange={() => {
                      if (selectedOccasion.toLowerCase() === occ.value.toLowerCase()) {
                        setSelectedOccasion('');
                      } else {
                        setSelectedOccasion(occ.value);
                      }
                    }}
                    className="w-3.5 h-3.5 flex-shrink-0 border border-neutral-400 rounded-sm accent-neutral-800"
                  />
                  <span style={optionTextStyle}>
                    {occ.value}
                    <span style={{ color: '#6B6B6B' }}> ({occ.count})</span>
                  </span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── GENDER ── */}
      <div className="border-t border-neutral-200">
        <button
          className="w-full flex items-center justify-between py-3"
          onClick={() => setGenderOpen(o => !o)}
        >
          <span style={sectionHeadingStyle}>Gender</span>
          <Chevron open={genderOpen} />
        </button>
        {genderOpen && (
          <div className="pb-4 space-y-2.5">
            {metadata.genders.length === 0 ? (
              <p className="text-neutral-400 text-xs italic font-questrial">No genders available</p>
            ) : (
              metadata.genders.map((gen) => (
                <label key={gen.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGender.toLowerCase() === gen.value.toLowerCase()}
                    onChange={() => {
                      if (selectedGender.toLowerCase() === gen.value.toLowerCase()) {
                        setSelectedGender('');
                      } else {
                        setSelectedGender(gen.value);
                      }
                    }}
                    className="w-3.5 h-3.5 flex-shrink-0 border border-neutral-400 rounded-sm accent-neutral-800"
                  />
                  <span style={optionTextStyle}>
                    {gen.value}
                    <span style={{ color: '#6B6B6B' }}> ({gen.count})</span>
                  </span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── AVAILABILITY ── */}
      <div className="border-t border-neutral-200">
        <button
          className="w-full flex items-center justify-between py-3"
          onClick={() => setAvailabilityOpen(o => !o)}
        >
          <span style={sectionHeadingStyle}>Availability</span>
          <Chevron open={availabilityOpen} />
        </button>
        {availabilityOpen && (
          <div className="pb-4 space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStock === 'in'}
                onChange={() => setSelectedStock(selectedStock === 'in' ? '' : 'in')}
                className="w-3.5 h-3.5 flex-shrink-0 border border-neutral-400 rounded-sm accent-neutral-800"
              />
              <span style={optionTextStyle}>
                In Stock
                <span style={{ color: '#6B6B6B' }}> ({metadata.availability?.inStock ?? 0})</span>
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStock === 'out'}
                onChange={() => setSelectedStock(selectedStock === 'out' ? '' : 'out')}
                className="w-3.5 h-3.5 flex-shrink-0 border border-neutral-400 rounded-sm accent-neutral-800"
              />
              <span style={optionTextStyle}>
                Out of Stock
                <span style={{ color: '#6B6B6B' }}> ({metadata.availability?.outOfStock ?? 0})</span>
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200" />
    </div>
  );
}
