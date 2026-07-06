import React from "react";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import NewArrivalsSection from "../components/home/NewArrivalsSection";
import BestSellerSection from "../components/home/BestSellerSection";
import InstagramSection from "../components/home/InstagramSection";
import LatestCollectionSection from "../components/home/LatestCollectionSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Immersive Hero Section */}
      <HeroSection />

      {/* Content wrapper that overlaps the hero section on scroll */}
      <div className="relative z-20 bg-white shadow-lg">

        {/* New Arrivals Showcase */}
        <NewArrivalsSection />

        {/* Categories Grid */}
        <CategorySection />

        {/* Latest Collection (Visible on mobile only, replacing Best Sellers and Instagram) */}
        <div className="block sm:hidden">
          <LatestCollectionSection />
        </div>

        {/* Best Sellers Showcase */}
        <BestSellerSection />

        {/* Instagram User Gallery */}
        <InstagramSection />
      </div>
    </div>
  );
}

