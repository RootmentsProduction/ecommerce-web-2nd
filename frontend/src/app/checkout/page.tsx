'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { placeOrder } from '../../services/orders.service';
import { createPhonepePayment } from '../../services/phonepe.service';
import { estimateShipping, ShippingOption } from '../../services/shipping.service';
import Link from 'next/link';

interface AddressState {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  const [shipping, setShipping] = useState<AddressState>({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const [billing, setBilling] = useState<AddressState>({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
  });

  const [orderNotes, setOrderNotes] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{ id: string; orderNumber: string } | null>(null);

  // Shipping estimation states
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOptionCode, setSelectedOptionCode] = useState<string>('STANDARD');
  const [estimatingShipping, setEstimatingShipping] = useState(false);
  const [freeEligible, setFreeEligible] = useState(false);

  // Auto-estimate shipping when postal code is entered
  useEffect(() => {
    const cleanPincode = shipping.postalCode.trim();
    if (cleanPincode.length >= 6) {
      setEstimatingShipping(true);
      estimateShipping({
        pincode: cleanPincode,
        orderValue: cartSubtotal,
      })
        .then((res) => {
          if (res && res.options && res.options.length > 0) {
            setShippingOptions(res.options);
            setFreeEligible(res.freeShippingEligible);
            if (!res.options.some((o) => o.code === selectedOptionCode)) {
              setSelectedOptionCode(res.options[0].code);
            }
          }
        })
        .catch(() => {
          // Graceful fallback
        })
        .finally(() => setEstimatingShipping(false));
    }
  }, [shipping.postalCode, cartSubtotal]);

  // Financial splits
  const selectedOption = shippingOptions.find((o) => o.code === selectedOptionCode);
  const shippingCharge = selectedOption ? selectedOption.rate : 0;
  const taxTotal = Math.round(cartSubtotal * 0.03); // 3% GST on jewelry items in India
  const total = cartSubtotal + taxTotal + shippingCharge;


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'shipping' | 'billing'
  ) => {
    const { name, value } = e.target;
    if (type === 'shipping') {
      setShipping((prev) => ({ ...prev, [name]: value }));
      if (billingSameAsShipping) {
        setBilling((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setBilling((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacingOrder(true);

    const payloadItems = cartItems.map((item) => ({
      productId: item.product.id,
      variantId: (item.product.variants && item.product.variants.length > 0) ? (item.product.variants[0] as { id: string }).id : undefined,
      name: item.product.title || item.product.name || 'Handcrafted Jewelry',
      sku: item.product.sku || `SKU-${item.product.id.substring(0, 8)}`,
      quantity: item.quantity,
      price: item.product.price,
    }));

    try {
      const orderRes = await placeOrder({
        subtotal: cartSubtotal,
        taxTotal,
        shippingCharge,
        total,
        shippingAddress: shipping,
        billingAddress: billingSameAsShipping ? shipping : billing,
        notes: orderNotes || undefined,
        items: payloadItems,
      });

      setRedirecting(true);
      const redirectRes = await createPhonepePayment(orderRes.id);
      window.location.href = redirectRes.redirectUrl;
    } catch (err: unknown) {
      alert((err as Error).message || 'Failed to place your order. Please check item stock levels and try again.');
      setPlacingOrder(false);
      setRedirecting(false);
    }
  };

  if (confirmedOrder) {
    return (
      <div className="min-h-screen pt-32 px-[6.5%] max-w-2xl mx-auto text-left space-y-8 font-sans">
        <div className="bg-amber-50/50 border border-amber-100 p-8 rounded-3xl space-y-4">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            ⌛
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight font-raleway">Order Requested</h1>
            <p className="text-xs text-neutral-500 mt-1 font-questrial leading-relaxed">
              Your order has been recorded successfully. Please note that the order status is currently <span className="font-bold text-amber-700">PENDING_PAYMENT</span>. Stock remains unchanged while payment and allocation rules are pending.
            </p>
          </div>
          
          <div className="border-t border-neutral-100 pt-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block font-sans">Order Ref</span>
              <span className="font-bold text-neutral-800 mt-0.5 block">#{confirmedOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block font-sans">Payment Status</span>
              <span className="font-semibold text-amber-700 mt-0.5 block">PENDING</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            href="/orders"
            className="flex-1 text-center bg-neutral-950 hover:bg-neutral-850 text-white font-semibold text-xs tracking-wider uppercase py-4 rounded-xl transition-colors font-questrial cursor-pointer"
          >
            Track in My Orders
          </Link>
          <Link
            href="/shop"
            className="flex-1 text-center border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs tracking-wider uppercase py-4 rounded-xl transition-colors font-questrial"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#fcfcfc] text-left">
      <div className="w-full px-[6.5%] mx-auto max-w-7xl">
        <h1 className="text-[32px] font-medium tracking-normal text-neutral-900 font-raleway mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Address Fields Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shipping details */}
            <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider font-sans border-b border-neutral-50 pb-2">
                Shipping Address
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">First Name *</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={shipping.firstName}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Last Name *</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={shipping.lastName}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Address Line 1 *</label>
                <input
                  type="text"
                  required
                  name="addressLine1"
                  placeholder="Street address, P.O. box, company name"
                  value={shipping.addressLine1}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Apartment, suite, unit, building, floor etc."
                  value={shipping.addressLine2}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">City *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={shipping.city}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">State / Province *</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={shipping.state}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Postal Code *</label>
                  <input
                    type="text"
                    required
                    name="postalCode"
                    value={shipping.postalCode}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Country *</label>
                  <input
                    type="text"
                    required
                    name="country"
                    disabled
                    value={shipping.country}
                    className="w-full border border-neutral-200 bg-neutral-50 text-neutral-450 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Phone Number *</label>
                  <input
                    type="text"
                    required
                    name="phone"
                    value={shipping.phone}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Billing Checkbox */}
            <div className="flex items-center space-x-2.5 px-4 font-sans text-xs">
              <input
                type="checkbox"
                id="billingSame"
                checked={billingSameAsShipping}
                onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
              />
              <label htmlFor="billingSame" className="font-semibold text-neutral-655 cursor-pointer">
                Billing address is the same as shipping address
              </label>
            </div>

            {/* Optional Billing details */}
            {!billingSameAsShipping && (
              <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 md:p-8 space-y-6">
                <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider font-sans border-b border-neutral-50 pb-2">
                  Billing Address
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">First Name *</label>
                    <input
                      type="text"
                      required={!billingSameAsShipping}
                      name="firstName"
                      value={billing.firstName}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Last Name *</label>
                    <input
                      type="text"
                      required={!billingSameAsShipping}
                      name="lastName"
                      value={billing.lastName}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Address Line 1 *</label>
                  <input
                    type="text"
                    required={!billingSameAsShipping}
                    name="addressLine1"
                    value={billing.addressLine1}
                    onChange={(e) => handleInputChange(e, 'billing')}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={billing.addressLine2}
                    onChange={(e) => handleInputChange(e, 'billing')}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">City *</label>
                    <input
                      type="text"
                      required={!billingSameAsShipping}
                      name="city"
                      value={billing.city}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">State *</label>
                    <input
                      type="text"
                      required={!billingSameAsShipping}
                      name="state"
                      value={billing.state}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Postal Code *</label>
                    <input
                      type="text"
                      required={!billingSameAsShipping}
                      name="postalCode"
                      value={billing.postalCode}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Country *</label>
                    <input
                      type="text"
                      required={!billingSameAsShipping}
                      name="country"
                      disabled
                      value={billing.country}
                      className="w-full border border-neutral-200 bg-neutral-50 text-neutral-450 rounded-xl px-3 py-2 text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Phone Number *</label>
                    <input
                      type="text"
                      required={!billingSameAsShipping}
                      name="phone"
                      value={billing.phone}
                      onChange={(e) => handleInputChange(e, 'billing')}
                      className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#3762f9] transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 md:p-8 space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-sans">Special Instructions / Delivery Notes</label>
              <textarea
                placeholder="Optional notes for delivery carriers..."
                rows={3}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full border border-neutral-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#3762f9] transition-all text-neutral-850 font-medium"
              />
            </div>

          </div>

          {/* Cart Breakdown summary column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider font-sans border-b border-neutral-50 pb-2">
                Order Summary
              </h2>

              <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex items-center space-x-3 text-xs">
                    <div className="w-12 h-12 bg-neutral-50 rounded-xl border border-neutral-100 flex-shrink-0 flex items-center justify-center relative overflow-hidden font-sans">
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-[10px] text-neutral-400">No Img</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-0.5 font-sans">
                      <p className="font-bold text-neutral-900 truncate">{item.product.title}</p>
                      <p className="text-[10px] text-neutral-450 font-medium">Qty: {item.quantity} &bull; SKU: {item.product.sku || 'N/A'}</p>
                    </div>
                    <span className="font-bold text-neutral-900 font-sans">
                      ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Shipping Method Selector */}
              {shippingOptions.length > 0 && (
                <div className="border-t border-neutral-100 pt-4 space-y-2 font-sans text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Shipping Speed & Carrier
                  </span>
                  {estimatingShipping && (
                    <span className="text-[10px] text-neutral-400 animate-pulse block">Estimating live rates...</span>
                  )}
                  <div className="space-y-2">
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.code}
                        onClick={() => setSelectedOptionCode(opt.code)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          selectedOptionCode === opt.code
                            ? 'border-[#3762f9] bg-blue-50/40 text-neutral-900 font-bold'
                            : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-medium'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <input
                            type="radio"
                            name="shippingOption"
                            checked={selectedOptionCode === opt.code}
                            onChange={() => setSelectedOptionCode(opt.code)}
                            className="w-3.5 h-3.5 text-[#3762f9]"
                          />
                          <div>
                            <p className="text-xs">{opt.name}</p>
                            <p className="text-[10px] text-neutral-400 font-normal">Est: {opt.estimatedDays}</p>
                          </div>
                        </div>
                        <span className="text-xs">
                          {opt.rate === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹ ${opt.rate}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-neutral-100 pt-4 space-y-3 font-sans text-xs font-semibold text-neutral-500">
                <div className="flex justify-between">
                  <span className="uppercase tracking-wider">Subtotal</span>
                  <span className="text-neutral-800">₹ {cartSubtotal.toLocaleString('en-IN')}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase tracking-wider">Shipping</span>
                  <span className={shippingCharge === 0 ? "text-emerald-600" : "text-neutral-800"}>
                    {shippingCharge === 0 ? "FREE" : `₹ ${shippingCharge.toLocaleString('en-IN')}.00`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase tracking-wider">Estimated GST (3%)</span>
                  <span className="text-neutral-800">₹ {taxTotal.toLocaleString('en-IN')}.00</span>
                </div>
                
                <div className="border-t border-neutral-200 pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Total</span>
                  <span className="text-base font-black text-[#3762f9]">
                    ₹ {total.toLocaleString('en-IN')}.00
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={placingOrder || redirecting}
                className="w-full bg-[#3762f9] hover:bg-[#2748c9] disabled:bg-neutral-250 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-colors font-questrial cursor-pointer flex items-center justify-center space-x-2"
              >
                {placingOrder || redirecting ? (
                  <span>Processing Payment...</span>
                ) : (
                  <span>Proceed to Pay (PhonePe)</span>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
