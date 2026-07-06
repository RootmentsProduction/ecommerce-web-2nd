import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ServiceBenefitsBar from "../components/layout/ServiceBenefitsBar";

export const metadata: Metadata = {
  title: "JEWEL | Handcrafted Luxury & Premium Fine Jewellery",
  description: "Discover the Aurelia and Celeste collections of handcrafted 18k gold and platinum jewellery. Perfection in every cut, timeless design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 selection:bg-gold-200 selection:text-neutral-900">
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <ServiceBenefitsBar />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

