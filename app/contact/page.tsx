"use client";

import Footer from "@/components/footer";
import NavbarLogin from "@/components/navbar_login";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
  });

  return (
    <>
      <NavbarLogin />
      <div className="container mx-auto py-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Liên hệ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
          {/* Ảnh bên trái */}
          <div className="w-full h-80 md:h-full">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Hồ Gươm"
              className="object-cover w-full h-full rounded"
            />
          </div>
          {/* Form bên phải */}
          <form
            className="bg-white rounded p-6 flex flex-col gap-4 shadow"
            onSubmit={(e) => {
              e.preventDefault();
              // Xử lý gửi form ở đây
              alert("Đã gửi tin nhắn!");
            }}
          >
            <h3 className="text-lg font-semibold mb-2">
              Gửi tin nhắn cho chúng tôi
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Tên của bạn</label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full border rounded px-3 py-2 text-base bg-gray-80"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Số điện thoại</label>
                <input
                  type="tel"
                  placeholder="+84"
                  className="w-full border rounded px-3 py-2 text-base bg-gray-80"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="tngoc@gmail.com"
                  className="w-full border rounded px-3 py-2 text-base bg-gray-80"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Vấn đề</label>
                <select
                  className="w-full border rounded px-3 py-2 text-base bg-gray-80"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  required
                >
                  <option value="">Chọn vấn đề</option>
                  <option value="Muốn hoàn đơn">Muốn hoàn đơn</option>
                  <option value="Tư vấn sản phẩm">Tư vấn sản phẩm</option>
                  <option value="Khiếu nại">Khiếu nại</option>
                  <option value="Hỗ trợ bảo hành">Hỗ trợ bảo hành</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm">Nội dung chi tiết</label>
              <textarea
                placeholder="Xin chào , ....."
                className="w-full border rounded px-3 py-2 text-base bg-gray-80 min-h-[80px]"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-primary text-white px-8 py-2 rounded mt-2"
            >
              Gửi
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
