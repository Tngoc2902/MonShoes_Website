"use client";

import Footer from "@/components/footer";
import NavbarLogin from "@/components/navbar_login";
import Image from "next/image";
import { useState } from "react";

const orders = [
  {
    id: 1,
    name: "Nike Jordan 4 Black Wite / 38",
    price: "3.599.000 đ",
    quantity: 1,
    status: "Đang giao",
    statusColor: "bg-green-400",
    img: "https://supersports.com.vn/cdn/shop/files/39232801-1.jpg?v=1739271987&width=1000",
  },
  {
    id: 2,
    name: "Nike Jordan 4 Black Wite / 38",
    price: "3.599.000 đ",
    quantity: 1,
    status: "Hoàn thành",
    statusColor: "bg-blue-400",
    img: "https://supersports.com.vn/cdn/shop/files/39232801-1.jpg?v=1739271987&width=1600",
  },
  {
    id: 3,
    name: "Nike Jordan 4 Black Wite / 38",
    price: "3.599.000 đ",
    quantity: 1,
    status: "Đơn huỷ",
    statusColor: "bg-yellow-300 text-black",
    img: "https://supersports.com.vn/cdn/shop/files/39232801-1.jpg?v=1739271987&width=1600",
  },
  // Thêm nhiều đơn hàng để test phân trang
  {
    id: 4,
    name: "Nike Air Max 97 / 40",
    price: "4.200.000 đ",
    quantity: 2,
    status: "Đang giao",
    statusColor: "bg-green-400",
    img: "https://supersports.com.vn/cdn/shop/files/39232801-1.jpg?v=1739271987&width=1600",
  },
  {
    id: 5,
    name: "Adidas Ultraboost / 42",
    price: "3.900.000 đ",
    quantity: 1,
    status: "Hoàn thành",
    statusColor: "bg-blue-400",
    img: "https://supersports.com.vn/cdn/shop/files/39232801-1.jpg?v=1739271987&width=1600",
  },
  {
    id: 6,
    name: "Nike Air Force 1 / 39",
    price: "2.800.000 đ",
    quantity: 1,
    status: "Đơn huỷ",
    statusColor: "bg-yellow-300 text-black",
    img: "https://supersports.com.vn/cdn/shop/files/39232801-1.jpg?v=1739271987&width=1600",
  },
];

const ORDERS_PER_PAGE = 5;

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (page - 1) * ORDERS_PER_PAGE,
    page * ORDERS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarLogin />
      <main className="flex-grow bg-[#fafafa] py-6">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Đơn hàng</h2>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full text-base">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Ảnh sản phẩm</th>
                  <th className="p-3 text-left">Thông tin</th>
                  <th className="p-3 text-left">Thành tiền</th>
                  <th className="p-3 text-left">Số lượng</th>
                  <th className="p-3 text-left">Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-b-0">
                    <td className="p-3">
                      <Image
                        src={order.img}
                        alt={order.name}
                        width={200}
                        height={200}
                        className="rounded object-cover"
                      />
                    </td>
                    <td className="p-3">{order.name}</td>
                    <td className="p-3 font-semibold text-primary">
                      {order.price}
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={order.quantity}
                        readOnly
                        className="w-14 text-center border rounded py-1"
                      />
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-4 py-2 rounded-xl text-white font-semibold ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 p-4">
              <button
                className="w-8 h-8 rounded border text-gray-600 hover:bg-gray-100"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                {"<"}
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`w-8 h-8 rounded border ${
                    page === i + 1
                      ? "bg-primary text-white border-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="w-8 h-8 rounded border text-gray-600 hover:bg-gray-100"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
