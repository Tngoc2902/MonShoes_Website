"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { products } from "@/data/products";
import { useWishlist } from "@/hooks/use-wishlist";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, count, removeWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(String(product.id))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-10">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Sản phẩm yêu thích</h1>
              <p className="text-muted-foreground">Bạn đã lưu {count} sản phẩm vào danh sách yêu thích.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/order">
                <Button variant="outline">Lịch sử đơn hàng</Button>
              </Link>
              <Link href="/products">
                <Button>Tiếp tục mua sắm</Button>
              </Link>
            </div>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="rounded-xl border bg-card p-10 text-center">
              <p className="text-lg font-medium">Danh sách yêu thích của bạn đang trống.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Thêm sản phẩm vào yêu thích để xem lại nhanh chóng sau này.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="border rounded-3xl bg-white shadow-sm overflow-hidden">
                  <div className="relative h-72 bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-6"
                    />
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-semibold text-lg">{product.name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{product.rating} ⭐ ({product.reviews})</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeWishlist(String(product.id))}
                        className="text-red-500 hover:text-red-600"
                        aria-label="Xóa khỏi yêu thích"
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xl font-bold text-primary">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button
                        className="flex-1"
                        onClick={() => addToCart(String(product.id), product.sizes?.[0] ?? "")}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Thêm vào giỏ hàng
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/products/${product.id}`}>Xem chi tiết</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
