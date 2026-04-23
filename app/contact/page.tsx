"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Tin nhắn đã được gửi thành công!");
    setForm({
      name: "",
      phone: "",
      email: "",
      topic: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua
              các kênh sau hoặc gửi tin nhắn trực tiếp.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Địa chỉ</h3>
                      <p className="text-muted-foreground">
                        Hiền Giang, Thường Tín, Hà Nội
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Điện thoại</h3>
                      <p className="text-muted-foreground">+84 123 456 789</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">info@monshoes.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Giờ làm việc</h3>
                      <p className="text-muted-foreground">
                        Thứ 2 - Chủ nhật: 8:00 - 22:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Gửi tin nhắn</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input
                          id="name"
                          placeholder="Nhập họ và tên"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Nhập số điện thoại"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Nhập email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="topic">Chủ đề</Label>
                      <Input
                        id="topic"
                        placeholder="Nhập chủ đề"
                        value={form.topic}
                        onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Tin nhắn</Label>
                      <Textarea
                        id="message"
                        placeholder="Nhập tin nhắn của bạn"
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Đang gửi..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Gửi tin nhắn
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map or Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Hỗ trợ khách hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Thời gian phản hồi</span>
                      <span className="text-sm font-medium">Trong 24h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hỗ trợ kỹ thuật</span>
                      <span className="text-sm font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Đổi trả hàng</span>
                      <span className="text-sm font-medium">30 ngày</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Câu hỏi thường gặp</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <details className="group">
                      <summary className="cursor-pointer font-medium text-sm hover:text-primary transition-colors">
                        Chính sách đổi trả như thế nào?
                      </summary>
                      <p className="text-sm text-muted-foreground mt-2 pl-4">
                        Chúng tôi chấp nhận đổi trả trong vòng 30 ngày với sản
                        phẩm còn nguyên tem mác và hóa đơn.
                      </p>
                    </details>

                    <details className="group">
                      <summary className="cursor-pointer font-medium text-sm hover:text-primary transition-colors">
                        Thời gian giao hàng bao lâu?
                      </summary>
                      <p className="text-sm text-muted-foreground mt-2 pl-4">
                        Giao hàng trong 2-5 ngày làm việc tùy khu vực. Miễn phí
                        giao hàng cho đơn hàng từ 1 triệu đồng.
                      </p>
                    </details>

                    <details className="group">
                      <summary className="cursor-pointer font-medium text-sm hover:text-primary transition-colors">
                        Có thể thanh toán như thế nào?
                      </summary>
                      <p className="text-sm text-muted-foreground mt-2 pl-4">
                        Chấp nhận thanh toán COD, chuyển khoản ngân hàng, và
                        thẻ tín dụng/thẻ ghi nợ.
                      </p>
                    </details>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
