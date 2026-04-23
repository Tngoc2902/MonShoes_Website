import Hero from "@/components/hero";
import FeaturedProducts from "@/components/featured-products";
import Benefits from "@/components/benefits";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

// Enable ISR (Incremental Static Regeneration) - Shopify-like performance
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <Benefits />
      </main>
      <Footer />
    </div>
  );
}
