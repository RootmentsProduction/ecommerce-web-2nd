import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSystemSettings } from '@/services/system-settings.service';

export default async function HeroSection() {
  const settings = await getSystemSettings();
  const heroImage = settings.hero_image || "/crafts/hero_stacking_toy.png";

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#7e858a]">

      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt="Crafts & Toys Hero"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-left md:object-[25%_center]"
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/15" />
      </div>

      {/* Header border line overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <div className="absolute left-0 right-0 top-20 h-px bg-white/20" />
      </div>

      {/* Centered Hero Content Container */}
      <div className="relative z-20 w-full max-w-4xl px-6 text-center text-white pt-24 pb-16 flex flex-col items-center justify-center">

        {/* Big Headline */}
        <h1 className="font-raleway text-5xl sm:text-7xl lg:text-[100px] leading-[1.05] tracking-tight font-light text-white mb-6 drop-shadow-sm">
          Perfection <br /> at Jewel
        </h1>

        {/* Subtitle */}
        <p className="font-questrial text-sm sm:text-lg lg:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Discover timeless elegance. From delicate rings to stunning necklaces, our jewellery speaks love.
        </p>

        {/* White CTA Button */}
        <Link
          href="/shop"
          className="inline-flex items-center justify-center bg-white text-neutral-900 hover:bg-neutral-100 transition-all px-12 py-4 font-questrial text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          SHOP NOW
        </Link>

      </div>

    </section>
  );
}
