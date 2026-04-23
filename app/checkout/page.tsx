"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";

function parsePrice(price: unknown) {
  if (typeof price === "number") return price;
  if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
  return 0;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { getCartItems, getCartTotal, clearCart } = useCart();

  const cartItems = getCartItems();
  const total = getCartTotal();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  const totalFormatted = useMemo(() => {
    return parsePrice(total).toLocaleString("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, [total]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống.");
      router.push("/products");
      return;
    }
    toast.success("Đặt hàng thành công!");
    clearCart();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container py-6 sm:py-10 max-w-3xl">
          <h1 className="text-2xl font-bold">Thanh toán</h1>

          {cartItems.length === 0 ? (
            <div className="mt-8 rounded-xl border bg-card p-6 text-center">
              <p className="text-muted-foreground">Giỏ hàng của bạn đang trống.</p>
              <Button asChild className="mt-4">
                <Link href="/products">Tiếp tục mua sắm</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <div className="rounded-xl border bg-card p-4 sm:p-6">
                <h2 className="text-lg font-semibold">Thông tin giao hàng</h2>
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên</Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ giao hàng</Label>
                    <Textarea
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="note">Ghi chú</Label>
                    <Textarea
                      id="note"
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                    />
                  </div>

                  <div className="pt-2 flex flex-col-reverse sm:flex-row gap-3">
                    <Button asChild variant="outline" className="flex-1">
                      <Link href="/cart">Quay lại giỏ hàng</Link>
                    </Button>
                    <Button type="submit" className="flex-1">
                      Thanh toán
                    </Button>
                  </div>
                </form>
              </div>

              <div className="rounded-xl border bg-card p-4 sm:p-6">
                <h2 className="text-lg font-semibold">Đơn hàng của bạn</h2>
                <div className="mt-4 space-y-2">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <span className="min-w-0 flex-1 truncate">
                        {item.product.name} - Size {item.size} x {item.quantity}
                      </span>
                      <span className="shrink-0">
                        {(
                          parsePrice(item.product.price) * item.quantity
                        ).toLocaleString("vi-VN", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                        đ
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{totalFormatted}đ</span>
                  </div>
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
