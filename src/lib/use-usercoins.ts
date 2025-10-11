"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function useUserCoins() {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    try {
      const raw = Cookies.get("user");
      const parsed: any = raw ? JSON.parse(raw) : {};
      if (typeof parsed?.coinBalance === "number") setBalance(parsed.coinBalance);
    } catch (err: any) {
      console.warn("coin read failed", err);
    }
  }, []);

  const canAfford = (price: number) => balance >= price;
  const updateBalance = (fn: any) => setBalance((prev) => fn(prev));

  return { balance, canAfford, updateBalance };
}
