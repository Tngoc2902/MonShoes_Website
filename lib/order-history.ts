import { loadLocalStorage, saveLocalStorage } from "@/lib/storage";

export type OrderHistoryItem = {
  id: string;
  createdAt: string;
  total: number;
  status: string;
  paymentMethod: string;
  shippingMethod: string;
  couponCode?: string | null;
  discountPercent: number;
  shippingCost: number;
  subtotal: number;
  discountAmount: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    note?: string;
  };
  items: Array<{
    productId: number;
    name: string;
    size: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
};

const ORDER_HISTORY_KEY = "monshoes-order-history";

export function loadOrderHistory(): OrderHistoryItem[] {
  return loadLocalStorage<OrderHistoryItem[]>(ORDER_HISTORY_KEY, []);
}

export function saveOrderHistory(order: OrderHistoryItem) {
  const history = loadOrderHistory();
  const next = [order, ...history];
  saveLocalStorage(ORDER_HISTORY_KEY, next);
  return next;
}

export function clearOrderHistory() {
  saveLocalStorage(ORDER_HISTORY_KEY, []);
}

export function removeOrderFromHistory(orderId: string) {
  const history = loadOrderHistory();
  const next = history.filter((order) => order.id !== orderId);
  saveLocalStorage(ORDER_HISTORY_KEY, next);
  return next;
}
