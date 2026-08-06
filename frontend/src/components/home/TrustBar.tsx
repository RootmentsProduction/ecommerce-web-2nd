import React from 'react';
import { Truck, HeartHandshake, Gift, ShieldCheck } from 'lucide-react';

export default function TrustBar() {
  const features = [
    {
      icon: <Truck className="w-6 h-6 text-[#8b5cf6]" />,
      title: "Free Pan-India Delivery",
      subtitle: "On all orders above ₹999",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#8b5cf6]" />,
      title: "100% Handcrafted",
      subtitle: "Made with love & care",
    },
    {
      icon: <Gift className="w-6 h-6 text-[#8b5cf6]" />,
      title: "Gift Ready Packaging",
      subtitle: "Custom boxes & notes available",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#8b5cf6]" />,
      title: "Safe & Secure Checkout",
      subtitle: "UPI, Cards & NetBanking",
    },
  ];

  return (
    <section className="w-full bg-[#fbf9f5] border-y border-neutral-200/80 py-8 sm:py-10">
      <div className="w-full px-[6.5%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/70 border border-neutral-200/60 shadow-xs hover:shadow-md hover:bg-white transition-all"
            >
              <div className="p-3 rounded-full bg-[#f3e8ff] flex-shrink-0">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-fredoka text-sm sm:text-base font-medium text-neutral-900">
                  {feat.title}
                </h3>
                <p className="font-questrial text-xs text-neutral-500 mt-0.5">
                  {feat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
