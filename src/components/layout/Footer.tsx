'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const shopLinks = [
    { name: 'New Arrivals', href: '/shop?sort=newest' },
    { name: 'Best Sellers', href: '/shop?filter=bestseller' },
    { name: 'Collections', href: '/shop' },
    { name: 'Gifts', href: '/shop' },
  ];

  const helpLinks = [
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Contact Us', href: '#footer' },
  ];

  const followLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'Pinterest', href: 'https://pinterest.com' },
  ];

  return (
    <footer id="footer" className="w-full bg-white border-t border-neutral-200 relative">
      


      {/* 2. White Main Footer Container */}
      <div className="w-full px-[6.5%] mx-auto max-w-none pt-16 pb-8">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          {/* Left Column (Brand + Newsletter Form) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-2 select-none">
              <span className="text-[#B78924] text-[32px] font-normal leading-none select-none">✳</span>
              <span className="font-raleway text-[22px] tracking-normal font-medium text-neutral-900 leading-none">
                Jewelry by Zorucci
              </span>
            </div>
            
            <div className="space-y-4 max-w-md">
              <p className="text-neutral-500 font-questrial text-sm leading-relaxed">
                Get updates about new collections, offers, and special events.
              </p>
              
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-0 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-white border border-neutral-300 focus:outline-none w-full py-2.5 px-4 text-sm text-neutral-800 placeholder-neutral-400 rounded-none font-questrial"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-850 text-white uppercase tracking-wider font-questrial font-medium text-sm py-2.5 px-6 transition-colors duration-300 rounded-none flex-shrink-0 border border-black"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Right Columns (Links Grid) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            
            {/* Column 1: Shop */}
            <div className="space-y-4">
              <h4 className="text-sm font-questrial uppercase text-[#B78924] font-medium tracking-wider">
                Shop
              </h4>
              <ul className="space-y-3">
                {shopLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="font-questrial text-sm text-neutral-600 hover:text-gold-550 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Help */}
            <div className="space-y-4">
              <h4 className="text-sm font-questrial uppercase text-[#B78924] font-medium tracking-wider">
                Help
              </h4>
              <ul className="space-y-3">
                {helpLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="font-questrial text-sm text-neutral-600 hover:text-gold-550 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Follow Us */}
            <div className="space-y-4">
              <h4 className="text-sm font-questrial uppercase text-[#B78924] font-medium tracking-wider">
                Follow Us
              </h4>
              <ul className="space-y-3">
                {followLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-questrial text-sm text-neutral-600 hover:text-gold-550 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* 3. Bottom Copyrights Bar */}
        <div className="border-t border-neutral-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-sm font-questrial">
          <span>Copyrights</span>
          <span>© 2026 Your Brand. All Rights Reserved.</span>
        </div>

      </div>
    </footer>
  );
}
