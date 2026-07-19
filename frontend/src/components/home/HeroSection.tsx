import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSystemSettings } from '@/services/system-settings.service';

export default async function HeroSection() {
  const settings = await getSystemSettings();
  const heroImage = settings.hero_image || "/hero-bg-v2.jpg";

  return (
    <section className="sticky top-0 w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-neutral-900 z-10">

      {/* Background Image (Aligned down slightly to match reference screenshot) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt="Luxury Jewellery Model Hero"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[56%_22%] brightness-100"
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Luxury Thin Grid Lines Overlay (Aligned with Header borders) */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        {/* Left vertical lines */}
        <div className="absolute left-[6.5%] top-0 w-px h-full bg-white/8" />

        {/* Right vertical lines */}
        <div className="absolute right-[6.5%] top-0 w-px h-full bg-white/8" />

        {/* Horizontal lines */}
        <div className="absolute left-0 right-0 top-20 h-px bg-white/8" />
      </div>

      {/* Hero Content Container (Shifted content higher up on mobile using justify-between) */}
      <div className="relative w-full px-[6.5%] z-20 h-full flex flex-col justify-between md:justify-end pb-16 md:pb-28 pt-24 md:pt-32">

        {/* Top Content Area (Tagline + Heading + Left Description) */}
        <div className="space-y-4 text-left text-white max-w-4xl pt-6 md:pt-0">
          {/* Questrial Tagline */}
          <div className="flex items-center gap-3 font-questrial text-[18px] sm:text-[22px] leading-[26px] tracking-normal font-normal text-[#F5F5F5]">
            <span>Elegance</span>
            <span className="text-gold-300">✳</span>
            <span>Heritage</span>
            <span className="text-gold-300">✳</span>
            <span>Radiance</span>
          </div>

          {/* Raleway Heading */}
          <h1 className="font-raleway font-medium text-[60px] sm:text-[85px] lg:text-[120px] leading-[55px] sm:leading-[85px] lg:leading-[110px] tracking-normal text-white">
            Perfection <br /> at Jewel
          </h1>

          {/* Left Description Column (Moved here to sit directly under title and reduce gap) */}
          <p className="font-questrial text-[16px] sm:text-[18px] leading-[24px] sm:leading-[26px] text-white/90 max-w-md pt-2">
            Discover timeless elegance. From delicate rings to stunning necklaces, our jewellery speaks love.
          </p>
        </div>

        {/* Bottom Content Area (Empty Left Column + Right CTA Column) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end w-full text-white mt-4 md:mt-8">

          {/* Left Spacer */}
          <div className="hidden md:block md:col-span-7 lg:col-span-8" />

          {/* Right CTA Column */}
          <div className="md:col-span-5 lg:col-span-4 text-left md:text-right w-full">
            <div className="w-full md:w-[380px] md:ml-auto space-y-4 text-left">
              {/* Duplicate text above button */}
              <p className="font-questrial text-[16px] md:text-[14px] leading-[24px] md:leading-relaxed text-white/80">
                Discover timeless elegance. From delicate rings to stunning necklaces, our jewellery speaks love.
              </p>
              {/* CTA Button (White on desktop, Gold on mobile matching screenshots) */}
              <div className="w-full">
                <Link
                  href="/shop"
                  className="flex items-center justify-center w-full max-w-[352px] md:max-w-none h-[72px] md:h-auto md:py-4 px-8 bg-[#e0b85a] md:bg-white hover:bg-neutral-100 text-neutral-950 md:text-neutral-900 transition-colors text-center text-[13.9px] font-questrial font-medium tracking-[0.2em] uppercase shadow-md hover:shadow-lg"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
