import AllProducts from "@/app/products/allproducts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm | MONSHOES",
  description: "Khám phá bộ sưu tập giày thể thao chính hãng tại MONSHOES. Đa dạng mẫu mã, kích cỡ với giá cả phải chăng.",
  keywords: "giày thể thao, sneaker, giày chạy bộ, giày Nike, giày Adidas",
  openGraph: {
    title: "Tất cả sản phẩm | MONSHOES",
    description: "Khám phá bộ sưu tập giày thể thao chính hãng tại MONSHOES",
    type: "website",
  },
};

// Enable ISR for better performance
export const revalidate = 1800; // Revalidate every 30 minutes

export default function ProductsPage() {
  return <AllProducts />;
}
