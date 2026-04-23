"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Đăng nhập thành công!");
    router.push("/");
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);

    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Đăng ký thành công!");
    router.push("/");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Chào mừng đến với MONSHOES</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                  <TabsTrigger value="register">Đăng ký</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password">Mật khẩu</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="register-name">Họ và tên</Label>
                      <Input
                        id="register-name"
                        placeholder="Nhập họ và tên"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Nhập email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="register-password">Mật khẩu</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="register-confirm-password">Xác nhận mật khẩu</Label>
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}