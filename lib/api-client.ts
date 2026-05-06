import type { ProductListResponse, ProductSort } from "@/lib/catalog";
import type { CreateOrderInput } from "@/lib/orders";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || "Không thể gọi API");
  }

  return data as T;
}

export type FetchProductsParams = {
  page?: number;
  limit?: number;
  sort?: ProductSort;
  price?: string[];
  brand?: string[];
  size?: string[];
  search?: string;
};

export function fetchProducts(params: FetchProductsParams = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      searchParams.set(key, value.join(","));
    } else if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return request<ProductListResponse>(`/api/products?${searchParams.toString()}`);
}

export function fetchProduct(id: string | number) {
  return request(`/api/products/${id}`);
}

export function applyCoupon(couponCode: string) {
  return request<{ code: string; discountPercent: number }>("/api/coupons", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ couponCode }),
  });
}

export function submitOrder(input: CreateOrderInput) {
  return request<{ order: { id: string; total: number; status: string; createdAt: string } }>("/api/orders", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(input),
  });
}
