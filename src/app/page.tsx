import React from "react";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import NewArrivalsSection from "../components/home/NewArrivalsSection";
import BestSellerSection from "../components/home/BestSellerSection";
import InstagramSection from "../components/home/InstagramSection";

import { getProducts } from "@/services/products.service";

export default async function Home() {
  const products = await getProducts();
  // Keep only active (non-draft) products for the storefront
  const activeProducts = products.filter((p) => p.id !== "SKU-005");
  const newArrivals = activeProducts.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = activeProducts.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="flex flex-col w-full relative">
      {/* Immersive Hero Section */}
      <HeroSection />

      {/* Content wrapper that overlaps the hero section on scroll */}
      <div className="relative z-20 bg-white shadow-lg">

        {/* New Arrivals Showcase */}
        <NewArrivalsSection products={newArrivals} />

        {/* Categories Grid */}
        <CategorySection />

        {/* Best Sellers Showcase */}
        <BestSellerSection products={bestSellers} />

        {/* Instagram User Gallery */}
        <InstagramSection />
      </div>
    </div>
  );
}

