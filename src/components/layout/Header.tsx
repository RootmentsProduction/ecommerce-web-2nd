'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import MegaMenu from './MegaMenu';
import { MenuItem } from '../../types/menu';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Is this the home page?
  const isHomePage = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  const [prevIsHomePage, setPrevIsHomePage] = useState(isHomePage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (isHomePage !== prevIsHomePage) {
    setPrevIsHomePage(isHomePage);
    setIsScrolled(!isHomePage);
  }

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount to handle initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  // Determine header classes based on route and scroll state
  const headerBgClass = isHomePage
    ? isScrolled
      ? 'bg-white text-neutral-900 border-b border-neutral-100 shadow-xs'
      : 'bg-transparent text-white border-b border-white/15'
    : 'bg-white text-neutral-900 border-b border-neutral-100 shadow-xs';

  const logoColorClass = isHomePage
    ? isScrolled
      ? 'text-neutral-900'
      : 'text-white'
    : 'text-neutral-900';

  const navLinkClass = (itemHref: string, itemName: string) => {
    const isCurrent = itemName === 'Collections' ? false : pathname === itemHref;
    if (isHomePage) {
      if (isScrolled) {
        return isCurrent
          ? 'text-neutral-900 font-normal border-b border-gold-550'
          : 'text-neutral-600 hover:text-gold-600';
      } else {
        return isCurrent
          ? 'text-white font-normal border-b border-gold-400'
          : 'text-[#F5F5F5] hover:text-white';
      }
    } else {
      return isCurrent
        ? 'text-neutral-900 font-normal border-b border-gold-550'
        : 'text-neutral-600 hover:text-gold-600';
    }
  };

  const iconButtonClass = isHomePage
    ? isScrolled
      ? 'text-neutral-700 hover:text-gold-600'
      : 'text-white/90 hover:text-white'
    : 'text-neutral-700 hover:text-gold-600';

  const borderClass = isHomePage
    ? isScrolled
      ? 'border-neutral-100'
      : 'border-white/15'
    : 'border-neutral-100';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}>
        <div className="w-full px-[6.5%]">
          <div className="flex items-stretch justify-between h-16 md:h-20">

            {/* Left side Grid Area (Logo & Asterisk) */}
            <div className="flex items-stretch h-full">
              {/* Asterisk Box - desktop only */}
              <div className={`hidden md:flex w-10 items-center justify-center border-l ${borderClass}`}>
                <span className="text-[#B78924] text-[32px] font-bold leading-none select-none">✳</span>
              </div>
              {/* Logo text box with inline mobile asterisk */}
              <div className="flex items-center px-4 md:pl-2 md:pr-6 gap-2">
                <span className="text-[#B78924] text-xl font-bold leading-none select-none md:hidden pt-0.5">✳</span>
                <Link href="/" className="inline-block">
                  <span className={`font-raleway text-[17px] sm:text-[21.25px] leading-none tracking-[0em] font-medium transition-colors duration-350 ${logoColorClass}`}>
                    Jewelry by Zorucci
                  </span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation links (Aligned right to create elegant gap) */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center justify-end h-full flex-grow mr-8 lg:mr-12">
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  className="h-full flex items-center relative"
                  onMouseEnter={() => item.hasMegaMenu && setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={`font-questrial text-[17.38px] leading-[25.11px] uppercase tracking-normal transition-colors py-2 flex items-center gap-1.5 ${navLinkClass(
                      item.href,
                      item.name
                    )}`}
                  >
                    <span>{item.name}</span>
                    {item.name === 'Collections' && (
                      <svg className="w-2.5 h-2.5 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Mega Menu Overlay */}
                  {hoveredItem === item && item.hasMegaMenu && (
                    <MegaMenu item={item} onClose={() => setHoveredItem(null)} />
                  )}
                </div>
              ))}
            </nav>

            {/* Right side Grid Area (Icons: Cart, Search, Profile) */}
            <div className="flex items-stretch h-full">
              {/* Shopping Cart Bag */}
              <Link
                href="/cart"
                className={`w-14 md:w-16 flex items-center justify-center relative border-l ${borderClass} ${iconButtonClass} transition-colors`}
                aria-label="Cart"
              >
                <div className="relative">
                  <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.482878" y="0.482878" width="31.0342" height="26.0342" rx="2.51712" stroke="currentColor" strokeWidth="0.965756" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-[#B78924] text-white text-[9px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount > 0 ? cartCount : 2}
                  </span>
                </div>
              </Link>

              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`hidden md:flex w-16 items-center justify-center border-l ${borderClass} ${iconButtonClass} transition-colors focus:outline-none`}
                aria-label="Search products"
              >
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30.5 30.5L23.2667 23.2667M27.1667 13.8333C27.1667 21.1971 21.1971 27.1667 13.8333 27.1667C6.46954 27.1667 0.5 21.1971 0.5 13.8333C0.5 6.46954 6.46954 0.5 13.8333 0.5C21.1971 0.5 27.1667 6.46954 27.1667 13.8333Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Profile User Icon & Dropdown */}
              <div className="relative flex items-stretch">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className={`hidden md:flex w-16 items-center justify-center border-l border-r ${borderClass} ${iconButtonClass} transition-colors focus:outline-none cursor-pointer`}
                      aria-label="Account menu"
                    >
                      <span className="font-questrial text-xs font-semibold tracking-wider text-[#c59b27] uppercase">
                        {user?.firstName ? user.firstName.substring(0, 2) : 'US'}
                      </span>
                    </button>
                    {profileDropdownOpen && (
                      <div className="absolute right-0 top-[100%] w-48 bg-white border border-neutral-100 shadow-xl py-2 z-50 text-neutral-800">
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="font-questrial text-[10px] text-neutral-400 uppercase tracking-widest">Signed in as</p>
                          <p className="font-raleway text-xs font-semibold text-neutral-800 truncate mt-0.5">{user?.firstName} {user?.lastName}</p>
                        </div>
                        {isAdmin && (
                          <Link
                            href="/admin/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="block px-4 py-2 text-xs font-questrial hover:bg-neutral-50 text-neutral-700 hover:text-[#c59b27] uppercase tracking-wider"
                          >
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-questrial hover:bg-neutral-50 text-neutral-700 hover:text-red-600 uppercase tracking-wider border-t border-neutral-50 cursor-pointer"
                        >
                          Log out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className={`hidden md:flex w-16 items-center justify-center border-l border-r ${borderClass} ${iconButtonClass} transition-colors`}
                    aria-label="Profile"
                  >
                    <svg width="25" height="31" viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.8333 30.5V27.1667C23.8333 25.3986 23.131 23.7029 21.8807 22.4526C20.6305 21.2024 18.9348 20.5 17.1667 20.5H7.16667C5.39856 20.5 3.70286 21.2024 2.45262 22.4526C1.20238 23.7029 0.5 25.3986 0.5 27.1667V30.5M18.8333 7.16667C18.8333 10.8486 15.8486 13.8333 12.1667 13.8333C8.48477 13.8333 5.5 10.8486 5.5 7.16667C5.5 3.48477 8.48477 0.5 12.1667 0.5C15.8486 0.5 18.8333 3.48477 18.8333 7.16667Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
              </div>

              {/* Mobile Hamburger menu */}
              <div className="w-14 flex md:hidden items-center justify-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className={`p-2 rounded-md ${iconButtonClass} focus:outline-none`}
                  aria-label="Open mobile menu"
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h10" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative flex flex-col w-full max-w-xs py-4 pb-12 overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 pb-4 border-b border-neutral-100">
              <span className="font-serif-luxury text-xl tracking-[0.2em] text-gold-600">JEWEL</span>
              <button
                type="button"
                className="p-2 text-neutral-500 hover:text-neutral-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-2 py-4 space-y-1">
              {menuItems.map((item, idx) => (
                <div key={idx}>
                  {item.hasMegaMenu ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileExpandedItem(
                            mobileExpandedItem === item.name ? null : item.name
                          )
                        }
                        className="flex items-center justify-between w-full px-3 py-3 text-sm font-light text-neutral-800 uppercase tracking-widest hover:bg-neutral-50 rounded-md"
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${mobileExpandedItem === item.name ? 'rotate-180' : ''
                            }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Expanded child category lists */}
                      {mobileExpandedItem === item.name && item.megaMenuColumns && (
                        <div className="pl-6 pr-2 py-2 space-y-4 bg-neutral-50 border-y border-neutral-100">
                          {item.megaMenuColumns.map((col, cIdx) => (
                            <div key={cIdx} className="space-y-1.5">
                              <h4 className="text-[10px] uppercase font-semibold text-neutral-600 tracking-wider">
                                {col.title}
                              </h4>
                              <ul className="space-y-1">
                                {col.items.map((sub, sIdx) => (
                                  <li key={sIdx}>
                                    <Link
                                      href={sub.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block py-1 text-xs text-neutral-500 font-light hover:text-gold-500"
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-3 text-sm font-light text-neutral-800 uppercase tracking-widest hover:bg-neutral-50 rounded-md"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Drawer Auth Section */}
            <div className="px-4 py-6 border-t border-neutral-100 space-y-4">
                {isAuthenticated ? (
                  <>
                    <div className="text-xs font-questrial text-neutral-500 mb-2">
                      Logged in as: <strong className="text-neutral-800 font-medium">{user?.firstName} {user?.lastName}</strong>
                    </div>
                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm font-light text-neutral-800 uppercase tracking-widest hover:text-[#c59b27]"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="block w-full text-left py-1 text-sm font-light text-red-600 uppercase tracking-widest hover:underline cursor-pointer"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-4">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-questrial uppercase tracking-widest text-[#111111] hover:text-[#c59b27] border border-[#111111] px-4 py-2 flex-1 text-center font-medium"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-questrial uppercase tracking-widest text-white hover:bg-neutral-800 bg-[#111111] px-4 py-2 flex-1 text-center font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      {/* Expandable Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-start justify-center transition-all duration-300">
          <div className="bg-white w-full max-w-3xl py-6 px-6 shadow-2xl relative mt-20 border border-neutral-100 animate-slide-down">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-light mb-4">
              What are you looking for?
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchOpen(false);
                window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
              }}
              className="flex gap-4 border-b border-neutral-200 pb-2"
            >
              <input
                type="text"
                placeholder="Search earrings, necklaces, rings, gold..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-base font-light text-neutral-800 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="text-neutral-500 hover:text-gold-600 font-light text-sm uppercase tracking-widest"
              >
                Search
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2.5 items-center text-xs font-light text-neutral-500">
              <span className="font-normal text-neutral-700">Popular Searches:</span>
              <Link href="/shop?category=rings" onClick={() => setSearchOpen(false)} className="hover:text-gold-500 underline decoration-neutral-200">Rings</Link>
              <span>•</span>
              <Link href="/shop?category=earrings" onClick={() => setSearchOpen(false)} className="hover:text-gold-500 underline decoration-neutral-200">Earrings</Link>
              <span>•</span>
              <Link href="/shop?collection=aurelia" onClick={() => setSearchOpen(false)} className="hover:text-gold-500 underline decoration-neutral-200">Aurelia</Link>
              <span>•</span>
              <Link href="/shop?filter=bestseller" onClick={() => setSearchOpen(false)} className="hover:text-gold-500 underline decoration-neutral-200">Best Sellers</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
