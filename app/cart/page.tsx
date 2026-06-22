import { redirect } from "next/navigation";

export default function CartsRedirect() {
  redirect("/cart");
}