"use client";

import { products } from "@/data/products";
import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { loadLocalStorage, saveLocalStorage } from "@/lib/storage";

type CartItem = {
  id: string;
  quantity: number;
  size: string;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; payload: { productId: string; size: string } }
  | { type: "REMOVE"; payload: { productId: string; size: string } }
  | { type: "UPDATE"; payload: { productId: string; quantity: number; size: string } }
  | { type: "CLEAR" };

const CartContext = createContext<
  | {
      items: CartItem[];
      addToCart: (productId: string, size: string) => void;
      removeFromCart: (productId: string, size: string) => void;
      updateQuantity: (productId: string, quantity: number, size: string) => void;
      clearCart: () => void;
      getCartTotal: () => number;
      getCartItems: () => { product: any; quantity: number; size: string }[];
    }
  | undefined
>(undefined);

const STORAGE_CART_KEY = "monshoes-cart";

const initialState: CartState = { items: [] };

function initCart(): CartState {
  return { items: loadLocalStorage<CartItem[]>(STORAGE_CART_KEY, []) };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const { productId, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === productId && item.size === size
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === productId && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { id: productId, quantity: 1, size }],
      };
    }
    case "REMOVE": {
      const { productId, size } = action.payload;
      return {
        items: state.items.filter(
          (item) => !(item.id === productId && item.size === size)
        ),
      };
    }
    case "UPDATE": {
      const { productId, quantity, size } = action.payload;
      return {
        items: state.items.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, initCart);

  useEffect(() => {
    saveLocalStorage(STORAGE_CART_KEY, state.items);
  }, [state.items]);

  const addToCart = (productId: string, size: string) => {
    dispatch({ type: "ADD", payload: { productId, size } });
  };

  const removeFromCart = (productId: string, size: string) => {
    dispatch({ type: "REMOVE", payload: { productId, size } });
  };

  const updateQuantity = (productId: string, quantity: number, size: string) => {
    dispatch({ type: "UPDATE", payload: { productId, quantity, size } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const getCartTotal = () =>
    state.items.reduce((total, item) => {
      const product = products.find((p) => String(p.id) === String(item.id));
      if (!product) return total;
      const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      return total + price * item.quantity;
    }, 0);

  const getCartItems = () =>
    state.items.map((item) => {
      const product = products.find((p) => String(p.id) === String(item.id));
      if (!product) throw new Error("Product not found");
      return {
        product,
        quantity: item.quantity,
        size: item.size,
      };
    });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
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
