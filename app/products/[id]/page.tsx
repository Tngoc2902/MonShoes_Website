import { products } from "@/data/products";
import ProductDetails from "@/app/products/[id]/ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // Kiểm tra và chuyển đổi `id` từ chuỗi sang số
  const id = parseInt(params.id, 10);

  // Tìm sản phẩm dựa trên `id`
  const product = products.find((p) => p.id === id);

  // Xử lý khi không tìm thấy sản phẩm
  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  // Trả về chi tiết sản phẩm
  return <ProductDetails product={product} />;
}
