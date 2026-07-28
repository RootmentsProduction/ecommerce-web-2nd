'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/product/ProductCard';
import { getProducts } from '../../services/products.service';
import { Product } from '../../types/product';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [recommendations, setRecommendations] = React.useState<Product[]>([]);

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    } else {
      router.push('/checkout');
    }
  };

  React.useEffect(() => {
    getProducts().then((res) => {
      const cartProductIds = cartItems.map((item) => item.product.id);
      const filtered = res
        .filter((p) => p.id !== "SKU-005" && !cartProductIds.includes(p.id))
        .slice(0, 4);
      setRecommendations(filtered);
    });
  }, [cartItems]);

  // Summary figures
  const tax = 189; // Static matching the screenshot
  const total = cartSubtotal + tax;

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-8 sm:pb-16 text-left">
      <div className="w-full px-[6.5%] mx-auto max-w-none">
        
        {/* Page Header */}
        <div className="pb-6 mb-8 sm:mb-12">
          <h1
            className="text-[32px] sm:text-[36px] font-medium tracking-normal text-neutral-900"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            Your Shopping Bag
          </h1>
          <p className="text-[13px] text-neutral-500 font-questrial mt-1">
            Review your selections before completing your bespoke order.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-20 border border-dashed border-neutral-200 max-w-xl mx-auto px-4">
            <svg className="w-10 h-10 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-lg font-raleway font-medium tracking-wide text-neutral-700">
              Your bag is currently empty
            </h2>
            <p className="text-xs font-questrial text-neutral-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Explore our collections of hand-crafted fine jewellery and add items to your shopping bag.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-block bg-neutral-900 hover:bg-[#B78924] text-white transition-colors duration-300 px-8 py-3.5 text-xs uppercase tracking-widest font-medium"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Populated Cart State */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Cart items table (Col 8) */}
            <div className="lg:col-span-8">
              
              {/* Table Headers */}
              <div className="grid grid-cols-12 border-b border-neutral-200 pb-3 mb-6">
                <div className="col-span-6">
                  <span className="font-raleway text-[11px] font-semibold tracking-[0.13em] text-[#B78924] uppercase">
                    Earrings
                  </span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="font-raleway text-[11px] font-semibold tracking-[0.13em] text-[#B78924] uppercase">
                    Quantity
                  </span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="font-raleway text-[11px] font-semibold tracking-[0.13em] text-[#B78924] uppercase">
                    Total
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 items-center gap-4 py-4 border-b border-neutral-100">
                    
                    {/* Column 1: Image & Product Details */}
                    <div className="col-span-6 flex gap-4 sm:gap-6 items-start">
                      {/* Thumbnail */}
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="relative block w-20 sm:w-24 aspect-square bg-white border border-neutral-200 overflow-hidden flex-shrink-0"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>
                      
                      {/* Title & Specs */}
                      <div className="space-y-1 font-questrial text-left">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="block text-[15px] text-neutral-800 hover:text-[#B78924] transition-colors leading-tight"
                        >
                          {item.product.title}
                        </Link>
                        
                        <p className="text-[12px] text-neutral-450 leading-snug">
                          {item.product.category} / {item.product.attributes?.[0]?.value || 'Fine Jewelry'}
                        </p>
                        
                        {/* Remove link */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#B78924] hover:text-gold-700 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 pt-1.5 cursor-pointer"
                        >
                          <span className="text-[12px] font-normal leading-none">✕</span> Remove
                        </button>
                      </div>
                    </div>

                    {/* Column 2: Quantity counter box */}
                    <div className="col-span-3 flex justify-center">
                      <div className="flex items-center border border-neutral-300 h-10 w-24 justify-between">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer font-questrial"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium text-neutral-800 font-questrial">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer font-questrial"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Column 3: Total Price */}
                    <div className="col-span-3 text-right">
                      <span
                        className="text-base font-medium text-neutral-900"
                        style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
                      >
                        ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Continue Shopping links */}
              <div className="pt-6 flex justify-between items-center">
                <Link
                  href="/shop"
                  className="inline-block text-xs text-neutral-500 hover:text-gold-600 transition-colors font-questrial tracking-wide"
                >
                  ← Continue Shopping
                </Link>
              </div>

            </div>

            {/* Right Column: Summary Card (Col 4) */}
            <div className="lg:col-span-4 sticky top-28 self-start bg-white border border-neutral-200 p-8 space-y-6">
              
              <h3
                className="text-[20px] sm:text-[22px] font-medium text-neutral-900"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                Order Summary
              </h3>

              <div className="space-y-4 text-sm font-questrial text-neutral-600">
                
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-neutral-900">₹ {cartSubtotal.toLocaleString('en-IN')}.00</span>
                </div>

                {/* Estimated Shipping */}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-neutral-900">Free</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="text-neutral-900">₹ {tax.toLocaleString('en-IN')}.00</span>
                </div>

                <div className="border-t border-neutral-200 pt-4 flex justify-between items-baseline">
                  <span className="text-base font-semibold text-neutral-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Total
                  </span>
                  <span
                    className="text-2xl font-semibold text-neutral-900"
                    style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
                  >
                    ₹ {total.toLocaleString('en-IN')}
                  </span>
                </div>

              </div>

              {/* Checkout button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-neutral-900 hover:bg-neutral-850 text-white transition-colors duration-300 py-4 text-[12px] uppercase tracking-widest font-questrial font-medium flex items-center justify-center cursor-pointer"
              >
                Proceed to Checkout
              </button>

              {/* Sub-text */}
              <p className="text-[11px] text-neutral-400 font-questrial text-center leading-relaxed mt-2 select-none">
                Secure checkout powered by global banking standards
              </p>

            </div>

          </div>
        )}

        {/* You May Also Like Recommendations */}
        {recommendations.length > 0 && (
          <div className="pt-16 sm:pt-24">
            
            {/* Section Header */}
            <div className="flex items-baseline justify-between mb-8 sm:mb-12 pb-4">
              <h2 className="font-raleway font-medium text-[36px] leading-[100%] tracking-normal text-[#453920]">
                You May Also Like
              </h2>
            </div>

            {/* Product Grid - matching New Arrivals showcase grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {recommendations.map((p) => (
                <ProductCard key={p.id} product={p} centered={true} />
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
