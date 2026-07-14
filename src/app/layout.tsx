import type { Metadata } from "next";
import { Questrial, Raleway, Instrument_Sans } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "../components/layout/ClientLayoutWrapper";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-questrial",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

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
    <html 
      lang="en" 
      className={`${questrial.variable} ${raleway.variable} ${instrumentSans.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 selection:bg-gold-200 selection:text-neutral-900">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}


