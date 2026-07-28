'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { verifyPhonepePayment, retryPhonepePayment } from '../../../services/phonepe.service';
import Link from 'next/link';

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'SUCCESS' | 'FAILED' | 'PENDING' | 'ERROR'>('PENDING');
  const [order, setOrder] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [retrying, setRetrying] = useState(false);

  const merchantTransactionId = searchParams.get('merchantTransactionId');

  useEffect(() => {
    if (!merchantTransactionId) {
      setLoading(false);
      setStatus('ERROR');
      setErrorMsg('No merchant transaction ID found in redirect URL.');
      return;
    }

    let isMounted = true;

    async function verify() {
      try {
        const response = await verifyPhonepePayment(merchantTransactionId!);
        if (!isMounted) return;

        setStatus(response.status);
        setOrder(response.order);
        setLoading(false);

        if (response.status === 'SUCCESS') {
          clearCart();
        }
      } catch (err: any) {
        if (!isMounted) return;
        setStatus('ERROR');
        setErrorMsg(err.message || 'An error occurred while verifying the payment status.');
        setLoading(false);
      }
    }

    verify();

    return () => {
      isMounted = false;
    };
  }, [merchantTransactionId]);

  const handleRetry = async () => {
    if (!order) return;
    setRetrying(true);
    try {
      const redirectRes = await retryPhonepePayment(order.id);
      window.location.href = redirectRes.redirectUrl;
    } catch (err: any) {
      alert(err.message || 'Failed to retry payment. Please try again.');
      setRetrying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-[6.5%] max-w-md mx-auto text-center space-y-6 font-sans">
        <div className="bg-white border border-[#e1e5f5] rounded-3xl p-8 shadow-sm space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-[#3762f9] border-t-transparent rounded-full mx-auto"></div>
          <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider">Verifying payment with PhonePe...</h2>
          <p className="text-xs text-neutral-500 font-questrial leading-relaxed">
            Please wait while we verify your transaction status with PhonePe Secure Servers. Do not refresh or exit this page.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'SUCCESS') {
    return (
      <div className="min-h-screen pt-32 px-[6.5%] max-w-2xl mx-auto text-left space-y-8 font-sans">
        <div className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-3xl space-y-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white text-base">
            ✓
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight font-raleway">Payment Successful!</h1>
            <p className="text-xs text-neutral-500 mt-1 font-questrial leading-relaxed">
              Thank you for your purchase. Your payment was successfully captured, and your order has been confirmed.
            </p>
          </div>

          <div className="border-t border-neutral-100 pt-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Order Number</span>
              <span className="font-bold text-neutral-800 mt-0.5 block">#{order?.orderNumber}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">PhonePe Transaction ID</span>
              <span className="font-mono text-neutral-700 mt-0.5 block truncate max-w-[200px]">{order?.phonepeTransactionId || '—'}</span>
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

  if (status === 'FAILED') {
    return (
      <div className="min-h-screen pt-32 px-[6.5%] max-w-2xl mx-auto text-left space-y-8 font-sans">
        <div className="bg-red-50/50 border border-red-100 p-8 rounded-3xl space-y-4">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-base">
            ✗
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight font-raleway">Payment Failed</h1>
            <p className="text-xs text-neutral-500 mt-1 font-questrial leading-relaxed">
              We couldn&apos;t complete your transaction. Your payment was declined, cancelled, or timed out.
            </p>
          </div>

          <div className="border-t border-neutral-100 pt-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Order Number</span>
              <span className="font-bold text-neutral-850 mt-0.5 block">#{order?.orderNumber}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Payment Status</span>
              <span className="font-bold text-red-600 mt-0.5 block">FAILED</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="flex-1 text-center bg-[#3762f9] hover:bg-[#2748c9] disabled:bg-neutral-250 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-colors font-questrial cursor-pointer"
          >
            {retrying ? 'Initiating Retry...' : 'Retry Payment'}
          </button>
          <Link
            href="/orders"
            className="flex-1 text-center border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs tracking-wider uppercase py-4 rounded-xl transition-colors font-questrial"
          >
            View Order Status
          </Link>
        </div>
      </div>
    );
  }

  // Pending / Unknown Status
  return (
    <div className="min-h-screen pt-32 px-[6.5%] max-w-2xl mx-auto text-left space-y-8 font-sans">
      <div className="bg-amber-50/50 border border-amber-100 p-8 rounded-3xl space-y-4">
        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white text-base">
          ⌛
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight font-raleway">Payment Status: Pending</h1>
          <p className="text-xs text-neutral-500 mt-1 font-questrial leading-relaxed">
            {errorMsg || 'Your payment status is still being processed. We will update the status once confirmation is received.'}
          </p>
        </div>

        {order && (
          <div className="border-t border-neutral-100 pt-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Order Number</span>
              <span className="font-bold text-neutral-800 mt-0.5 block">#{order.orderNumber}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Payment Status</span>
              <span className="font-bold text-amber-700 mt-0.5 block">{order.paymentStatus}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        {order && (
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="flex-1 text-center bg-[#3762f9] hover:bg-[#2748c9] disabled:bg-neutral-250 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-colors font-questrial cursor-pointer"
          >
            {retrying ? 'Initiating Retry...' : 'Retry Payment'}
          </button>
        )}
        <Link
          href="/orders"
          className="flex-1 text-center border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs tracking-wider uppercase py-4 rounded-xl transition-colors font-questrial"
        >
          My Orders History
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 text-center text-xs font-semibold text-neutral-500 font-questrial">
        Loading payment verification page...
      </div>
    }>
      <PaymentStatusContent />
    </Suspense>
  );
}
