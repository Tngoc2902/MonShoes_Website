"use client";

import Footer from "@/components/footer";
import NavbarLogin from "@/components/navbar_login";
import Image from "next/image";
import { useEffect, useState } from "react";
const shoes = [
  {
    id: 1,
    name: "Mizuno Speed 2K | D1GH222915",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-50.jpg?v=1743558375250",
  },
  {
    id: 2,
    name: 'Mizuno Speed 2K "Black Silver"',
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-50.jpg?v=1743558375250",
  },
  {
    id: 3,
    name: "Mizuno Speed 2K ‘White Silver’",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-50.jpg?v=1743558375250",
  },
  {
    id: 4,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 5,
    name: "Nike Air Max 97 OG Silver Bullet",
    price: "5.990.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 6,
    name: "Adidas Ultraboost 21 Triple Black",
    price: "4.200.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 7,
    name: "Nike Air Force 1 '07 White",
    price: "2.800.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 8,
    name: "Converse Chuck 70 High Top",
    price: "1.900.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 9,
    name: "Vans Old Skool Black White",
    price: "1.600.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 10,
    name: "New Balance 530 White Silver",
    price: "2.500.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 11,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 12,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 13,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 14,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 15,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 16,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 17,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 18,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
  {
    id: 19,
    name: "Mizuno Cyclone Speed 2 K...",
    price: "1.499.000đ",
    img: "//bizweb.dktcdn.net/thumb/large/100/526/435/products/web-photo-editor-49.jpg?v=1743558291143",
  },
];

const priceFilters = [
  { label: "Dưới 1.000.000đ", value: "1" },
  { label: "1.000.000đ-3.000.000đ", value: "2" },
  { label: "3.000.000đ-5.000.000đ", value: "3" },
  { label: "5.000.000đ-8.000.000đ", value: "4" },
  { label: "Trên 10.000.000đ", value: "5" },
];

const SHOES_PER_PAGE = 12;

export default function OrderShoesPage() {
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  // Lọc giá (demo, thực tế bạn cần xử lý theo giá trị thực)
  function filterShoes(shoe: { price: string }) {
    if (selectedPrices.length === 0) return true;
    const price = Number(shoe.price.replace(/\D/g, ""));
    return (
      (selectedPrices.includes("1") && price < 1000000) ||
      (selectedPrices.includes("2") && price >= 1000000 && price < 3000000) ||
      (selectedPrices.includes("3") && price >= 3000000 && price < 5000000) ||
      (selectedPrices.includes("4") && price >= 5000000 && price < 10000000) ||
      (selectedPrices.includes("5") && price >= 10000000)
    );
  }

  // Sắp xếp (demo)
  const filteredShoes = shoes.filter(filterShoes);
  const sortedShoes = [...filteredShoes].sort((a, b) => {
    if (sort === "asc")
      return (
        Number(a.price.replace(/\D/g, "")) - Number(b.price.replace(/\D/g, ""))
      );
    if (sort === "desc")
      return (
        Number(b.price.replace(/\D/g, "")) - Number(a.price.replace(/\D/g, ""))
      );
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedShoes.length / SHOES_PER_PAGE);
  const paginatedShoes = sortedShoes.slice(
    (page - 1) * SHOES_PER_PAGE,
    page * SHOES_PER_PAGE
  );

  // Reset page về 1 khi filter/sort thay đổi
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPage(1), [selectedPrices, sort]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-200">
      <NavbarLogin />
      <main className="flex-grow py-8">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-base mb-6 text-gray-500">
            <span className="font-semibold text-black">Trang chủ</span>
            <span className="mx-1">{">"}</span>
            <span className="font-semibold text-primary">Giày order</span>
          </div>
          <div className="flex gap-8">
            {/* Sidebar filter */}
            <aside className="w-64 shrink-0 hidden md:block">
              <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <div className="font-bold text-lg mb-4">Giá sản phẩm</div>
                <div className="flex flex-col gap-3">
                  {priceFilters.map((filter) => (
                    <label
                      key={filter.value}
                      className="flex items-center gap-2 cursor-pointer min-h-[36px]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPrices.includes(filter.value)}
                        onChange={() => {
                          setSelectedPrices((prev) =>
                            prev.includes(filter.value)
                              ? prev.filter((v) => v !== filter.value)
                              : [...prev, filter.value]
                          );
                        }}
                        className="accent-primary w-5 h-5"
                      />
                      <span className="text-base min-w-[180px]">
                        {filter.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>
            {/* Main content */}
            <section className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="text-xl font-bold text-primary">Sneaker</div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium">Sắp xếp theo</span>
                  <select
                    className="border rounded px-3 py-1 focus:outline-primary"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="default">Mặc định</option>
                    <option value="asc">Giá tăng dần</option>
                    <option value="desc">Giá giảm dần</option>
                  </select>
                </div>
              </div>
              {/* Grid sản phẩm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedShoes.map((shoe) => (
                  <div
                    key={shoe.id}
                    className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 flex flex-col items-center relative"
                  >
                    <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-primary/10 transition">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-400"
                      >
                        <path d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0l.318.318.318-.318a4.5 4.5 0 1 1 6.364 6.364l-6.682 6.682a1 1 0 0 1-1.414 0L4.318 12.682a4.5 4.5 0 0 1 0-6.364z" />
                      </svg>
                    </button>
                    <div className="w-full flex-1 flex items-center justify-center mb-4">
                      <Image
                        src={shoe.img}
                        alt={shoe.name}
                        width={220}
                        height={110}
                        className="object-contain max-h-40"
                      />
                    </div>
                    <div className="w-full text-center mt-auto">
                      <div className="font-bold text-lg truncate">
                        {shoe.name}
                      </div>
                      <div className="text-primary font-bold text-xl mt-2">
                        {shoe.price}
                      </div>
                    </div>
                  </div>
                ))}
                {paginatedShoes.length === 0 && (
                  <div className="col-span-full text-center text-gray-400 py-12">
                    Không có sản phẩm phù hợp.
                  </div>
                )}
              </div>
              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  className="w-9 h-9 rounded-full border text-gray-600 hover:bg-primary/10 transition disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  {"<"}
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`w-9 h-9 rounded-full border font-semibold ${
                      page === i + 1
                        ? "bg-primary text-white border-primary shadow"
                        : "text-gray-700 hover:bg-primary/10"
                    }`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="w-9 h-9 rounded-full border text-gray-600 hover:bg-primary/10 transition disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  {">"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
