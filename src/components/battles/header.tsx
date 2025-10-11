import { formatDate } from "@/lib/utils";
import React, { useMemo } from "react";

const Header = ({ battle, profile }: any) => {
  const coinBalance = useMemo(() => profile?.coinBalance ?? 0, [profile]);
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h1 className="text-3xl font-extrabold text-white capitalize">
          {battle.habit} Battle
        </h1>
        <p className="text-sm text-violet-200/70">
          {formatDate(battle.startDate)} – {formatDate(battle.endDate)} ·{" "}
          {battle.durationDays} days
        </p>
      </div>
      <div className="self-start sm:self-auto flex flex-col gap-2">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-700/30 border border-violet-500/40 text-violet-100">
          {battle.status}
        </span>
        <p className="text-sm text-violet-200/70">💸 {coinBalance} Coins</p>
      </div>
    </div>
  );
};

export default Header;
