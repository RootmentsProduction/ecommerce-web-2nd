import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function InstagramSection() {
  // Dynamically scan the public/videos directory
  const videosDirectory = path.join(process.cwd(), 'public/videos');
  let videoFiles: string[] = [];

  try {
    if (fs.existsSync(videosDirectory)) {
      videoFiles = fs.readdirSync(videosDirectory)
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          // Support common video formats and exclude hidden/system files
          return ['.mp4', '.webm', '.ogg', '.mov'].includes(ext) && !file.startsWith('.');
        })
        // Sort files alphabetically/numerically
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }
  } catch (error) {
    console.error('Error reading public/videos directory:', error);
  }

  // If no videos are found, do not render the section
  if (videoFiles.length === 0) {
    return null;
  }

  // Make sure we have at least 8 items in the base array before doubling,
  // so the scrolling marquee spans wider than any screen resolution.
  let baseList = [...videoFiles];
  while (baseList.length < 8) {
    baseList = [...baseList, ...videoFiles];
  }

  return (
    <section className="py-12 bg-white relative sm:py-16">
      
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
            const videoSrc = `/videos/${encodeURIComponent(filename)}`;
            return (
              <div
                key={idx}
                className="relative aspect-[9/16] w-[180px] sm:w-[240px] md:w-[280px] flex-shrink-0 overflow-hidden bg-neutral-100 rounded-lg group shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
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
        <div className="flex overflow-x-auto gap-6 pb-6 px-1 snap-x snap-mandatory scrollbar-none">
          {videoFiles.map((filename, idx) => {
            const videoSrc = `/videos/${encodeURIComponent(filename)}`;
            return (
              <div
                key={idx}
                className="relative aspect-[9/16] w-[70vw] min-w-[200px] max-w-[240px] snap-start flex-shrink-0 overflow-hidden bg-neutral-100 rounded-lg shadow-sm"
              >
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/15 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <svg 
                      className="w-5 h-5 text-white" 
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

    </section>
  );
}


