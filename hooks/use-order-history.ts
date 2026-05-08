"use client";

import { useCallback, useEffect, useState } from "react";
import {
  loadOrderHistory,
  saveOrderHistory,
  clearOrderHistory,
  removeOrderFromHistory,
  OrderHistoryItem,
} from "@/lib/order-history";

export function useOrderHistory() {
  const [history, setHistory] = useState<OrderHistoryItem[]>([]);

  useEffect(() => {
    setHistory(loadOrderHistory());
  }, []);

  const addOrder = useCallback((order: OrderHistoryItem) => {
    const next = saveOrderHistory(order);
    setHistory(next);
    return next;
  }, []);

  const clearHistory = useCallback(() => {
    clearOrderHistory();
    setHistory([]);
  }, []);

  const removeOrder = useCallback((orderId: string) => {
    const next = removeOrderFromHistory(orderId);
    setHistory(next);
    return next;
  }, []);

  return {
    history,
    total: history.length,
    addOrder,
    clearHistory,
    removeOrder,
  };
}
