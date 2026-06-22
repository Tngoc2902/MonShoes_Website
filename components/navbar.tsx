"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthModal from "./auth-modal";
import { ThemeToggle } from "./theme-toggle";


const bannerAds = [
  "🎉 Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1.000.000₫! 🎉",
  "🔥 Sản phâm mới đã về! Khám phá ngay bộ sưu tập giày thể thao 2025!",
  "👟 Mua 1 tặng 1 cho các mẫu giày seanker! Chỉ trong tuần này!",
  "💥 Giảm giá 20% cho đơn hàng đầu tiên! Sử dụng mã: WELCOME20",
];

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { items } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // Hàm tìm kiếm theo id (nếu muốn tìm chính xác theo id)
  // function findProductById(products, id) {
  //   return products.find((product) => String(product.id) === String(id));
  // }

  // Xử lý tìm kiếm khi submit form hoặc nhấn Enter
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      // Chuyển hướng đến trang search với query q
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
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
              Liên hệ
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
              onClick={() => router.push("/cart")}
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
            <ThemeToggle />
            {!isAuthenticated ? (
              <Button
                className="hidden md:flex"
                onClick={() => setIsAuthModalOpen(true)}
                type="button"
              >
                Đăng nhập
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex gap-1"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                      Tài khoản của tôi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist" className="cursor-pointer">Yêu thích</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/order" className="cursor-pointer">Đơn hàng của tôi</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-600"
                  >
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              type="button"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </form>
          <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <div className="space-y-4 px-4 pb-6">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="block text-lg font-medium text-gray-800 hover:text-primary"
                >
                  Trang chủ
                </Link>
                <Link
                  href="/products?sort=discount"
                  onClick={() => setMenuOpen(false)}
                  className="block text-lg font-medium text-gray-800 hover:text-primary"
                >
                  Giảm Giá
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMenuOpen(false)}
                  className="block text-lg font-medium text-gray-800 hover:text-primary"
                >
                  Tất cả sản phẩm
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block text-lg font-medium text-gray-800 hover:text-primary"
                >
                  Liên hệ
                </Link>
                <form
                  className="flex items-center gap-2 py-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (search.trim()) {
                      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
                      setMenuOpen(false);
                    }
                  }}
                >
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                  <Button type="submit" size="sm">
                    Tìm
                  </Button>
                </form>
                <div className="flex items-center justify-center py-4">
                  <ThemeToggle />
                </div>
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block text-lg font-medium text-gray-800 hover:text-primary"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setMenuOpen(false)}
                      className="block text-lg font-medium text-gray-800 hover:text-primary"
                    >
                      Tài khoản của tôi
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                    >
                      Đăng xuất
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                  >
                    Đăng nhập
                  </Button>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
