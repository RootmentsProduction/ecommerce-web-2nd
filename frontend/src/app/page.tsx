import React, { Suspense } from "react";
import HeroSection from "../components/home/HeroSection";
import CategorySection, { CategorySectionSkeleton } from "../components/home/CategorySection";
import NewArrivalsSection from "../components/home/NewArrivalsSection";
import BestSellerSection from "../components/home/BestSellerSection";
import InstagramSection from "../components/home/InstagramSection";

import { getProducts } from "@/services/products.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [newArrivalsResponse, bestSellersResponse] = await Promise.all([
    getProducts({ newArrival: true }),
    getProducts({ bestSeller: true }),
  ]);

  const newArrivals = newArrivalsResponse.slice(0, 4);
  const bestSellers = bestSellersResponse.slice(0, 4);

  return (
    <div className="flex flex-col w-full relative">
      {/* Immersive Hero Section */}
      <HeroSection />

      {/* Content wrapper that overlaps the hero section on scroll */}
      <div className="relative z-20 bg-white shadow-lg">

        {/* New Arrivals Showcase */}
        <NewArrivalsSection products={newArrivals} />

        {/* Categories Grid – streamed independently via Suspense */}
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection />
        </Suspense>

        {/* Best Sellers Showcase */}
        <BestSellerSection products={bestSellers} />

        {/* Instagram User Gallery */}
        <InstagramSection />
      </div>
    </div>
  );
}

