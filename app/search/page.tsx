"use client";

import { useSearchParams } from "next/navigation";
import NavbarLogin from "@/components/navbar_login";
import Footer from "@/components/footer";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 16;

  useEffect(() => {
    setPage(1);
  }, [query]);

  // Lọc sản phẩm theo tên hoặc id
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) || String(product.id) === query
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <>
      <NavbarLogin />
      <div className="container py-6 sm:py-8">
        <div className="text-sm sm:text-base text-gray-500 mb-4">
          <Link href="/" className="hover:underline font-medium">
            Trang chủ
          </Link>
          <span className="mx-2">{">>"}</span>
          <span className="font-semibold text-primary">Tìm kiếm</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold mb-4 break-words">
          Kết quả tìm kiếm cho:{" "}
          <span className="text-primary break-words">{query}</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {paginatedProducts.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-12">
              Không tìm thấy sản phẩm nào.
            </div>
          ) : (
            paginatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="border rounded-xl bg-white flex flex-col shadow-sm overflow-hidden relative group transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {product.discount ? (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded z-10">
                    Giảm {product.discount}%
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded z-10">
                    Mới
                  </span>
                )}
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="flex flex-col flex-1 p-3 sm:p-4">
                  <div className="font-semibold text-sm sm:text-base mb-1 truncate">
                    {product.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm mb-2">
                    <span className="text-primary flex items-center font-semibold whitespace-nowrap">
                      <Star className="w-3 h-3 mr-1 fill-primary text-primary" />
                      {product.rating}
                    </span>
                    <span className="text-gray-500 text-xs">
                      ({product.reviews || "0"} đánh giá)
                    </span>
                  </div>
                  <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-primary font-bold text-sm sm:text-base">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 text-xs line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto pointer-events-none w-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm h-9 sm:h-10 rounded flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    Mua ngay
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 sm:hidden">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(1)}
              >
                {"<<"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                {"<"}
              </Button>
              <span className="text-sm text-muted-foreground px-2">
                Trang {page}/{totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                {">"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage(totalPages)}
              >
                {">>"}
              </Button>
            </div>
            <div className="hidden sm:flex flex-wrap justify-center items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(1)}
              >
                {"<<"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                {"<"}
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                {">"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage(totalPages)}
              >
                {">>"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
