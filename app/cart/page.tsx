"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

function parsePrice(price: unknown) {
  if (typeof price === "number") return price;
  if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
  return 0;
}

export default function CartPage() {
  const { getCartItems, getCartTotal, updateQuantity, removeFromCart } =
    useCart();

  const cartItems = getCartItems();
  const total = getCartTotal();

  const totalFormatted = useMemo(() => {
    return parsePrice(total).toLocaleString("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, [total]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container py-6 sm:py-10 max-w-3xl">
          <h1 className="text-2xl font-bold">Giỏ hàng</h1>

          {cartItems.length === 0 ? (
            <div className="mt-8 rounded-xl border bg-card p-6 text-center">
              <p className="text-muted-foreground">Giỏ hàng của bạn đang trống.</p>
              <Button asChild className="mt-4">
                <Link href="/products">Tiếp tục mua sắm</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 rounded-xl border bg-card p-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-semibold truncate">
                            {item.product.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Size: {item.size}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() =>
                            removeFromCart(String(item.product.id), item.size)
                          }
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center border rounded-md w-fit">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                String(item.product.id),
                                Math.max(1, item.quantity - 1),
                                item.size
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                String(item.product.id),
                                item.quantity + 1,
                                item.size
                              )
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {(
                            parsePrice(item.product.price) * item.quantity
                          ).toLocaleString("vi-VN", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                          đ
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between font-semibold">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{totalFormatted}đ</span>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/products">Tiếp tục mua sắm</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href="/checkout">Thanh toán</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

