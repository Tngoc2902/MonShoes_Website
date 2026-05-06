import { getProductById, parseProductPrice } from "@/lib/catalog";

export type OrderItemInput = {
  productId: string | number;
  quantity: number;
  size: string;
};

export type CustomerInput = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
};

export type CreateOrderInput = {
  customer: CustomerInput;
  items: OrderItemInput[];
  paymentMethod: "card" | "cod" | string;
  shippingMethod: "standard" | "fast" | "express" | string;
  couponCode?: string;
};

export const coupons: Record<string, number> = {
  WELCOME10: 10,
  WELCOME20: 20,
};

export const shippingFees: Record<string, number> = {
  standard: 0,
  fast: 25_000,
  express: 50_000,
};

export function getCouponDiscount(couponCode?: string) {
  if (!couponCode) return 0;
  return coupons[couponCode.trim().toUpperCase()] ?? 0;
}

export function createOrder(input: CreateOrderInput) {
  const customer = input.customer;

  if (!customer?.fullName || !customer.phone || !customer.email || !customer.address) {
    throw new Error("Vui lòng điền đầy đủ thông tin giao hàng");
  }

  if (!input.items?.length) {
    throw new Error("Giỏ hàng của bạn đang trống");
  }

  const items = input.items.map((item) => {
    const product = getProductById(item.productId);
    const quantity = Number(item.quantity);

    if (!product) {
      throw new Error(`Không tìm thấy sản phẩm ${item.productId}`);
    }

    if (!product.sizes.includes(item.size)) {
      throw new Error(`Kích thước ${item.size} không hợp lệ cho ${product.name}`);
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Số lượng của ${product.name} không hợp lệ`);
    }

    if (quantity > product.stock) {
      throw new Error(`${product.name} chỉ còn ${product.stock} sản phẩm`);
    }

    const unitPrice = parseProductPrice(product.price);

    return {
      productId: product.id,
      name: product.name,
      size: item.size,
      quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const discountPercent = getCouponDiscount(input.couponCode);
  const discountAmount = Math.floor((subtotal * discountPercent) / 100);
  const shippingCost = shippingFees[input.shippingMethod] ?? shippingFees.standard;
  const total = subtotal - discountAmount + shippingCost;

  return {
    id: `MS-${Date.now()}`,
    customer,
    items,
    paymentMethod: input.paymentMethod,
    shippingMethod: input.shippingMethod,
    couponCode: input.couponCode?.trim().toUpperCase() || null,
    discountPercent,
    subtotal,
    discountAmount,
    shippingCost,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}
