"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useOrderHistory } from "@/hooks/use-order-history";
import { useWishlist } from "@/hooks/use-wishlist";
import { useAuth } from "@/contexts/auth-context";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Package,
  ShoppingCart,
  CalendarDays,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  ArrowRight
} from "lucide-react";

export default function DashboardPage() {
  const { history, total: orderCount } = useOrderHistory();
  const { wishlist, count: wishlistCount, removeWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(String(product.id))
  ).slice(0, 3); // Show only first 3

  const recentOrders = history.slice(0, 3); // Show only recent 3 orders

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-background py-10">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground mb-6">Vui lòng đăng nhập để xem dashboard của bạn.</p>
            <Link href="/login">
              <Button>Đăng nhập</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-10">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Quản lý sản phẩm yêu thích và đơn hàng của bạn</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{wishlistCount}</p>
                  <p className="text-sm text-muted-foreground">Sản phẩm yêu thích</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{orderCount}</p>
                  <p className="text-sm text-muted-foreground">Tổng đơn hàng</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {history.filter(order => order.status.toLowerCase() === 'delivered').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Đơn hàng hoàn thành</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Wishlist Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-semibold">Sản phẩm yêu thích</h2>
                </div>
                <Link href="/wishlist">
                  <Button variant="outline" size="sm">
                    Xem tất cả
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-muted-foreground">Chưa có sản phẩm yêu thích</p>
                  <Link href="/products">
                    <Button className="mt-4">Khám phá sản phẩm</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg border">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded-md object-contain"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <p className="text-primary font-semibold text-sm">{product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => addToCart(String(product.id), product.sizes?.[0] ?? "")}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeWishlist(String(product.id))}
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Orders Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold">Đơn hàng gần đây</h2>
                </div>
                <Link href="/order">
                  <Button variant="outline" size="sm">
                    Xem tất cả
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-muted-foreground">Chưa có đơn hàng nào</p>
                  <Link href="/products">
                    <Button className="mt-4">Mua sắm ngay</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">#{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <CalendarDays className="w-3 h-3" />
                        <span>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {order.items.length} sản phẩm
                        </span>
                        <span className="font-semibold">{order.total.toLocaleString("vi-VN")} đ</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}