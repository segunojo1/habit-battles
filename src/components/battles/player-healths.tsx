import { BattleValue } from "@/app/(main)/battle/[id]/page";
import React from "react";

const PlayersHealth = (battle: BattleValue) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-black/20 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold">Creator</span>
          <span className="text-violet-200/80 text-sm">
            {battle.creatorHealth}%
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-green-500 to-emerald-400"
            style={{
              width: `${Math.max(0, Math.min(100, battle.creatorHealth))}%`,
            }}
          />
        </div>
      </div>

      <div className="bg-black/20 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold">Opponent</span>
          <span className="text-violet-200/80 text-sm">
            {battle.opponentHealth}%
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-red-500 to-rose-400"
            style={{
              width: `${Math.max(0, Math.min(100, battle.opponentHealth))}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayersHealth;
