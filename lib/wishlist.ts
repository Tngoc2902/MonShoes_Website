import { loadLocalStorage, saveLocalStorage } from "@/lib/storage";

const WISHLIST_KEY = "monshoes-wishlist";

export function loadWishlist(): string[] {
  return loadLocalStorage<string[]>(WISHLIST_KEY, []);
}

export function saveWishlist(wishlist: string[]) {
  saveLocalStorage(WISHLIST_KEY, wishlist);
}

export function isProductInWishlist(productId: string) {
  const wishlist = loadWishlist();
  return wishlist.includes(productId);
}

export function addProductToWishlist(productId: string) {
  const wishlist = loadWishlist();
  if (!wishlist.includes(productId)) {
    const next = [...wishlist, productId];
    saveWishlist(next);
    return next;
  }
  return wishlist;
}

export function removeProductFromWishlist(productId: string) {
  const wishlist = loadWishlist();
  const next = wishlist.filter((id) => id !== productId);
  saveWishlist(next);
  return next;
}

export function toggleProductWishlist(productId: string) {
  const wishlist = loadWishlist();
  const next = wishlist.includes(productId)
    ? wishlist.filter((id) => id !== productId)
    : [...wishlist, productId];
  saveWishlist(next);
  return next;
}
