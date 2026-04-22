"use client";

import { products } from "@/data/products";
import { createContext, ReactNode, useContext, useState } from "react";

type CartItem = {
  id: string;
  quantity: number;
  size: string;
};

const CartContext = createContext<
  | {
      items: CartItem[];
      addToCart: (productId: string, size: string) => void;
      removeFromCart: (productId: string) => void;
      updateQuantity: (productId: string, quantity: number) => void;
      clearCart: () => void;
      getCartTotal: () => number;
      getCartItems: () => { product: any; quantity: number; size: string }[];
    }
  | undefined
>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (productId: string, size: any) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === productId);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { id: productId, quantity: 1, size }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: any) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const product = products.find((p) => String(p.id) === String(item.id));
      if (!product) return total;
      const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const getCartItems = () => {
    return items.map((item) => {
      const product = products.find((p) => String(p.id) === String(item.id));
      if (!product) throw new Error("Product not found");
      return {
        product,
        quantity: item.quantity,
        size: item.size,
      };
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
