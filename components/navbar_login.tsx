"use client";

import AuthModal from "@/components/auth-modal";
import CheckoutModal from "@/components/checkout-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/cart-context";
import { LogOut, Phone, Search, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { items = [] as any[] } = useCart();
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    if (e) e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleLogout = () => {
    router.push("/");
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
              href="/order"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Giày Order
            </Link>
          </nav>

          {/* Thanh tìm kiếm và các nút */}
          <div className="flex items-center gap-4">
            <form
              className="flex items-center gap-2"
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
            </form>

            {/* Nút giỏ hàng */}
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

            {/* Menu người dùng */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 py-1 rounded-full border border-gray-300 shadow bg-white"
                >
                  <span className="text-base font-semibold text-black hidden md:inline">
                    Trịnh Khánh Ngọc
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl p-4 bg-white shadow-lg border-2 border-gray-200 flex flex-col gap-4"
                style={{ minWidth: 220 }}
              >
                <DropdownMenuItem
                  onClick={() => router.push("/carts")}
                  className="flex items-center justify-between w-full border rounded-xl px-4 py-3 text-lg font-semibold hover:bg-gray-100"
                >
                  Đơn hàng
                  <Truck className="ml-2 h-6 w-6" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/contact")}
                  className="flex items-center justify-between w-full border rounded-xl px-4 py-3 text-lg font-semibold hover:bg-gray-100"
                >
                  Liên hệ
                  <Phone className="ml-2 h-6 w-6" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center justify-between w-full border rounded-xl px-4 py-3 text-lg font-semibold hover:bg-gray-100"
                >
                  Đăng xuất
                  <LogOut className="ml-2 h-6 w-6" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Modal đăng nhập và thanh toán */}
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
