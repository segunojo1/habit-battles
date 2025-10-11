import { ActiveBattle } from "@/app/(main)/dashboard/page";
import Link from "next/link";

export const BattleCard = ({ data }: { data: ActiveBattle }) => {
  const health = (v: number) => `${Math.max(0, Math.min(100, v))}%`;
  return (
    <Link href={`/battle/${data.battleId}`} className="group block">
      <div className="bg-[#0d0816]/80 border border-[#302f48]/50 rounded-[12px] p-[22px] transition-transform group-hover:scale-[1.01]">
        <div className="flex items-start justify-between mb-[10px]">
          <div>
            <h3 className="text-[16px] font-bold capitalize">{data.habit}</h3>
            <p className="text-[13px] text-[#b3a8e7cc]">
              vs {data.opponentName}
            </p>
          </div>
          <span className="px-[7px] py-[3px] rounded-[6px] text-[11px] font-semibold bg-[#6b4fe8]/30 border border-[#8e6bfa]/40 text-[#d4c7ff]">
            {data.status}
          </span>
        </div>

        <div className="space-y-[8px] mt-[4px]">
          <p className="text-[11px] text-[#b3a8e7cc]">Creator Health</p>
          <div className="w-full h-[7px] rounded-[4px] bg-[#ffffff14] overflow-hidden">
            <div
              className="h-full bg-[#4ade80]"
              style={{ width: health(data.creatorHealth) }}
            />
          </div>

          <p className="text-[11px] text-[#b3a8e7cc]">Opponent Health</p>
          <div className="w-full h-[7px] rounded-[4px] bg-[#ffffff14] overflow-hidden">
            <div
              className="h-full bg-[#f87171]"
              style={{ width: health(data.opponentHealth) }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};