"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { motion } from "framer-motion";
import {
  Heart,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Minus,
  Plus,
} from "lucide-react";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
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

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { items, addToCart, updateQuantity } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Vui lòng chọn kích thước");
      return;
    }

    const productId = String(product.id);
    const existingItem = items.find(
      (item) => item.id === productId && item.size === selectedSize
    );

    if (!existingItem) {
      addToCart(productId, selectedSize);
      updateQuantity(productId, Math.min(product.stock, quantity), selectedSize);
    } else {
      updateQuantity(
        productId,
        Math.min(product.stock, existingItem.quantity + quantity),
        selectedSize
      );
    }

    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <>
      <Navbar />
      <div className="container py-6 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={
                  product.gallery && product.gallery.length > 0
                    ? product.gallery[selectedImageIndex]
                    : product.image
                }
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {product.gallery?.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer ${
                    selectedImageIndex === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 25vw, 10vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews} đánh giá)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-2xl font-bold">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              {product.discount && (
                <span className="text-sm text-primary">
                  Tiết kiệm {product.discount}%
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">Kích thước</h3>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {["38", "39", "40", "41", "42", "43", "44"].map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Vui lòng chọn kích thước
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-3">Số lượng</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center border rounded-md w-fit self-start">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 self-start">
                    <Badge variant="secondary" className="text-xs">
                      {product.stock} sản phẩm có sẵn
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2 h-12"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                <ShoppingCart className="h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 shrink-0"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only">Yêu thích</span>
              </Button>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Miễn phí vận chuyển cho đơn hàng trên 1 triệu đồng</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>Đổi trả miễn phí trong vòng 30 ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Bảo hành chính hãng 12 tháng</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
