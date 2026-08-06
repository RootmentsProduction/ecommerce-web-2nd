'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getMyOrders } from '../../services/orders.service';
import { retryPhonepePayment } from '../../services/phonepe.service';
import { trackShipment, ShipmentDetails } from '../../services/shipping.service';
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
  shipment?: ShipmentDetails;
}

export default function MyOrdersPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [activeShipment, setActiveShipment] = useState<ShipmentDetails | null>(null);
  const [loadingTracking, setLoadingTracking] = useState(false);

  const handleRetryPayment = async (orderId: string) => {
    try {
      const redirectRes = await retryPhonepePayment(orderId);
      window.location.href = redirectRes.redirectUrl;
    } catch (err: any) {
      alert(err.message || 'Failed to initiate payment retry.');
    }
  };

  const handleOpenTracking = async (order: Order) => {
    setTrackingModalOrder(order);
    setLoadingTracking(true);
    try {
      const shipment = await trackShipment(order.id);
      setActiveShipment(shipment || order.shipment || null);
    } catch {
      setActiveShipment(order.shipment || null);
    } finally {
      setLoadingTracking(false);
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
    return null;
  }

  const getTimelineStages = (order: Order, shipment?: ShipmentDetails | null) => {
    const s = (shipment?.shipmentStatus || order.status || '').toUpperCase();
    const paid = order.paymentStatus === 'PAID';

    const stages = [
      { id: 'placed', label: 'Order Placed', done: true },
      { id: 'paid', label: 'Paid', done: paid },
      { id: 'packed', label: 'Packed', done: ['PACKED', 'SHIPPED', 'DELIVERED'].includes(order.status) || ['PICKUP_SCHEDULED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(s) },
      { id: 'pickup', label: 'Pickup Scheduled', done: ['PICKUP_SCHEDULED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(s) },
      { id: 'shipped', label: 'Shipped', done: ['SHIPPED', 'DELIVERED'].includes(order.status) || ['IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(s) },
      { id: 'transit', label: 'In Transit', done: ['IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(s) },
      { id: 'ofd', label: 'Out For Delivery', done: ['OUT_FOR_DELIVERY', 'DELIVERED'].includes(s) },
      { id: 'delivered', label: 'Delivered', done: order.status === 'DELIVERED' || s === 'DELIVERED' },
    ];
    return stages;
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#fcfcfc] text-left font-sans">
      <div className="w-full px-[6.5%] mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-[32px] font-medium tracking-normal text-neutral-900 font-raleway">
            My Orders
          </h1>
          <p className="text-xs text-neutral-450 mt-1 font-questrial font-medium">
            Manage your purchases, check live shipment tracking, and download invoices
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

              const timeline = getTimelineStages(order, order.shipment);

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

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenTracking(order)}
                        className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        🚚 Track Package
                      </button>
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

                  {/* Payment & Courier Bar */}
                  <div className="px-6 py-4 bg-neutral-50/50 border-t border-neutral-100 flex flex-wrap justify-between items-center gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-neutral-500 font-semibold">
                        <span>Payment Status: <span className={`font-bold uppercase ${
                          order.paymentStatus === 'PAID' ? 'text-emerald-600' : order.paymentStatus === 'FAILED' ? 'text-red-600' : 'text-amber-600'
                        }`}>{order.paymentStatus}</span></span>

                        {order.shipment?.courier && (
                          <span>Courier: <span className="font-bold text-neutral-800">{order.shipment.courier}</span></span>
                        )}

                        {order.shipment?.awb && (
                          <span>AWB: <span className="font-mono font-bold text-neutral-800">{order.shipment.awb}</span></span>
                        )}
                      </div>
                    </div>

                    {(order.paymentStatus === 'FAILED' || (order.paymentStatus === 'PENDING' && order.status === 'PENDING_PAYMENT')) && (
                      <button
                        onClick={() => handleRetryPayment(order.id)}
                        className="bg-[#3762f9] hover:bg-[#2748c9] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors font-questrial cursor-pointer"
                      >
                        Retry Payment
                      </button>
                    )}
                  </div>

                  {/* Visual 8-Stage Shipping Timeline */}
                  <div className="bg-neutral-50/20 px-6 py-4 border-t border-neutral-100 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                      Shipping Timeline
                    </span>
                    <div className="flex items-center justify-between min-w-[600px] text-[10px] font-bold font-sans">
                      {timeline.map((st, i) => (
                        <div key={st.id} className="flex items-center space-x-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${
                            st.done ? 'bg-[#3762f9] text-white' : 'bg-neutral-200 text-neutral-500'
                          }`}>
                            {st.done ? '✓' : i + 1}
                          </div>
                          <span className={st.done ? 'text-[#3762f9]' : 'text-neutral-400'}>
                            {st.label}
                          </span>
                          {i < timeline.length - 1 && (
                            <span className="text-neutral-300 font-normal mx-1">&rarr;</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Live Tracking Modal */}
        {trackingModalOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
              <button
                onClick={() => {
                  setTrackingModalOrder(null);
                  setActiveShipment(null);
                }}
                className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 font-raleway">
                  Live Tracking Details
                </h3>
                <p className="text-xs text-neutral-500 mt-1 font-questrial">
                  Order #{trackingModalOrder.orderNumber}
                </p>
              </div>

              {loadingTracking ? (
                <div className="py-8 text-center text-xs font-semibold text-neutral-500">
                  Fetching live status from Shiprocket...
                </div>
              ) : activeShipment ? (
                <div className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Courier</span>
                      <span className="font-bold text-neutral-800">{activeShipment.courier || 'Assigned Courier'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">AWB Code</span>
                      <span className="font-mono font-bold text-neutral-800">{activeShipment.awb || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Status</span>
                      <span className="font-bold text-[#3762f9]">{activeShipment.shipmentStatus || 'NEW'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Est. Delivery</span>
                      <span className="font-semibold text-neutral-700">
                        {activeShipment.estimatedDelivery
                          ? new Date(activeShipment.estimatedDelivery).toLocaleDateString('en-IN')
                          : 'Pending scan'}
                      </span>
                    </div>
                  </div>

                  {/* Scans list */}
                  {activeShipment.events && activeShipment.events.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        Tracking Activity History
                      </span>
                      <div className="max-h-48 overflow-y-auto divide-y divide-neutral-100 pr-1">
                        {activeShipment.events.map((ev) => (
                          <div key={ev.id} className="py-2 space-y-0.5">
                            <div className="flex justify-between font-bold text-neutral-800">
                              <span>{ev.activity}</span>
                              <span className="text-[10px] text-neutral-400 font-normal">
                                {new Date(ev.eventTimestamp).toLocaleString('en-IN')}
                              </span>
                            </div>
                            {ev.location && (
                              <p className="text-[10px] text-neutral-500">{ev.location}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeShipment.trackingUrl && (
                    <div className="pt-3 border-t border-neutral-100">
                      <a
                        href={activeShipment.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center bg-[#3762f9] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#2748c9] transition-colors"
                      >
                        Open Carrier Tracking Portal ↗
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-neutral-500 font-questrial">
                  Shipment is currently being packed and assigned to courier partners. Please check back shortly for live scans.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

