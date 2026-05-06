"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ShoppingCart,
  Star,
  Filter,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/lib/api-client";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Định nghĩa kiểu dữ liệu cho Sản phẩm trả về từ API
interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery?: string[];
  stock: number;
}

const PRODUCTS_PER_PAGE = 12;

function FilterSidebar({
  className = "",
  priceFilter,
  setPriceFilter,
  brandFilter,
  setBrandFilter,
  sizeFilter,
  setSizeFilter,
  setPage
}: {
  className?: string;
  priceFilter: string[];
  setPriceFilter: (value: string[]) => void;
  brandFilter: string[];
  setBrandFilter: (value: string[]) => void;
  sizeFilter: string[];
  setSizeFilter: (value: string[]) => void;
  setPage: (page: number) => void;
}) {
  return (
    <aside className={`w-72 shrink-0 ${className}`}>
      <div className="bg-muted/50 border rounded-lg p-5 mb-5">
        <h2 className="font-bold text-lg mb-4">Giá thành</h2>
        <div className="space-y-3">
          {[
            { id: "price1", label: "Dưới 1.000.000đ", value: "1" },
            { id: "price2", label: "1.000.000đ - 2.000.000đ", value: "2" },
            { id: "price3", label: "2.000.000đ - 5.000.000đ", value: "3" },
            { id: "price4", label: "Trên 5.000.000đ", value: "4" },
          ].map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={priceFilter.includes(item.value)}
                onCheckedChange={(checked) => {
                  setPage(1);
                  if (checked) {
                    setPriceFilter([...priceFilter, item.value]);
                  } else {
                    setPriceFilter(priceFilter.filter(p => p !== item.value));
                  }
                }}
              />
              <Label htmlFor={item.id} className="text-sm font-normal cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 border rounded-lg p-5 mb-5">
        <h2 className="font-bold text-lg mb-4">Hãng</h2>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {[
            { id: "brand1", label: "Nike", value: "nike" },
            { id: "brand2", label: "Adidas", value: "adidas" },
            { id: "brand3", label: "New Balance", value: "new balance" },
            { id: "brand4", label: "Puma", value: "puma" },
            { id: "brand5", label: "Reebok", value: "reebok" },
            { id: "brand6", label: "Vans", value: "vans" },
            { id: "brand7", label: "Converse", value: "converse" },
          ].map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={brandFilter.includes(item.value)}
                onCheckedChange={(checked) => {
                  setPage(1);
                  if (checked) {
                    setBrandFilter([...brandFilter, item.value]);
                  } else {
                    setBrandFilter(brandFilter.filter(b => b !== item.value));
                  }
                }}
              />
              <Label htmlFor={item.id} className="text-sm font-normal cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 border rounded-lg p-5">
        <h2 className="font-bold text-lg mb-4">Kích thước</h2>
        <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
          {['35', '36', '37', '38', '39', '40', '41', '42', '43', '44'].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size${size}`}
                checked={sizeFilter.includes(size)}
                onCheckedChange={(checked) => {
                  setPage(1);
                  if (checked) {
                    setSizeFilter([...sizeFilter, size]);
                  } else {
                    setSizeFilter(sizeFilter.filter(s => s !== size));
                  }
                }}
              />
              <Label htmlFor={`size${size}`} className="text-sm font-normal cursor-pointer">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

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

  // Ẩn pagination nếu không có trang nào
  if (totalPages <= 1) return null;

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
  const searchParams = useSearchParams();
  
  // Trạng thái bộ lọc
  const [sort, setSort] = useState("default");
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Trạng thái phân trang
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(currentPage);

  // Trạng thái dữ liệu API
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Gọi API mỗi khi bộ lọc, sắp xếp hoặc trang bị thay đổi
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        // 2. Fetch dữ liệu từ API backend nội bộ của Next.js
        const data = await fetchProducts({
          page,
          limit: PRODUCTS_PER_PAGE,
          sort: sort as "default" | "asc" | "desc",
          price: priceFilter,
          brand: brandFilter,
          size: sizeFilter,
        });

        // 3. Cập nhật state từ response { products, totalPages }
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [page, sort, priceFilter, brandFilter, sizeFilter]);

  // Cập nhật trang và cuộn lên đầu
  const updatePage = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />
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
          {/* Desktop Sidebar */}
          <FilterSidebar
            className="hidden lg:block"
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            sizeFilter={sizeFilter}
            setSizeFilter={setSizeFilter}
            setPage={setPage}
          />

          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Tất cả sản phẩm</h1>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Bộ lọc
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar
                        priceFilter={priceFilter}
                        setPriceFilter={setPriceFilter}
                        brandFilter={brandFilter}
                        setBrandFilter={setBrandFilter}
                        sizeFilter={sizeFilter}
                        setSizeFilter={setSizeFilter}
                        setPage={setPage}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="hidden sm:inline">Sắp xếp</span>
                <select
                  className="border rounded px-3 py-2 text-sm outline-none"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1); // Reset về trang 1 khi đổi sắp xếp
                  }}
                >
                  <option value="default">Mặc định</option>
                  <option value="asc">Giá tăng dần</option>
                  <option value="desc">Giá giảm dần</option>
                </select>
              </div>
            </div>

            {/* Loading / Empty / Data States */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mr-2 text-primary" />
                <span className="text-gray-500">Đang tải sản phẩm...</span>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-gray-400 mb-2">
                  <Filter className="w-12 h-12 mx-auto opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 mt-2">Vui lòng thử thay đổi bộ lọc hoặc tìm kiếm khác.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-white">
                  {products.map((product, index) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="border rounded-xl bg-white flex flex-col shadow-sm overflow-hidden relative group hover:shadow-lg transition-shadow duration-200"
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
                      <div className="bg-gray-100 flex items-center justify-center h-56 relative overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={220}
                          height={220}
                          className="object-contain max-h-52 group-hover:scale-105 transition-transform duration-200"
                          priority={page === 1 && index < 4}
                        />
                      </div>
                      
                      {/* Thông tin sản phẩm */}
                      <div className="flex flex-col flex-1 px-6 pt-4 pb-6">
                        <div className="font-bold text-lg mb-1 line-clamp-2">{product.name}</div>
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
                          <span className="text-primary font-bold text-lg">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 text-base line-through ml-2">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-base py-2 mt-auto rounded-lg flex items-center justify-center gap-2 transition-colors duration-200">
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
                    setPage={updatePage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}