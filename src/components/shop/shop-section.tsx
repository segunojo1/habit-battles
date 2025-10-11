"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ShopSection = ({
  title,
  items,
  onBuy,
  canAfford,
}: {
  title: string;
  items: any[];
  onBuy: (item: any) => void;
  canAfford: (price: number) => boolean;
}) => {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div
        className={`grid gap-6 ${
          title === "Themes"
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {items.map((item) => {
          const affordable = canAfford(item.price);

          // THEME (gradient cards)
          if (item.gradient) {
            return (
              <button
                key={item.id}
                onClick={() => onBuy(item)}
                disabled={!affordable}
                className="group relative h-28 rounded-xl overflow-hidden text-left 
                focus:outline-none focus:ring-2 focus:ring-[#8058ff]/40 
                disabled:opacity-60 transition-transform hover:scale-[1.015]"
              >
                <div className={`absolute inset-0 ${item.gradient}`} />
                <div className="absolute inset-0 bg-black/25" />
                <div className="relative p-4 flex flex-col justify-end h-full">
                  <span className="text-white font-semibold drop-shadow-sm">
                    {item.name}
                  </span>
                  <span className="text-[#cbbcff]/80 text-xs">{item.price} Coins</span>
                </div>
              </button>
            );
          }

          // IMAGE-BASED (monsters, avatars)
          return (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden bg-black/20 border border-[#ffffff1a]"
            >
              <div
                className="aspect-square bg-center bg-cover"
                style={{ backgroundImage: `url(${item.preview})` }}
              />
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#cbbcff]/70">
                    {item.price} Coins
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => onBuy(item)}
                  disabled={!affordable}
                  className="h-8 px-3"
                >
                  {affordable ? "Buy" : "Locked"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ShopSection;