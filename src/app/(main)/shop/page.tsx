"use client";

import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUserCoins } from "@/lib/use-usercoins";
import ShopHeader from "@/components/shop/shop-header";
import ShopSection from "@/components/shop/shop-section";
import { AVATARS, MONSTERS, THEMES } from "@/lib/shop-dummy";

const Shop = () => {
  const { balance, updateBalance, canAfford } = useUserCoins();

  const handleBuy = (item: any) => {
    if (!canAfford(item.price)) return toast.error("Not enough coins 😭");
    updateBalance((prev: number) => prev - item.price);
    toast.success(`You bought ${item.name}! 🎉`);
  };

  return (
    <div className="bg-[#120d1c] min-h-[calc(100vh-64px)]">
      <main className="max-w-6xl mx-auto px-5 py-10">
        <ShopHeader balance={balance} />

        <ShopSection
          title="Themes"
          items={THEMES}
          onBuy={handleBuy}
          canAfford={canAfford}
        />

        <ShopSection
          title="Monster Designs"
          items={MONSTERS}
          onBuy={handleBuy}
          canAfford={canAfford}
        />

        <ShopSection
          title="Avatar Customizations"
          items={AVATARS}
          onBuy={handleBuy}
          canAfford={canAfford}
        />
      </main>
    </div>
  );
};

export default Shop;
