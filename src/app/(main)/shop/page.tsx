"use client";

import { Button } from "@/components/ui/button";
import React, { useMemo, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

type ShopItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  preview?: string;
};

// Theme tiles are gradient-driven; preview acts as a gradient key
const THEMES: (ShopItem & { gradient: string })[] = [
  {
    id: "theme-dark-nebula",
    name: "Dark Nebula",
    description: "Deep cosmic glow.",
    price: 600,
    gradient: "bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-700",
  },
  {
    id: "theme-cosmic-rift",
    name: "Cosmic Rift",
    description: "Muted slate sheen.",
    price: 600,
    gradient: "bg-gradient-to-br from-zinc-300 to-zinc-500 dark:from-zinc-600 dark:to-zinc-800",
  },
  {
    id: "theme-voidwalker",
    name: "Voidwalker",
    description: "Subtle abyss waves.",
    price: 600,
    gradient: "bg-gradient-to-b from-slate-400 to-slate-600 dark:from-slate-700 dark:to-slate-900",
  },
];

const MONSTERS: ShopItem[] = [
  { id: "monster-gloomfang", name: "Gloomfang", description: "Brooding and sly.", price: 500, preview: "/images/shop/nebula.png" },
  { id: "monster-shard-shell", name: "Shard-Shell", description: "Hard-headed menace.", price: 750, preview: "/images/shop/nebula2.png" },
  { id: "monster-rune-golem", name: "Rune-Golem", description: "Ancient sentinel.", price: 1000, preview: "/images/shop/rune-golem.jpg" },
  { id: "monster-night-whisper", name: "Night-Whisper", description: "Silent striker.", price: 1200, preview: "/images/shop/night-whisper.jpg" },
];

const AVATARS: ShopItem[] = [ 
  { id: "avatar-shadow-helm", name: "Shadow Helm", description: "Eerie elegance.", price: 300, preview: "/images/shop/avatar-1.jpg" },
  { id: "avatar-celestial-cloak", name: "Celestial Cloak", description: "Starlit weave.", price: 600, preview: "/images/shop/avatar-2.jpg" },
  { id: "avatar-voidforged-boots", name: "Voidforged Boots", description: "Walk the rift.", price: 450, preview: "/images/shop/avatar-3.jpg" },
  { id: "avatar-aetherial-gauntlets", name: "Aetherial Gauntlets", description: "Arcane grip.", price: 550, preview: "/images/shop/avatar-4.jpg" },
];

const Shop = () => {
  const [coins, setCoins] = useState<number>(0);
  const [cookieBalance, setCookieBalance] = useState<number>(0);
  useEffect(() => {
    try {
      const raw = Cookies.get("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.coinBalance === "number") {
          setCookieBalance(parsed.coinBalance);
        }
      }
    } catch {}
  }, []);

  const canAfford = (price: number) => (cookieBalance || coins) >= price;

  const handleBuy = (item: ShopItem) => {
    if (!canAfford(item.price)) return;

    setCoins((c) => c - item.price);
    toast("Item purchased successfully!");
  };


//   const sections = useMemo(
//     () => [
//       { title: "Themes", items: THEMES, help: "Set the global look & feel." },
//       { title: "Monster Designs", items: MONSTERS, help: "Face new enemies in battles." },
//       { title: "Avatar Customizations", items: AVATARS, help: "Personalize your profile." },
//     ],
//     []
//   );

  return (
    <div className="bg-[#151022] dark:bg-[#151022] min-h-[calc(100vh-64px)]">
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Shop</h1>
            <p className="text-sm text-violet-200/70 mt-2">
              Spend your hard-earned coins on new themes, monster designs, and avatar customizations.
            </p>
          </div>
          <div className="self-start sm:self-auto">
            <div className="bg-violet-700/30 border border-violet-500/40 text-violet-100 rounded-xl px-5 py-3 shadow-[0_0_0_1px_rgba(139,92,246,0.2)]">
              <div className="text-xs tracking-wide">Current Balance</div>
              <div className="flex items-center gap-2">
                <span className="text-lg">💸</span>
                <span className="text-xl font-bold">{(cookieBalance).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Themes */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Themes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleBuy(t)}
                disabled={!canAfford(t.price)}
                className="group relative h-28 rounded-xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-60"
              >
                <div className={`absolute inset-0 ${t.gradient}`} />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -inset-1 translate-x-[-60%] rotate-12 bg-white/10 blur-2xl group-hover:translate-x-[60%] transition-transform duration-700" />
                <div className="relative p-4 flex flex-col justify-end h-full">
                  <span className="text-white font-semibold drop-shadow-sm">{t.name}</span>
                  <span className="text-violet-100/80 text-xs">{t.price} Coins</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Monster Designs */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Monster Designs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MONSTERS.map((m) => {
              const affordable = canAfford(m.price);
              return (
                <div key={m.id} className="rounded-xl overflow-hidden bg-black/20 border border-white/10">
                  <div
                    className="aspect-square bg-center bg-cover"
                    style={{ backgroundImage: `url(${m.preview})` }}
                  />
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{m.name}</div>
                      <div className="text-xs text-violet-200/70">{m.price} Coins</div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleBuy(m)}
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

        {/* Avatar Customizations */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-4">Avatar Customizations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AVATARS.map((a) => {
              const affordable = canAfford(a.price);
              return (
                <div key={a.id} className="rounded-xl overflow-hidden bg-black/20 border border-white/10">
                  <div
                    className="aspect-square bg-center bg-cover"
                    style={{ backgroundImage: `url(${a.preview})` }}
                  />
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{a.name}</div>
                      <div className="text-xs text-violet-200/70">{a.price} Coins</div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleBuy(a)}
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
      </main>
    </div>
  );
};

export default Shop;