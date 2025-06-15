import Hero from "@/components/hero";
import FeaturedProducts from "@/components/featured-products";
import Benefits from "@/components/benefits";
import Footer from "@/components/footer";
import NavbarLogin from "@/components/navbar_login"; // Đổi tên component navbar_login nếu bạn đặt tên khác
import Navbar from "@/components/navbar"; // Giữ nguyên nếu bạn muốn sử dụng navbar chung cho cả trang
import React from "react";
export default function HomeLogin() {
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
