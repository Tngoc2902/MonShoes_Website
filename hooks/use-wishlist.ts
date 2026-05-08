"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addProductToWishlist,
  loadWishlist,
  removeProductFromWishlist,
  toggleProductWishlist,
} from "@/lib/wishlist";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setWishlist(loadWishlist());
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    const next = toggleProductWishlist(productId);
    setWishlist(next);
    return next;
  }, []);

  const addWishlist = useCallback((productId: string) => {
    const next = addProductToWishlist(productId);
    setWishlist(next);
    return next;
  }, []);

  const removeWishlist = useCallback((productId: string) => {
    const next = removeProductFromWishlist(productId);
    setWishlist(next);
    return next;
  }, []);

  const hasInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  return {
    wishlist,
    count: wishlist.length,
    toggleWishlist,
    addWishlist,
    removeWishlist,
    hasInWishlist,
  };
}
