'use client';

import React, { useState } from 'react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import ProductImageGallery from './ProductImageGallery';
import ProductCard from './ProductCard';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const attributes = [];
    if (product.category === 'Rings') {
      attributes.push({ name: 'Ring Size', value: '7' });
    } else if (product.category === 'Necklaces') {
      attributes.push({ name: 'Length', value: '18 inches' });
    }
    addToCart(product, quantity, attributes);
    alert(`${quantity} x ${product.title} added to your shopping bag!`);
  };

  const handleBuyNow = () => {
    const attributes = [];
    if (product.category === 'Rings') {
      attributes.push({ name: 'Ring Size', value: '7' });
    } else if (product.category === 'Necklaces') {
      attributes.push({ name: 'Length', value: '18 inches' });
    }
    addToCart(product, quantity, attributes);
    window.location.href = '/cart';
  };

  const hasDiscount = product.discount > 0;

  return (
    <div className={`bg-white min-h-screen pt-24 sm:pt-32 text-left ${relatedProducts.length > 0 ? 'pb-8 sm:pb-16' : 'pb-2'}`}>
      <div className="w-full px-[6.5%] mx-auto max-w-none">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch pb-4">
          
          {/* Left Column: Image Box (Col 6) */}
          <div className="lg:col-span-6">
            <ProductImageGallery images={product.images} />
          </div>

          {/* Right Column: Details (Col 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:space-y-0 h-full">
            
            {/* Top Group */}
            <div className="space-y-6">
              <h1
                className="text-2xl sm:text-3xl font-semibold tracking-normal text-neutral-900 uppercase"
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  lineHeight: '110%',
                }}
              >
                {product.title.toUpperCase()}
              </h1>

              {/* Stars row: 5 gold stars */}
              <div className="flex text-amber-500 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              {/* Pricing Section */}
              <div className="flex items-center gap-4">
                {/* Current Price */}
                <span
                  style={{
                    fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: '22px',
                    color: '#1E1E1E',
                  }}
                >
                  ₹ {product.price.toLocaleString('en-IN')}
                </span>
                
                {/* MRP Crossed out */}
                {hasDiscount && (
                  <span
                    style={{
                      fontFamily: 'Questrial, sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      color: '#9E9E9E',
                      textDecoration: 'line-through',
                    }}
                  >
                    MRP : ₹ {product.mrp.toLocaleString('en-IN')}
                  </span>
                )}

                {/* Discount Percentage */}
                {hasDiscount && (
                  <span
                    style={{
                      fontFamily: 'Questrial, sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#D32F2F',
                    }}
                  >
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Controls row: [ - 1 + ] [ BUY IT NOW ] [ ADD TO CART ] */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Quantity selector */}
                <div className="flex items-center border border-neutral-300 h-12 w-28 justify-between">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer font-questrial"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium text-neutral-800 font-questrial">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer font-questrial"
                  >
                    +
                  </button>
                </div>

                {/* BUY IT NOW */}
                <button
                  onClick={handleBuyNow}
                  className="h-12 bg-neutral-900 hover:bg-neutral-850 text-white font-questrial text-[12px] uppercase tracking-widest px-8 transition-colors flex items-center justify-center cursor-pointer font-medium"
                >
                  Buy It Now
                </button>

                {/* ADD TO CART */}
                <button
                  onClick={handleAddToCart}
                  className="h-12 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-900 font-questrial text-[12px] uppercase tracking-widest px-8 transition-colors flex items-center justify-center cursor-pointer font-medium"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Text description details area */}
            <div className="space-y-4 pt-4 border-t border-neutral-100 font-questrial text-[13px] leading-[22px] text-neutral-600">
              
              {/* Description */}
              {product.description && (
                <div className="space-y-1">
                  <h4 className="font-semibold text-neutral-800 uppercase tracking-wider text-[11px]">Description</h4>
                  <p>{product.description}</p>
                </div>
              )}

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="space-y-1">
                  <h4 className="font-semibold text-neutral-800 uppercase tracking-wider text-[11px]">Highlights</h4>
                  <ul className="space-y-0.5 list-none pl-0">
                    {product.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical specs list */}
              {product.attributes && product.attributes.length > 0 && (
                <div className="text-neutral-700 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                  {product.attributes.map((attr, i) => (
                    <React.Fragment key={attr.name}>
                      {i > 0 && <span className="text-neutral-300 select-none">•</span>}
                      <span>
                        <span className="font-semibold text-neutral-800">{attr.name} :</span> {attr.value}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              )}

            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 sm:pt-12">
            {/* Section Header */}
            <div className="flex items-baseline justify-between mb-6 sm:mb-8 pb-2">
              <h2 className="font-raleway font-medium text-[36px] leading-[100%] tracking-normal text-[#453920]">
                You May Also Like
              </h2>
            </div>

            {/* Product Grid - matching New Arrivals */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} centered={true} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
