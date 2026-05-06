import { listProducts, type ProductSort } from "@/lib/catalog";
import { NextResponse } from "next/server";

function readListParam(searchParams: URLSearchParams, key: string) {
  return searchParams.get(key)?.split(",").filter(Boolean) ?? [];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const data = listProducts({
    page: Number(searchParams.get("page") ?? 1),
    limit: Number(searchParams.get("limit") ?? 12),
    sort: (searchParams.get("sort") ?? "default") as ProductSort,
    price: readListParam(searchParams, "price"),
    brand: readListParam(searchParams, "brand"),
    size: readListParam(searchParams, "size"),
    search: searchParams.get("search") ?? undefined,
  });

  return NextResponse.json(data);
}
