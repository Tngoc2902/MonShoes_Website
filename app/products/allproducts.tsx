"use client";

import Footer from "@/components/footer";
import NavbarLogin from "@/components/navbar_login";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PRODUCTS_PER_PAGE = 12;

function Pagination({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}) {
  let pages = [];
  if (totalPages <= 5) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (page <= 3) {
    pages = [1, 2, 3, 4, "...", totalPages];
  } else if (page >= totalPages - 2) {
    pages = [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pages = [1, "...", page - 1, page, page + 1, "...", totalPages];
  }

  return (
    <div className="flex items-center gap-1 text-lg">
      <button
        onClick={() => {
          setPage(1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === 1}
        className="w-10 h-10 flex items-center justify-center border rounded bg-white hover:bg-gray-100 text-gray-700 disabled:text-gray-300"
      >
        <ChevronsLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          setPage(page - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === 1}
        className="w-10 h-10 flex items-center justify-center border rounded bg-white hover:bg-gray-100 text-gray-700 disabled:text-gray-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {pages.map((p, idx) =>
        p === "..." ? (
          <span
            key={idx}
            className="w-10 h-10 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => {
              setPage(Number(p));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`w-10 h-10 flex items-center justify-center border rounded ${
              page === p
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 hover:bg-primary/10"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => {
          setPage(page + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === totalPages}
        className="w-10 h-10 flex items-center justify-center border rounded bg-white hover:bg-gray-100 text-gray-700 disabled:text-gray-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          setPage(totalPages);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === totalPages}
        className="w-10 h-10 flex items-center justify-center border rounded bg-white hover:bg-gray-100 text-gray-700 disabled:text-gray-300"
      >
        <ChevronsRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default function AllProducts() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("default");
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);

  // Lọc theo giá
  const filterByPrice = (product: { price: string }) => {
    if (priceFilter.length === 0) return true;
    const price = Number(product.price.replace(/\D/g, ""));
    return (
      (priceFilter.includes("1") && price < 1000000) ||
      (priceFilter.includes("2") && price >= 1000000 && price < 2000000) ||
      (priceFilter.includes("3") && price >= 2000000 && price < 5000000) ||
      (priceFilter.includes("4") && price >= 5000000)
    );
  };

  // Lọc theo hãng (dựa vào tên sản phẩm)
  const filterByBrand = (product: { name: string }) => {
    if (brandFilter.length === 0) return true;
    const name = product.name.toLowerCase();
    return brandFilter.some((brand) => name.includes(brand.toLowerCase()));
  };

  // Sắp xếp
  function sortProducts(a: { price: string }, b: { price: string }) {
    const priceA = Number(a.price.replace(/\D/g, ""));
    const priceB = Number(b.price.replace(/\D/g, ""));
    if (sort === "asc") return priceA - priceB;
    if (sort === "desc") return priceB - priceA;
    return 0;
  }

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = products
    .filter(filterByPrice)
    .filter(filterByBrand)
    .sort(sortProducts);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  // Xử lý chọn checkbox lọc giá
  const handlePriceChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setPage(1);
    setPriceFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Xử lý chọn checkbox lọc hãng
  const handleBrandChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setPage(1);
    setBrandFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <>
      <NavbarLogin />
      <div className="container mx-auto py-4 text-lg">
        {/* Breadcrumb */}
        <div className="text-base text-gray-500 mb-4">
          <Link href="/" className="hover:underline font-medium">
            Trang chủ
          </Link>
          <span className="mx-2">{">>"}</span>
          <span className="font-semibold text-primary">Tất cả sản phẩm</span>
        </div>
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-72 shrink-0 hidden lg:block">
            <div className="bg-gray-100 border rounded p-5 mb-5">
              <h2 className="font-bold text-lg mb-4">Giá thành</h2>
              <input
                className="w-full mb-3 px-3 py-2 border rounded text-base bg-white"
                placeholder="Tìm nhanh..."
                disabled
              />
              <ul className="space-y-2 text-base">
                <li>
                  <input
                    type="checkbox"
                    id="price1"
                    className="accent-primary"
                    value="1"
                    checked={priceFilter.includes("1")}
                    onChange={handlePriceChange}
                  />{" "}
                  <label htmlFor="price1">Dưới 1.000.000đ</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="price2"
                    className="accent-primary"
                    value="2"
                    checked={priceFilter.includes("2")}
                    onChange={handlePriceChange}
                  />{" "}
                  <label htmlFor="price2">1.000.000đ - 2.000.000đ</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="price3"
                    className="accent-primary"
                    value="3"
                    checked={priceFilter.includes("3")}
                    onChange={handlePriceChange}
                  />{" "}
                  <label htmlFor="price3">2.000.000đ - 5.000.000đ</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="price4"
                    className="accent-primary"
                    value="4"
                    checked={priceFilter.includes("4")}
                    onChange={handlePriceChange}
                  />{" "}
                  <label htmlFor="price4">Trên 5.000.000đ</label>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 border rounded p-5 mb-5">
              <h2 className="font-bold text-lg mb-4">Hãng</h2>
              <input
                className="w-full mb-3 px-3 py-2 border rounded text-base bg-white"
                placeholder="Tìm nhanh..."
                disabled
              />
              <ul className="space-y-2 text-base max-h-32 overflow-y-auto">
                <li>
                  <input
                    type="checkbox"
                    id="brand1"
                    className="accent-primary"
                    value="nike"
                    checked={brandFilter.includes("nike")}
                    onChange={handleBrandChange}
                  />{" "}
                  <label htmlFor="brand1">Nike</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="brand2"
                    className="accent-primary"
                    value="adidas"
                    checked={brandFilter.includes("adidas")}
                    onChange={handleBrandChange}
                  />{" "}
                  <label htmlFor="brand2">Adidas</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="brand3"
                    className="accent-primary"
                    value="new balance"
                    checked={brandFilter.includes("new balance")}
                    onChange={handleBrandChange}
                  />{" "}
                  <label htmlFor="brand3">New Balance</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="brand4"
                    className="accent-primary"
                    value="puma"
                    checked={brandFilter.includes("puma")}
                    onChange={handleBrandChange}
                  />{" "}
                  <label htmlFor="brand4">Puma</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="brand5"
                    className="accent-primary"
                    value="reebok"
                    checked={brandFilter.includes("reebok")}
                    onChange={handleBrandChange}
                  />{" "}
                  <label htmlFor="brand5">Reebok</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="brand6"
                    className="accent-primary"
                    value="vans"
                    checked={brandFilter.includes("vans")}
                    onChange={handleBrandChange}
                  />{" "}
                  <label htmlFor="brand6">Vans</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="brand7"
                    className="accent-primary"
                    value="converse"
                    checked={brandFilter.includes("converse")}
                    onChange={handleBrandChange}
                  />{" "}
                  <label htmlFor="brand7">Converse</label>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 border rounded p-5">
              <h2 className="font-bold text-lg mb-4">Kích thước</h2>
              <input
                className="w-full mb-3 px-3 py-2 border rounded text-base bg-white"
                placeholder="Tìm nhanh..."
                disabled
              />
              <ul className="space-y-2 text-base max-h-32 overflow-y-auto">
                <li>
                  <input
                    type="checkbox"
                    id="size35"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size35">35</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="size36"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size36">36</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="size37"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size37">37</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="size38"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size38">38</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="size39"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size39">39</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="size40"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size40">40</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="size41"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size41">41</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="size42"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size42">42</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="size43"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size43">43</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="size44"
                    className="accent-primary"
                  />{" "}
                  <label htmlFor="size44">44</label>
                </li>
              </ul>
            </div>
          </aside>
          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Tất cả sản phẩm</h1>
              <div className="flex items-center gap-3 text-lg">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
                <span className="ml-6">Sắp xếp</span>
                <select
                  className="border rounded px-3 py-2 text-lg ml-2"
                  value={sort}
                  onChange={(e) => {
                    setSort(
                      e.target.value === "asc"
                        ? "asc"
                        : e.target.value === "desc"
                        ? "desc"
                        : "default"
                    );
                    setPage(1);
                  }}
                >
                  <option value="default">Mặc định</option>
                  <option value="asc">Giá tăng dần</option>
                  <option value="desc">Giá giảm dần</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-white">
              {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="border rounded-xl bg-white flex flex-col shadow-sm overflow-hidden relative group"
                >
                  {/* Badge giảm giá hoặc mới */}
                  {product.discount ? (
                    <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full z-10">
                      -{product.discount}%
                    </span>
                  ) : (
                    <span className="absolute top-4 right-4 bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full z-10">
                      Mới
                    </span>
                  )}
                  {/* Ảnh sản phẩm */}
                  <div className="bg-gray-100 flex items-center justify-center h-56">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={220}
                      height={220}
                      className="object-contain max-h-52"
                    />
                  </div>
                  {/* Thông tin sản phẩm */}
                  <div className="flex flex-col flex-1 px-6 pt-4 pb-6">
                    <div className="font-bold text-lg mb-1">{product.name}</div>
                    <div className="flex items-center gap-2 text-base mb-2">
                      <span className="text-primary flex items-center font-semibold">
                        <Star className="w-4 h-4 mr-1 fill-primary text-primary" />
                        {product.rating}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({product.reviews || "0"} đánh giá)
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="text-primary font-bold text-l">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 text-base line-through ml-2">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-base py-2 mt-auto rounded-lg flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Mua ngay
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
            {/* Pagination dưới */}
            <div className="flex justify-center items-center gap-2 mt-10 text-lg">
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
