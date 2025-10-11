"use client";

import React from "react";

const ShopHeader = ({ balance }: { balance: number }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Shop</h1>
        <p className="text-[13px] text-[#b5a6ff]/80 mt-2">
          Spend your coins on cool themes, monsters, and avatar gear.
        </p>
      </div>

      <div className="bg-[#3f2b96]/30 border border-[#5f3fff]/30 text-[#cfc2ff] rounded-xl px-5 py-3 shadow-[0_0_0_1px_rgba(95,63,255,0.25)]">
        <div className="text-[11px] uppercase tracking-wide opacity-80">
          Current Balance
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">💰</span>
          <span className="text-xl font-bold">{balance.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
