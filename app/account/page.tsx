"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useWishlist } from "@/hooks/use-wishlist";
import { useOrderHistory } from "@/hooks/use-order-history";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Camera, LogOut, Edit2, Check, Heart, Package } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser, logout } = useAuth();
  const { wishlist, count: wishlistCount } = useWishlist();
  const { history } = useOrderHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    district: user?.district || "",
    ward: user?.ward || "",
    postalCode: user?.postalCode || "",
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-[#FCFBF8] flex items-center justify-center">
          <div className="container py-6 sm:py-10">
            <Card className="p-8 text-center max-w-md mx-auto border-[#E6DFD7] bg-white shadow-sm hover:shadow-md transition-shadow">
              <User className="w-16 h-16 mx-auto text-[#9D8878] mb-4" />
              <h2 className="text-2xl font-semibold mb-2 text-[#4A3F35]">Chưa đăng nhập</h2>
              <p className="text-[#736357] mb-6 text-sm leading-relaxed">
                Vui lòng đăng nhập để xem thông tin tài khoản của bạn
              </p>
              <Button asChild className="w-full bg-[#4A3F35] hover:bg-[#362E26] text-white transition-colors">
                <Link href="/">Về trang chủ</Link>
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
    toast.success("Cập nhật thông tin thành công!");
  };

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất!");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF8]">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8 sm:py-12 max-w-6xl">
          <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
            {/* Cột trái: Thông tin tổng quan */}
            <div className="space-y-6">
              <Card className="overflow-hidden border-[#E6DFD7] shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="bg-[#F0EBE1] px-6 py-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl font-semibold text-[#9D8878] shadow-sm border border-[#E6DFD7]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#736357] font-medium">Xin chào</p>
                      <h2 className="text-2xl font-semibold mt-1 text-[#4A3F35]">{user.name}</h2>
                      <p className="mt-1 text-sm text-[#736357]">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-6">
                  <div className="rounded-xl bg-[#FAF8F5] p-4 border border-[#E6DFD7] transition-colors">
                    <div className="flex items-center gap-3 text-sm text-[#4A3F35]">
                      <Mail className="h-4 w-4 text-[#9D8878]" />
                      <span className="font-medium">{user.email}</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F5] p-4 border border-[#E6DFD7] transition-colors">
                    <div className="flex items-center gap-3 text-sm text-[#4A3F35]">
                      <Phone className="h-4 w-4 text-[#9D8878]" />
                      <span className="font-medium">{user.phone || "Chưa cập nhật số điện thoại"}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                    <button
                      type="button"
                      className="rounded-xl border border-[#E6DFD7] bg-white px-4 py-3 text-left hover:bg-[#F5F2EA] transition-all"
                      onClick={() => router.push("/wishlist")}
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-[#C48B81]" />
                        <div>
                          <p className="text-xs text-[#736357] font-medium uppercase tracking-wide">Yêu thích</p>
                          <p className="text-xl font-semibold text-[#4A3F35] mt-1">{wishlistCount}</p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-[#E6DFD7] bg-white px-4 py-3 text-left hover:bg-[#F5F2EA] transition-all"
                      onClick={() => router.push("/order")}
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-[#9D8878]" />
                        <div>
                          <p className="text-xs text-[#736357] font-medium uppercase tracking-wide">Đơn hàng</p>
                          <p className="text-xl font-semibold text-[#4A3F35] mt-1">{history.length}</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 pt-4">
                    <Button onClick={handleLogout} variant="outline" className="w-full border-[#E6DFD7] text-[#736357] hover:bg-[#F0EBE1] hover:text-[#4A3F35]">
                      <LogOut className="h-4 w-4 mr-2" />
                      Đăng xuất
                    </Button>
                    <Button asChild className="w-full bg-[#9D8878] hover:bg-[#8B7869] text-white transition-colors">
                      <Link href="/cart">Tiếp tục mua sắm</Link>
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden border-[#E6DFD7] shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="bg-[#F0EBE1] px-6 py-5">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-[#9D8878]" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#736357] font-medium">Giới thiệu</p>
                      <h3 className="text-base font-semibold mt-0.5 text-[#4A3F35]">Dịch vụ khách hàng</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-[#736357] leading-relaxed">
                    Bạn có thể cập nhật thông tin cá nhân, địa chỉ và truy cập nhanh đến các trang đơn hàng và sản phẩm yêu thích.
                  </p>
                  <ul className="space-y-2 text-sm text-[#736357]">
                    <li className="flex items-center gap-3">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#9D8878]" />
                      <span>Hỗ trợ giao hàng trên toàn quốc</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#9D8878]" />
                      <span>Quản lý đơn hàng và địa chỉ dễ dàng</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Cột phải: Chi tiết thông tin */}
            <div className="space-y-6">
              <Card className="overflow-hidden border-[#E6DFD7] shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="flex items-center justify-between gap-4 bg-[#F0EBE1] px-6 py-5">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-[#9D8878]" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#736357] font-medium">Thông tin</p>
                      <h3 className="text-base font-semibold mt-0.5 text-[#4A3F35]">Thông tin cá nhân</h3>
                    </div>
                  </div>
                  {!isEditing && (
                    <Button
                      type="button"
                      size="sm"
                      className="gap-2 bg-white text-[#736357] hover:bg-[#FAF8F5] border border-[#E6DFD7] transition-colors"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      Chỉnh sửa
                    </Button>
                  )}
                </div>

                <div className="p-6 space-y-5">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-[#4A3F35] font-medium">Họ và tên *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Nguyễn Văn A"
                            className="border-[#E6DFD7] rounded-lg focus:border-[#9D8878] focus-visible:ring-[#9D8878] bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-[#4A3F35] font-medium">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="example@email.com"
                            className="border-[#E6DFD7] rounded-lg focus:border-[#9D8878] focus-visible:ring-[#9D8878] bg-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#4A3F35] font-medium">Số điện thoại</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0123456789"
                          className="border-[#E6DFD7] rounded-lg focus:border-[#9D8878] focus-visible:ring-[#9D8878] bg-white"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 pt-2">
                        <Button type="submit" className="gap-2 w-full bg-[#9D8878] hover:bg-[#8B7869] text-white transition-colors">
                          <Check className="h-4 w-4" />
                          Lưu thay đổi
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-[#E6DFD7] text-[#736357] hover:bg-[#F0EBE1]"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: user.name || "",
                              email: user.email || "",
                              phone: user.phone || "",
                              address: user.address || "",
                              city: user.city || "",
                              district: user.district || "",
                              ward: user.ward || "",
                              postalCode: user.postalCode || "",
                            });
                          }}
                        >
                          Hủy
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl bg-[#FAF8F5] p-5 border border-[#E6DFD7]">
                        <p className="text-xs uppercase tracking-wide text-[#736357] font-medium">Họ và tên</p>
                        <p className="mt-2 text-base font-medium text-[#4A3F35]">{formData.name}</p>
                      </div>
                      <div className="rounded-xl bg-[#FAF8F5] p-5 border border-[#E6DFD7]">
                        <p className="text-xs uppercase tracking-wide text-[#736357] font-medium">Email</p>
                        <p className="mt-2 text-base font-medium text-[#4A3F35]">{formData.email}</p>
                      </div>
                      <div className="sm:col-span-2 rounded-xl bg-[#FAF8F5] p-5 border border-[#E6DFD7]">
                        <p className="text-xs uppercase tracking-wide text-[#736357] font-medium">Số điện thoại</p>
                        <p className="mt-2 text-base font-medium text-[#4A3F35]">{formData.phone || "Chưa cập nhật"}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="overflow-hidden border-[#E6DFD7] shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="flex items-center gap-3 bg-[#F0EBE1] px-6 py-5">
                  <MapPin className="h-5 w-5 text-[#9D8878]" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#736357] font-medium">Giao hàng</p>
                    <h3 className="text-base font-semibold mt-0.5 text-[#4A3F35]">Địa chỉ mặc định</h3>
                  </div>
                </div>
                <div className="p-6">
                  {formData.address || formData.ward || formData.district || formData.city ? (
                    <div className="space-y-3 rounded-xl bg-[#FAF8F5] p-5 border border-[#E6DFD7]">
                      {formData.address && <p className="text-base font-medium text-[#4A3F35]">{formData.address}</p>}
                      <p className="text-sm text-[#736357] leading-relaxed">
                        {[formData.ward, formData.district, formData.city, formData.postalCode]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-[#FAF8F5] p-5 border border-[#E6DFD7] text-sm text-[#736357] text-center">
                      Bạn chưa thiết lập địa chỉ giao hàng nào.
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}