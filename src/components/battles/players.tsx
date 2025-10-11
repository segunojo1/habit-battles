import { BattleValue } from "@/app/(main)/battle/[id]/page";
import React from "react";

const Players = (battle: BattleValue) => {
  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-3">Players</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(battle.players?.$values ?? []).map((p) => (
          <div
            key={`${p.userId}-${p.username}`}
            className="bg-black/20 border border-white/10 rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <div className="text-white font-semibold">{p.username}</div>
              <div className="text-violet-200/70 text-sm">
                Streak: {p.streak} days
              </div>
              <div className="text-violet-200/70 text-sm">
                Coins: {p.coins.toLocaleString?.() ?? p.coins}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Players;
