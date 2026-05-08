"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useOrderHistory } from "@/hooks/use-order-history";
import { useAuth } from "@/contexts/auth-context";
import { ArrowRight, CalendarDays, Package, Repeat, CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import Link from "next/link";

export default function OrderHistoryPage() {
  const { history, total, removeOrder } = useOrderHistory();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleReorder = (orderId: string) => {
    const order = history.find((item) => item.id === orderId);
    if (!order) return;
    order.items.forEach((item) => {
      addToCart(String(item.productId), item.size);
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Chờ xử lý
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            <Package className="w-3 h-3 mr-1" />
            Đang xử lý
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
            <Truck className="w-3 h-3 mr-1" />
            Đã giao hàng
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Đã nhận hàng
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Đã hủy
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-10">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Lịch sử đơn hàng</h1>
              <p className="text-muted-foreground">
                {isAuthenticated
                  ? `Bạn có ${total} đơn hàng đã lưu.`
                  : "Vui lòng đăng nhập để xem lịch sử đơn hàng."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products">
                <Button variant="outline">Tiếp tục mua sắm</Button>
              </Link>
              <Link href="/wishlist">
                <Button>Danh sách yêu thích</Button>
              </Link>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="rounded-xl border bg-card p-10 text-center">
              <p className="text-lg font-medium">Bạn cần đăng nhập để xem đơn hàng.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Đăng nhập ngay để quản lý đơn hàng và mua lại nhanh.
              </p>
            </div>
          ) : history.length === 0 ? (
            <div className="rounded-xl border bg-card p-10 text-center">
              <p className="text-lg font-medium">Chưa có đơn hàng nào.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Hoàn tất đơn hàng đầu tiên để xem lịch sử ở đây.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {history.map((order) => (
                <div key={order.id} className="rounded-3xl border bg-white shadow-sm p-6">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span>{new Date(order.createdAt).toLocaleString("vi-VN")}</span>
                        <span>•</span>
                        <span>Mã đơn: {order.id}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        <span className="text-sm text-muted-foreground">
                          Thanh toán: {order.paymentMethod === "card" ? "Thẻ tín dụng" : order.paymentMethod === "cod" ? "COD" : order.paymentMethod}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReorder(order.id)}
                      >
                        <Repeat className="mr-2 h-4 w-4" />
                        Mua lại
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOrder(order.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={`${order.id}-${item.productId}-${item.size}`} className="rounded-2xl border p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="font-semibold">{item.name}</div>
                              <div className="text-sm text-muted-foreground">Size {item.size} • Số lượng: {item.quantity}</div>
                            </div>
                            <div className="text-right text-sm">
                              <div className="font-semibold">{item.lineTotal.toLocaleString("vi-VN")} đ</div>
                              <div className="text-muted-foreground">{item.unitPrice.toLocaleString("vi-VN")} đ / chiếc</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-3xl border bg-slate-50 p-5 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="h-4 w-4" />
                        <span>Tóm tắt đơn hàng</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tạm tính</span>
                        <span>{order.subtotal.toLocaleString("vi-VN")} đ</span>
                      </div>
                      {order.discountAmount > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>Giảm giá ({order.discountPercent}%)</span>
                          <span>-{order.discountAmount.toLocaleString("vi-VN")} đ</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Phí vận chuyển</span>
                        <span>{order.shippingCost.toLocaleString("vi-VN")} đ</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-semibold">
                        <span>Tổng</span>
                        <span>{order.total.toLocaleString("vi-VN")} đ</span>
                      </div>
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
