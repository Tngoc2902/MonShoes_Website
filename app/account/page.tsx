"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Camera, LogOut, Edit2, Check } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser, logout } = useAuth();
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
        <main className="flex-1 bg-slate-50 flex items-center justify-center">
          <div className="container py-6 sm:py-10">
            <Card className="p-8 text-center max-w-md mx-auto">
              <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Chưa đăng nhập</h2>
              <p className="text-muted-foreground mb-6">
                Vui lòng đăng nhập để xem thông tin tài khoản của bạn
              </p>
              <Button asChild className="w-full">
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="container py-6 sm:py-10 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tài khoản của tôi</h1>
            <p className="text-muted-foreground">Quản lý thông tin cá nhân và địa chỉ giao hàng</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white border-2 border-primary rounded-full p-2 hover:bg-slate-50 transition">
                    <Camera className="w-4 h-4 text-primary" />
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-6">{user.email}</p>
                
                <div className="space-y-2 mb-6 text-left">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{user.phone}</span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full gap-2 mb-3"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/cart">Quay lại mua sắm</Link>
                </Button>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6 mt-4">
                <h3 className="font-semibold mb-4">Thống kê</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Đơn hàng</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tổng chi tiêu</span>
                    <span className="font-semibold">0 đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Thành viên từ</span>
                    <span className="font-semibold text-sm">Hôm nay</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Personal Information */}
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Thông tin cá nhân</h2>
                  </div>
                  {!isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Chỉnh sửa
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="0123456789"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="gap-2">
                        <Check className="w-4 h-4" />
                        Lưu thay đổi
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
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
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Họ và tên</p>
                        <p className="font-medium">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                    </div>
                    {formData.phone && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Số điện thoại</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                    )}
                  </div>
                )}
              </Card>

              {/* Delivery Address */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Địa chỉ giao hàng</h2>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ cụ thể</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="Số nhà, tên đường..."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ward">Phường/Xã</Label>
                        <Input
                          id="ward"
                          value={formData.ward}
                          onChange={(e) =>
                            setFormData({ ...formData, ward: e.target.value })
                          }
                          placeholder="Phường/Xã"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">Quận/Huyện</Label>
                        <Input
                          id="district"
                          value={formData.district}
                          onChange={(e) =>
                            setFormData({ ...formData, district: e.target.value })
                          }
                          placeholder="Quận/Huyện"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Thành phố/Tỉnh</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          placeholder="Thành phố/Tỉnh"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Mã bưu chính</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) =>
                            setFormData({ ...formData, postalCode: e.target.value })
                          }
                          placeholder="Mã bưu chính"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {formData.address || formData.ward || formData.district ? (
                      <div className="space-y-2">
                        {formData.address && <p className="font-medium">{formData.address}</p>}
                        <p className="text-sm text-muted-foreground">
                          {[formData.ward, formData.district, formData.city, formData.postalCode]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Chưa thêm địa chỉ giao hàng</p>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
