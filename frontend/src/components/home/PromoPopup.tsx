"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getSystemSettings } from "@/services/system-settings.service";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });

  useEffect(() => {
    // Check if dismissed in this tab session
    const dismissed = sessionStorage.getItem("promo_popup_dismissed");
    if (dismissed === "true") return;

    // Fetch config
    getSystemSettings().then((settings) => {
      if (settings.promo_popup_enabled === "true") {
        setPopupData({
          title: settings.promo_popup_title || "Announcement",
          description: settings.promo_popup_description || "",
          image: settings.promo_popup_image || "",
          link: settings.promo_popup_link || "",
        });
        setIsOpen(true);
      }
    });
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("promo_popup_dismissed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Blurry dim overlay */}
      <div 
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal box */}
      <div className="relative bg-white border border-[#E5E5E5] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row transform scale-100 transition-all duration-300 max-h-[90vh]">
        
        {/* Close [X] Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-md border border-neutral-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left column: Image banner if provided */}
        {popupData.image && (
          <div className="w-full md:w-1/2 aspect-video md:aspect-auto relative min-h-[200px] md:min-h-[350px] bg-[#FAF9F6] border-r border-[#E5E5E5]">
            <img
              src={popupData.image}
              alt={popupData.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Right column: Texts */}
        <div className={`w-full ${popupData.image ? 'md:w-1/2' : 'w-full'} p-8 md:p-10 flex flex-col justify-center text-left space-y-5 overflow-y-auto`}>
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C99213] block">
              Special Announcement
            </span>
            <h3 className="font-raleway font-semibold text-2xl md:text-3xl text-neutral-900 leading-tight">
              {popupData.title}
            </h3>
          </div>

          {popupData.description && (
            <p className="font-questrial text-xs md:text-sm text-neutral-600 leading-relaxed">
              {popupData.description}
            </p>
          )}

          {/* CTA Link Action */}
          <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center">
            {popupData.link ? (
              <Link
                href={popupData.link}
                onClick={handleClose}
                className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 h-12 bg-[#C99213] hover:bg-[#a9831e] text-white transition-colors text-xs font-bold tracking-[0.15em] uppercase rounded-full shadow-md"
              >
                <span>Discover Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : null}

            <button
              onClick={handleClose}
              className="w-full sm:w-auto h-12 px-6 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 transition-colors text-xs font-bold tracking-[0.15em] uppercase rounded-full text-center"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
