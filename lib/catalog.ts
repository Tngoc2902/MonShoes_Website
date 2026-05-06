import { products } from "@/data/products";

export type Product = (typeof products)[number];

export type ProductSort = "default" | "asc" | "desc";

export type ProductListQuery = {
  page?: number;
  limit?: number;
  sort?: ProductSort;
  price?: string[];
  brand?: string[];
  size?: string[];
  search?: string;
};

export type ProductListResponse = {
  products: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

export function parseProductPrice(price: Product["price"]) {
  if (typeof price === "number") return price;
  return Number(String(price).replace(/[^0-9]/g, ""));
}

function matchesPriceBucket(product: Product, buckets: string[]) {
  if (buckets.length === 0) return true;

  const price = parseProductPrice(product.price);

  return buckets.some((bucket) => {
    switch (bucket) {
      case "1":
        return price < 1_000_000;
      case "2":
        return price >= 1_000_000 && price <= 2_000_000;
      case "3":
        return price > 2_000_000 && price <= 5_000_000;
      case "4":
        return price > 5_000_000;
      default:
        return true;
    }
  });
}

function normalizeList(values?: string[]) {
  return (values ?? [])
    .flatMap((value) => value.split(","))
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function listProducts(query: ProductListQuery = {}): ProductListResponse {
  const page = Math.max(Number(query.page) || DEFAULT_PAGE, 1);
  const limit = Math.max(Number(query.limit) || DEFAULT_LIMIT, 1);
  const sort = query.sort ?? "default";
  const priceBuckets = normalizeList(query.price);
  const brands = normalizeList(query.brand);
  const sizes = normalizeList(query.size);
  const search = (query.search ?? "").trim().toLowerCase();

  let filtered = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const productSizes = product.sizes.map((size) => size.toLowerCase());

    return (
      matchesPriceBucket(product, priceBuckets) &&
      (brands.length === 0 || brands.some((brand) => productName.includes(brand))) &&
      (sizes.length === 0 || sizes.some((size) => productSizes.includes(size))) &&
      (!search || productName.includes(search))
    );
  });

  if (sort === "asc" || sort === "desc") {
    filtered = [...filtered].sort((first, second) => {
      const priceDiff = parseProductPrice(first.price) - parseProductPrice(second.price);
      return sort === "asc" ? priceDiff : -priceDiff;
    });
  }

  const total = filtered.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const startIndex = (page - 1) * limit;

  return {
    products: filtered.slice(startIndex, startIndex + limit),
    page,
    limit,
    total,
    totalPages,
  };
}

export function getProductById(id: string | number) {
  const productId = Number(id);

  if (!Number.isFinite(productId)) {
    return undefined;
  }

  return products.find((product) => product.id === productId);
}

export function getProductIds() {
  return products.map((product) => product.id.toString());
}
