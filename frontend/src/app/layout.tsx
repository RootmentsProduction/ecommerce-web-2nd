import type { Metadata } from "next";
import { Fredoka, Caveat, Questrial, Raleway, Instrument_Sans } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "../components/layout/ClientLayoutWrapper";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

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
  title: "Crafts by Zorucci | Handcrafted Toys, Gifts & Studio Crafts",
  description: "Discover charming handcrafted toys, plushies, aesthetic stationaries, and gifts by Crafts by Zorucci.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${fredoka.variable} ${caveat.variable} ${questrial.variable} ${raleway.variable} ${instrumentSans.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 selection:bg-purple-100 selection:text-neutral-900">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}


