"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "./auth-modal";
import CheckoutModal from "./checkout-modal";

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { items } = useCart();
  const router = useRouter();

  // Hàm tìm kiếm theo id (nếu muốn tìm chính xác theo id)
  // function findProductById(products, id) {
  //   return products.find((product) => String(product.id) === String(id));
  // }

  // Xử lý tìm kiếm khi submit form hoặc nhấn Enter
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (search.trim()) {
      // Chuyển hướng đến trang search với query q
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl">
              MON<span className="text-primary">SHOES</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Giảm Giá
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Tất cả sản phẩm
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Giày Order
            </Link>
            {/* <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Giày ký gửi
            </Link> */}
          </nav>
          {/* Thanh tìm kiếm và các nút */}
          <form
            className="flex items-center gap-4"
            onSubmit={handleSearch}
            autoComplete="off"
          >
            <Search className="h-5 w-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="ml-2 hidden md:inline-block bg-transparent outline-none placeholder:text-muted-foreground"
            />
            {/* <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              type="submit"
              aria-label="Tìm kiếm"
            >
              <span className="sr-only">Tìm kiếm</span>
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCheckoutModalOpen(true)}
              className="relative"
              type="button"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Giỏ hàng</span>
              {items.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                >
                  {items.length}
                </Badge>
              )}
            </Button>
            <Button
              className="hidden md:flex"
              onClick={() => setIsAuthModalOpen(true)}
              type="button"
            >
              Đăng nhập
            </Button>
            {/* <Button
              className="hidden md:flex"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Đăng ký
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              type="button"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </form>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </>
  );
}
