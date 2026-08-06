import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSystemSettings } from '@/services/system-settings.service';

export default async function HeroSection() {
  const settings = await getSystemSettings();
  const heroImage = settings.hero_image || "/crafts/crafts_hero_cover_aesthetic.png";

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#1c1815]">

      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt="Handcrafted Studio Crafts Hero"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Soft aesthetic black overlay shade */}
        <div className="absolute inset-0 bg-black/25 bg-gradient-to-t from-black/50 via-black/25 to-black/10" />
      </div>

      {/* Header border line overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <div className="absolute left-0 right-0 top-20 h-px bg-white/20" />
      </div>

      {/* Centered Hero Content Container */}
      <div className="relative z-20 w-full max-w-4xl px-6 text-center text-white pt-24 pb-16 flex flex-col items-center justify-center">

        {/* Aesthetic Doodle Sub-tagline */}
        <span 
          className="text-2xl sm:text-4xl text-[#f3e8ff] mb-3 drop-shadow-md tracking-wider"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          ✨ Handcrafted with Love & Care ✨
        </span>

        {/* Big Headline in Aesthetic Fredoka font */}
        <h1 
          className="text-5xl sm:text-7xl lg:text-[95px] leading-[1.05] tracking-tight font-medium text-white mb-6 drop-shadow-lg"
          style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
        >
          Perfection <br /> at Crafts
        </h1>

        {/* Subtitle */}
        <p className="font-questrial text-base sm:text-xl lg:text-2xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-sm">
          Discover timeless handmade treasures. From charming plushies to aesthetic stationaries, our crafts speak love.
        </p>

        {/* White CTA Button with rounded aesthetic edges */}
        <Link
          href="/shop"
          className="inline-flex items-center justify-center bg-white text-neutral-900 hover:bg-[#f3e8ff] transition-all px-12 py-4 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase shadow-xl hover:shadow-2xl rounded-full transform hover:-translate-y-1"
          style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
        >
          SHOP NOW
        </Link>

      </div>

    </section>
  );
}
