'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getMyOrders } from '../../services/orders.service';
import { retryPhonepePayment } from '../../services/phonepe.service';
import Link from 'next/link';

interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  variantName?: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  createdAt: string;
  subtotal: number;
  taxTotal: number;
  shippingCharge: number;
  total: number;
  status: string;
  paymentStatus: string;
  items: OrderItem[];
  paymentMethod?: string;
  paymentProvider?: string;
  phonepeTransactionId?: string;
  merchantTransactionId?: string;
  paymentCompletedAt?: string;
}

export default function MyOrdersPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRetryPayment = async (orderId: string) => {
    try {
      const redirectRes = await retryPhonepePayment(orderId);
      window.location.href = redirectRes.redirectUrl;
    } catch (err: any) {
      alert(err.message || 'Failed to initiate payment retry.');
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/orders');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getMyOrders().then((res) => {
        // cast to Order[]
        setOrders((res as unknown as Order[]) || []);
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  if (authLoading || (isAuthenticated && loading)) {
    return (
      <div className="min-h-screen pt-32 text-center text-xs font-semibold text-neutral-500 font-questrial">
        Loading your order history...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect handles it
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#fcfcfc] text-left">
      <div className="w-full px-[6.5%] mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-[32px] font-medium tracking-normal text-neutral-900 font-raleway">
            My Orders
          </h1>
          <p className="text-xs text-neutral-450 mt-1 font-questrial font-medium">
            Manage your purchases, check shipment tracking, and download invoices
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-neutral-100 rounded-3xl p-12 text-center space-y-4">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400 mx-auto text-lg">
              ✉
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-neutral-800 font-sans">No orders found</h3>
              <p className="text-xs text-neutral-500 font-questrial leading-relaxed max-w-sm mx-auto">
                You haven&apos;t placed any orders yet. Visit our shop and pick from our handcrafted jewelry catalog.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-block bg-neutral-950 text-white text-[11px] uppercase tracking-widest px-6 py-3 font-questrial hover:bg-neutral-850 transition-colors"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const dateStr = new Date(order.createdAt || order.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <div key={order.id} className="bg-white border border-[#e1e5f5] rounded-3xl overflow-hidden shadow-xs hover:shadow-sm transition-all duration-300">
                  {/* Order Card Header */}
                  <div className="bg-neutral-50/50 px-6 py-4 border-b border-neutral-100 flex flex-wrap justify-between items-center gap-4 text-xs font-sans">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                      <div>
                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Order Placed</span>
                        <span className="font-semibold text-neutral-700 mt-0.5 block">{dateStr}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Total Amount</span>
                        <span className="font-bold text-neutral-850 mt-0.5 block">₹ {order.total.toLocaleString('en-IN')}.00</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Order Ref</span>
                        <span className="font-bold text-neutral-600 font-mono mt-0.5 block">#{order.orderNumber}</span>
                      </div>
                    </div>

                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      order.status === 'DELIVERED'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : order.status === 'SHIPPED'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : order.status === 'CANCELLED'
                        ? 'bg-red-50 text-red-600 border border-red-100'
                        : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Order Card Items List */}
                  <div className="p-6 divide-y divide-neutral-55 space-y-4 font-sans">
                    {order.items.map((item, idx) => (
                      <div key={item.id || idx} className={`flex items-center space-x-4 pt-3 ${idx === 0 ? 'pt-0' : ''}`}>
                        <div className="w-14 h-14 bg-neutral-50 rounded-2xl border border-neutral-100 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                          <svg className="w-5 h-5 text-neutral-350" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <circle cx="12" cy="14" r="5" />
                            <path d="M12 9V3m-3 2h6" />
                          </svg>
                        </div>
                        <div className="flex-1 space-y-0.5 text-xs">
                          <p className="font-bold text-neutral-900">{item.name}</p>
                          <p className="text-[10px] text-neutral-450 font-medium">Quantity: {item.quantity} &bull; SKU: {item.sku}</p>
                        </div>
                        <span className="font-bold text-neutral-900 text-xs">
                          ₹ {(item.price * item.quantity).toLocaleString('en-IN')}.00
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Details Section */}
                  <div className="px-6 py-4 bg-neutral-50/50 border-t border-neutral-100 flex flex-wrap justify-between items-center gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-neutral-500 font-semibold">
                        <span>Payment Status: <span className={`font-bold uppercase ${
                          order.paymentStatus === 'PAID' ? 'text-emerald-600' : order.paymentStatus === 'FAILED' ? 'text-red-600' : 'text-amber-600'
                        }`}>{order.paymentStatus}</span></span>
                        
                        {order.paymentMethod && (
                          <span>Method: <span className="font-bold text-neutral-700 uppercase">{order.paymentMethod}</span></span>
                        )}

                        {order.phonepeTransactionId && (
                          <span>Txn ID: <span className="font-mono font-bold text-neutral-700">{order.phonepeTransactionId}</span></span>
                        )}
                        
                        {order.paymentCompletedAt && (
                          <span>Paid On: <span className="font-bold text-neutral-700">{new Date(order.paymentCompletedAt).toLocaleString('en-IN')}</span></span>
                        )}
                      </div>
                    </div>

                    {/* Retry Payment Button if Failed or Pending */}
                    {(order.paymentStatus === 'FAILED' || (order.paymentStatus === 'PENDING' && order.status === 'PENDING_PAYMENT')) && (
                      <button
                        onClick={() => handleRetryPayment(order.id)}
                        className="bg-[#3762f9] hover:bg-[#2748c9] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors font-questrial cursor-pointer"
                      >
                        Retry Payment
                      </button>
                    )}
                  </div>

                  {/* Visual Status Timeline Progress */}
                  <div className="bg-neutral-50/20 px-6 py-4 border-t border-neutral-100 text-xs flex justify-between items-center font-sans">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Order Status Tracking</span>
                    <div className="flex items-center space-x-4 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      <span className="text-[#3762f9]">Placed</span>
                      <span>&rarr;</span>
                      <span className={order.status !== 'PENDING_PAYMENT' ? 'text-[#3762f9]' : ''}>Confirmed</span>
                      <span>&rarr;</span>
                      <span className={order.status === 'SHIPPED' || order.status === 'DELIVERED' ? 'text-[#3762f9]' : ''}>Shipped</span>
                      <span>&rarr;</span>
                      <span className={order.status === 'DELIVERED' ? 'text-[#3762f9]' : ''}>Delivered</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
