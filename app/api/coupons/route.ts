import { getCouponDiscount } from "@/lib/orders";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const code = String(body.couponCode ?? "").trim().toUpperCase();
  const discountPercent = getCouponDiscount(code);

  if (!code || discountPercent === 0) {
    return NextResponse.json({ error: "Mã giảm giá không hợp lệ" }, { status: 400 });
  }

  return NextResponse.json({ code, discountPercent });
}
