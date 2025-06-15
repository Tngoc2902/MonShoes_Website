"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const {
    getCartItems,
    getCartTotal,
    clearCart,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const [activeTab, setActiveTab] = useState("cart");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  // State cho xác nhận xóa sản phẩm
  const [deleteItem, setDeleteItem] = useState<null | { product: any }>(null);

  // Hàm chuyển giá về số nếu là string
  const parsePrice = (price: any) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
    return 0;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    toast.success("Đặt hàng thành công!");
    clearCart();
    onClose();
  };

  const cartItems = getCartItems();
  const total = getCartTotal();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Giỏ hàng</DialogTitle>
          </DialogHeader>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cart">Giỏ hàng</TabsTrigger>
              <TabsTrigger value="checkout">Thanh toán</TabsTrigger>
            </TabsList>
            <TabsContent value="cart" className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Giỏ hàng của bạn đang trống
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteItem(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Size: {item.size}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
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
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Tổng cộng</span>
                      <span>
                        {parsePrice(total).toLocaleString("vi-VN", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                        đ
                      </span>
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={() => setActiveTab("checkout")}
                    >
                      Tiến hành thanh toán
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="checkout" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">Thông tin giao hàng</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                </form>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Đơn hàng của bạn</h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product.name} - Size {item.size} x {item.quantity}
                      </span>
                      <span>
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
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Tổng cộng</span>
                    <span>
                      {parsePrice(total).toLocaleString("vi-VN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                      đ
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setActiveTab("cart")}
                >
                  Quay lại giỏ hàng
                </Button>
                <Button size="lg" className="flex-1" onClick={handleSubmit}>
                  Thanh toán
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      {/* Modal xác nhận xóa sản phẩm */}
      <Dialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
          </DialogHeader>
          <div>
            Bạn có chắc chắn muốn xóa sản phẩm{" "}
            <b>{deleteItem?.product?.name}</b> khỏi giỏ hàng không?
          </div>
          <DialogFooter className="mt-4 flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setDeleteItem(null)}>
              Không
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteItem) {
                  removeFromCart(deleteItem.product.id);
                  setDeleteItem(null);
                }
              }}
            >
              Có
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
