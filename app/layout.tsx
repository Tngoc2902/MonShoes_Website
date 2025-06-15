import { CartProvider } from "@/contexts/cart-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MONSHOES - Giày thể thao chính hãng",
  description:
    "Cửa hàng giày thể thao chính hãng với đa dạng mẫu mã và kích cỡ",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className} suppressHydrationWarning>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
