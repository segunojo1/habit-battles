import React from "react";

const MonsterBanner = ({battle}: any) => {
  return (
    <div className="rounded-xl overflow-hidden bg-black/20 border border-white/10">
      <div className="aspect-[4/2] bg-gradient-to-br from-violet-700/40 via-fuchsia-600/30 to-indigo-700/30" />
      <div className="p-4 flex items-center justify-between">
        <div className="text-white">
          <div className="text-sm opacity-80">Monster</div>
          <div className="font-semibold capitalize">
            {battle.monsterType.replaceAll("_", " ")}
          </div>
        </div>
        <div className="text-right text-white">
          <div className="text-sm opacity-80">Battle ID</div>
          <div className="font-semibold">#{battle.id}</div>
        </div>
      </div>
    </div>
  );
};

export default MonsterBanner;
