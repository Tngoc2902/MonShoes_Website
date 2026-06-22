"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/cart-context";
import { applyCoupon, submitOrder } from "@/lib/api-client";
import { useAuth } from "@/contexts/auth-context";
import { saveOrderHistory } from "@/lib/order-history";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";
import { Check, Edit2, Truck, CreditCard, DollarSign } from "lucide-react";

function parsePrice(price: unknown) {
  if (typeof price === "number") return price;
  if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
  return 0;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { getCartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const cartItems = getCartItems();
  const total = getCartTotal();

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }
  }, [user]);

  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const shippingFees = {
    standard: 0,
    fast: 25000,
    express: 50000,
  };

  const shippingCost = shippingFees[shippingMethod as keyof typeof shippingFees] || 0;
  const discountAmount = Math.floor((total * discountPercent) / 100);
  const finalTotal = total - discountAmount + shippingCost;

  const totalFormatted = useMemo(() => {
    return parsePrice(finalTotal).toLocaleString("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, [finalTotal]);

  const originalTotalFormatted = parsePrice(total).toLocaleString("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const shippingFormatted = shippingCost.toLocaleString("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleApplyCoupon = async () => {
    try {
      const coupon = await applyCoupon(couponCode);
      setDiscountPercent(coupon.discountPercent);
      toast.success("Áp dụng mã giảm giá thành công!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Mã giảm giá không hợp lệ";
      setDiscountPercent(0);
      toast.error(message);
    }
  };

  const isShippingComplete = formData.fullName && formData.phone && formData.email && formData.address;
  const isPaymentComplete = cardData.cardName && cardData.cardNumber && cardData.expiry && cardData.cvv;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống.");
      router.push("/products");
      return;
    }
    if (!isShippingComplete) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng");
      return;
    }
    if (paymentMethod === "card" && !isPaymentComplete) {
      toast.error("Vui lòng điền đầy đủ thông tin thẻ thanh toán");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitOrder({
        customer: formData,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          size: item.size,
        })),
        paymentMethod,
        shippingMethod,
        couponCode,
      });

      // Create full order history item with all details
      const orderHistoryItem = {
        id: result.order.id,
        createdAt: result.order.createdAt,
        total: finalTotal,
        status: result.order.status,
        paymentMethod,
        shippingMethod,
        couponCode: couponCode || null,
        discountPercent,
        shippingCost,
        subtotal: total,
        discountAmount,
        customer: formData,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          size: item.size,
          quantity: item.quantity,
          unitPrice: parsePrice(item.product.price),
          lineTotal: parsePrice(item.product.price) * item.quantity,
        })),
      };

      saveOrderHistory(orderHistoryItem);
      toast.success(`Đặt hàng thành công! Mã đơn: ${result.order.id}`);
      clearCart();
      router.push("/order");router.push("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể đặt hàng";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="container py-6 sm:py-10 max-w-7xl">
          <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

          {cartItems.length === 0 ? (
            <div className="mt-8 rounded-xl border bg-card p-6 text-center">
              <p className="text-muted-foreground">Giỏ hàng của bạn đang trống.</p>
              <Button asChild className="mt-4">
                <Link href="/products">Tiếp tục mua sắm</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Checkout Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6" id="checkoutForm">
                {/* Shipping Information */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">Thông tin giao hàng</h2>
                    </div>
                    {isShippingComplete && editingSection !== "shipping" && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </div>

                  {editingSection !== "shipping" && isShippingComplete ? (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-start">
                        <div className="text-sm space-y-1">
                          <p className="font-medium">{formData.fullName}</p>
                          <p className="text-muted-foreground">{formData.phone}</p>
                          <p className="text-muted-foreground">{formData.email}</p>
                          <p className="text-muted-foreground">{formData.address}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingSection("shipping")}
                          className="gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Chỉnh sửa
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Họ và tên *</Label>
                          <Input
                            id="fullName"
                            required
                            placeholder="Nguyễn Văn A"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Số điện thoại *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            placeholder="0123456789"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                        <Textarea
                          id="address"
                          required
                          placeholder="Số nhà, đường, phường, quận, thành phố"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="note">Ghi chú (tùy chọn)</Label>
                        <Textarea
                          id="note"
                          placeholder="Ghi chú thêm cho cửa hàng..."
                          value={formData.note}
                          onChange={(e) =>
                            setFormData({ ...formData, note: e.target.value })
                          }
                        />
                      </div>
                      {editingSection === "shipping" && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditingSection(null)}
                        >
                          Hoàn thành
                        </Button>
                      )}
                    </div>
                  )}
                </Card>

                {/* Shipping Method */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    Phương thức vận chuyển
                  </h2>
                  <div className="space-y-3">
                    {[
                      { id: "standard", label: "Giao hàng tiêu chuẩn", time: "3-5 ngày", cost: "Miễn phí" },
                      { id: "fast", label: "Giao hàng nhanh", time: "1-2 ngày", cost: "25.000 đ" },
                      { id: "express", label: "Giao hàng siêu tốc", time: "Cùng ngày", cost: "50.000 đ" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition"
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={shippingMethod === method.id}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div className="ml-3 flex-1">
                          <p className="font-medium">{method.label}</p>
                          <p className="text-sm text-muted-foreground">{method.time}</p>
                        </div>
                        <span className="font-semibold">{method.cost}</span>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>
                  </div>
                  <div className="space-y-3 mb-4">
                    {[
                      { id: "card", label: "Thẻ tín dụng / Thẻ ghi nợ" },
                      { id: "cod", label: "Thanh toán khi nhận hàng (COD)" },
                      { id: "bank", label: "Chuyển khoản ngân hàng" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition"
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 font-medium">{method.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Tên trên thẻ *</Label>
                        <Input
                          id="cardName"
                          placeholder="NGUYEN VAN A"
                          value={cardData.cardName}
                          onChange={(e) =>
                            setCardData({ ...cardData, cardName: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Số thẻ *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={cardData.cardNumber}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\s/g, "");
                            value = value.replace(/(\d{4})/g, "$1 ").trim();
                            setCardData({ ...cardData, cardNumber: value });
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">HSD (MM/YY) *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="12/25"
                            maxLength={5}
                            value={cardData.expiry}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "");
                              if (value.length >= 2) {
                                value = value.slice(0, 2) + "/" + value.slice(2, 4);
                              }
                              setCardData({ ...cardData, expiry: value });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                          maxLength={3}
                            type="password"
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData({ ...cardData, cvv: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </form>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-20">
                  <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                  
                  {/* Items */}
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}`}
                        className="flex justify-between text-sm py-2 border-b"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Size {item.size} x {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">
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
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                    <Label className="text-xs mb-2 block">Mã giảm giá</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nhập mã"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="text-sm"
                      />
                      <Button
                        type="button"
                        onClick={handleApplyCoupon}
                        size="sm"
                        variant="outline"
                      >
                        Áp dụng
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Mã: WELCOME20 (20%) hoặc WELCOME10 (10%)
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 py-4 border-y">
                    <div className="flex justify-between text-sm">
                      <span>Tạm tính</span>
                      <span>{originalTotalFormatted} đ</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-sm text-red-600">
                        <span>Giảm giá ({discountPercent}%)</span>
                        <span>-{(discountAmount).toLocaleString("vi-VN", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })} đ</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Vận chuyển</span>
                      <span>{shippingFormatted} đ</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-4 mb-4">
                    <span className="font-semibold">Tổng cộng</span>
                    <span className="text-2xl font-bold text-primary">{totalFormatted} đ</span>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    form="checkoutForm"
                    className="w-full h-12 text-base"
                    disabled={!isShippingComplete || isSubmitting}
                  >
                    {isSubmitting ? "Đang xử lý..." : "Hoàn thành đơn hàng"}
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link href="/cart">Quay lại giỏ hàng</Link>
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
