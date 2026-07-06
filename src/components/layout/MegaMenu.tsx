import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuItem } from '../../types/menu';

interface MegaMenuProps {
  item: MenuItem;
  onClose: () => void;
}

export default function MegaMenu({ item, onClose }: MegaMenuProps) {
  if (!item.megaMenuColumns) return null;

  return (
    <div
      className="fixed left-0 right-0 top-16 md:top-20 w-full bg-white border-b border-neutral-200 shadow-lg z-50"
      onMouseLeave={onClose}
    >
      {/* Align inner content to px-[6.5%] grid margin */}
      <div className="w-full px-[6.5%] py-10 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        
        {/* Categories columns (Left-aligned, taking 3/4 space) */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-10">
          {item.megaMenuColumns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              
              {/* Primary Section */}
              <div className="space-y-3">
                <h3
                  className="text-[12px] font-semibold tracking-[0.1em] border-b border-neutral-100 pb-2"
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    color: '#B78924',
                  }}
                >
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.items.map((subItem, sIdx) => (
                    <li key={sIdx}>
                      <Link
                        href={subItem.href}
                        onClick={onClose}
                        className="block text-[12px] text-neutral-600 hover:text-[#B78924] transition-colors font-questrial tracking-wide uppercase"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nested Secondary Section (e.g. BRACELETS under RINGS) */}
              {col.secondarySection && (
                <div className="space-y-3 pt-1">
                  <h3
                    className="text-[12px] font-semibold tracking-[0.1em] border-b border-neutral-100 pb-2"
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      color: '#B78924',
                    }}
                  >
                    {col.secondarySection.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.secondarySection.items.map((subItem, sIdx) => (
                      <li key={sIdx}>
                        <Link
                          href={subItem.href}
                          onClick={onClose}
                          className="block text-[12px] text-neutral-600 hover:text-[#B78924] transition-colors font-questrial tracking-wide uppercase"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Promo Image Card (Right-aligned, taking 1/4 space) */}
        {item.promoImage && (
          <div className="col-span-1 flex justify-end w-full">
            <Link
              href={item.promoImage.href}
              onClick={onClose}
              className="relative block aspect-[4/3.1] w-full overflow-hidden bg-neutral-50 border border-neutral-200"
            >
              <Image
                src={item.promoImage.src}
                alt={item.promoImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
