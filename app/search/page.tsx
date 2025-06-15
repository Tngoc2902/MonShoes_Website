"use client";

import { useSearchParams } from "next/navigation";
import NavbarLogin from "@/components/navbar_login";
import Footer from "@/components/footer";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 16;

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
      <div className="container mx-auto py-4 text-lg">
        <div className="text-base text-gray-500 mb-4">
          <Link href="/" className="hover:underline font-medium">
            Trang chủ
          </Link>
          <span className="mx-2">{">>"}</span>
          <span className="font-semibold text-primary">Tìm kiếm</span>
        </div>
        <h2 className="text-xl font-bold mb-4">
          Kết quả tìm kiếm cho: <span className="text-primary">{query}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-white">
          {paginatedProducts.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-12">
              Không tìm thấy sản phẩm nào.
            </div>
          ) : (
            paginatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="border rounded-xl bg-white flex flex-col shadow-sm overflow-hidden relative group"
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
                <div className="bg-gray-100 flex items-center justify-center h-48 sm:h-56 md:h-60">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain max-h-56"
                  />
                </div>
                <div className="flex flex-col flex-1 px-2 pt-2 pb-4">
                  <div className="font-semibold text-base mb-1 truncate">
                    {product.name}
                  </div>
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <span className="text-primary flex items-center font-semibold">
                      <Star className="w-3 h-3 mr-1 fill-primary text-primary" />
                      {product.rating}
                    </span>
                    <span className="text-gray-500 text-xs">
                      ({product.reviews || "0"} đánh giá)
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="text-primary font-bold text-base">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 text-xs line-through ml-2">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-1 mt-auto rounded flex items-center justify-center gap-1">
                    <ShoppingCart className="w-5 h-5" />
                    Mua ngay
                  </Button>
                </div>
              </Link>
            ))
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 text-lg">
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
        )}
      </div>
      <Footer />
    </>
  );
}
