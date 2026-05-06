import { getProductById, getProductIds } from "@/lib/catalog";
import ProductDetails from "@/app/products/[id]/ProductDetails";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all products (Shopify-like pre-generation)
export async function generateStaticParams() {
  return getProductIds().map((id) => ({ id }));
}

// Enable ISR for product pages
export const revalidate = 3600; // Revalidate every hour

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = getProductById(productId);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại | MONSHOES",
    };
  }

  return {
    title: `${product.name} | MONSHOES`,
    description: product.description || `Mua ${product.name} chính hãng tại MONSHOES. ${product.price}`,
    openGraph: {
      title: `${product.name} | MONSHOES`,
      description: product.description || `Mua ${product.name} chính hãng tại MONSHOES`,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  // Await params trước khi sử dụng (Next.js 15 requirement)
  const { id } = await params;

  // Kiểm tra và chuyển đổi `id` từ chuỗi sang số
  const productId = parseInt(id, 10);

  // Tìm sản phẩm dựa trên `id`
  const product = getProductById(productId);

  // Xử lý khi không tìm thấy sản phẩm
  if (!product) {
    notFound();
  }

  // Trả về chi tiết sản phẩm
  return <ProductDetails product={product} />;
}
