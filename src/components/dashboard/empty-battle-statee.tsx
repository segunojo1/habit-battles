import Link from "next/link";
import { Button } from "../ui/button";

export const EmptyBattleStatee = ({ small }: { small?: boolean }) => (
  <div
    className={`bg-[#0d0816]/80 border border-[#302f48]/50 rounded-[12px] p-[30px] text-center flex flex-col items-center justify-center ${
      small ? "min-h-[220px]" : "min-h-[260px]"
    }`}
  >
    <div className="max-w-[320px] mx-auto">
      <h3 className="text-[1.2rem] font-bold mb-[8px]">Start a Battle</h3>
      <p className="text-[13.5px] text-[#b3a8e7cc] mb-[18px]">
        Challenge a friend and track your habits together!
      </p>
    </div>
    <Link href="/create-new-habit">
      <Button className="rounded-[10px] h-[46px] px-[22px] bg-[#7a5af8] hover:bg-[#6a4ee3] text-white text-[14.5px] font-semibold shadow-[0_0_10px_#7a5af840] transition-transform hover:scale-[1.04]">
        <span className="mr-[6px]">⚔️</span> New Battle
      </Button>
    </Link>
  </div>
);