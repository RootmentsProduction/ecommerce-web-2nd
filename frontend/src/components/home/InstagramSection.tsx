"use client";

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import videoFiles from '../../data/videos.json';
import { getSystemSettings } from '@/services/system-settings.service';

export default function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [reels, setReels] = useState<string[]>(videoFiles);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Fetch dynamic videos from database
  useEffect(() => {
    getSystemSettings().then((settings) => {
      if (settings.instagram_videos) {
        try {
          const list = JSON.parse(settings.instagram_videos);
          if (Array.isArray(list) && list.length > 0) {
            setReels(list);
          }
        } catch (e) {
          console.error("Failed to parse instagram videos:", e);
        }
      }
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !reels || reels.length === 0) return;

    const isMobile = () => window.innerWidth < 640;

    let animationFrameId: number;
    let isInteracting = false;
    let interactionTimeout: NodeJS.Timeout;
    const scrollSpeed = 0.5; // Slow scroll speed for Reels (px/frame)
    const originalCount = reels.length;
    let scrollPos = container.scrollLeft;

    let expectedScrollLeft = container.scrollLeft;

    const handleInteractionStart = () => {
      isInteracting = true;
      scrollPos = container.scrollLeft;
      clearTimeout(interactionTimeout);
    };

    const handleInteractionEnd = () => {
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isInteracting = false;
        scrollPos = container.scrollLeft;
      }, 2000);
    };

    container.addEventListener('touchstart', handleInteractionStart, { passive: true });
    container.addEventListener('touchend', handleInteractionEnd, { passive: true });
    container.addEventListener('mousedown', handleInteractionStart);
    container.addEventListener('mouseup', handleInteractionEnd);
    container.addEventListener('mouseleave', handleInteractionEnd);

    const handleScroll = () => {
      const isProgrammatic = Math.abs(container.scrollLeft - expectedScrollLeft) < 1;
      if (!isProgrammatic) {
        isInteracting = true;
        scrollPos = container.scrollLeft;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
          isInteracting = false;
        }, 2000);
      }
    };
    container.addEventListener('scroll', handleScroll, { passive: true });

    const step = () => {
      if (!isInteracting && isMobile() && container.children.length >= originalCount * 2) {
        scrollPos += scrollSpeed;

        const firstSetEndElement = container.children[originalCount] as HTMLElement;
        if (firstSetEndElement) {
          const W = firstSetEndElement.offsetLeft - (container.children[0] as HTMLElement).offsetLeft;
          if (scrollPos >= W) {
            scrollPos -= W;
          }
        }
        container.scrollLeft = scrollPos;
        expectedScrollLeft = container.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(interactionTimeout);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
      container.removeEventListener('mousedown', handleInteractionStart);
      container.removeEventListener('mouseup', handleInteractionEnd);
      container.removeEventListener('mouseleave', handleInteractionEnd);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [reels]);

  // If no videos are found, do not render the section
  if (!reels || reels.length === 0) {
    return null;
  }

  // Make sure we have at least 8 items in the base array before doubling,
  // so the scrolling marquee spans wider than any screen resolution.
  let baseList = [...reels];
  while (baseList.length < 8) {
    baseList = [...baseList, ...reels];
  }

  return (
    <section ref={sectionRef} className="py-12 bg-white relative sm:py-16">
      
      {/* Desktop Section Header (hidden on mobile) */}
      <div className="hidden sm:block w-full px-[6.5%] mx-auto max-w-none relative z-10 mb-8">
        <div className="flex items-center gap-2 font-questrial text-[22px] leading-[26px] tracking-normal text-[#B78924] font-normal mb-4">
          <span>✳</span>
          <span>Shared Moments</span>
        </div>
        <div className="flex items-baseline justify-between pb-4">
          <h2 className="font-raleway font-medium text-[36px] leading-[100%] tracking-normal text-[#453920]">
            Follow Us On Instagram
          </h2>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-questrial font-light text-[24px] leading-[26px] tracking-normal text-[#B78924] hover:text-gold-600 no-underline border-b border-[#B78924] pb-[2px] text-right inline-block"
          >
            @Jewelrybyzorucci
          </Link>
        </div>
      </div>

      {/* Mobile Section Header (centered style matching latest collection layout) */}
      <div className="flex sm:hidden flex-col items-center text-center mb-6 px-[6.5%]">
        <div 
          className="flex items-center gap-2 mb-2"
          style={{
            color: '#B78924',
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 200,
            fontSize: '18px',
            lineHeight: '26px',
            letterSpacing: '0%',
            textTransform: 'uppercase'
          }}
        >
          <span className="text-[16px]">✳</span>
          <span>Shared Moments</span>
        </div>
        
        <h2 className="font-raleway font-medium text-[26px] leading-[32px] tracking-wide text-neutral-900 uppercase max-w-xs mx-auto mb-3">
          Follow Us On Instagram
        </h2>
        
        <div className="w-full text-right px-2 mt-2">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-questrial font-light text-[15px] text-[#B78924] hover:text-gold-600 no-underline border-b border-[#B78924] pb-[2px] inline-block"
          >
            @Jewelrybyzorucci
          </Link>
        </div>
      </div>

      {/* Desktop Gallery (Full-width edge-to-edge auto-scrolling marquee - hidden on mobile) */}
      <div className="hidden sm:block w-full overflow-hidden relative">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee-scroll 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="animate-marquee gap-6 px-4">
          {/* Double the array elements to ensure seamless loop */}
          {[...baseList, ...baseList].map((filename, idx) => {
            const videoSrc = (filename.startsWith('http') || filename.startsWith('/'))
              ? filename
              : `/videos/${encodeURIComponent(filename)}`;
            return (
              <div
                key={idx}
                className="relative aspect-[9/16] w-[180px] sm:w-[240px] md:w-[280px] flex-shrink-0 overflow-hidden bg-neutral-100 rounded-lg group shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {isInView ? (
                  <video
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-100 animate-pulse" />
                )}
                {/* Instagram/Reel Icon Overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Gallery (same format and layout as latest collection - scrollable container) */}
      <div className="block sm:hidden w-full px-[6.5%]">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 px-1 scrollbar-none"
        >
          {[...reels, ...reels, ...reels].map((filename, idx) => {
            const videoSrc = (filename.startsWith('http') || filename.startsWith('/'))
              ? filename
              : `/videos/${encodeURIComponent(filename)}`;
            return (
              <div
                key={idx}
                className="relative aspect-[9/16] w-[70vw] min-w-[200px] max-w-[240px] flex-shrink-0 overflow-hidden bg-neutral-100 rounded-lg shadow-sm"
              >
                {isInView ? (
                  <video
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-100 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tailwind scrollbar removal style */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </section>
  );
}


