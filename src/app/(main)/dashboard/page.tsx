"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import useAppStore from "@/store/app.store";
import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyBattleStatee } from "@/components/dashboard/empty-battle-statee";
import { BattleCard } from "@/components/dashboard/battle-card";
import { useRouter } from "next/navigation";

export interface ActiveBattle {
  battleId: number;
  habit: string;
  opponentName: string;
  creatorHealth: number;
  opponentHealth: number;
  status: string;
};

type Profile = {
  id: number;
  userName: string;
  email: string;
  coinBalance: number;
  activeBattles?: { $values?: ActiveBattle[] };
} | null;

const Dashboard = () => {
  const { user, isAuthenticated } = useAppStore();
  const username = user?.username || "Friend";
  const route = useRouter()

  const [profile, setProfile] = useState<Profile>(null);

  useEffect(() => {
    try {
      const cookieStuff = Cookies.get("user");
      if (cookieStuff) {
        const parsed = JSON.parse(cookieStuff);
        setProfile(parsed);
      }
    } catch {
      //  if cookie is broken, we move on
    }
  }, []);

  const coinCount = useMemo(() => profile?.coinBalance ?? 0, [profile]);
  const currentBattles = useMemo(
    () => profile?.activeBattles?.$values ?? [],
    [profile]
  );

  const logout = () => {
    useAppStore.getState().logout();
    Cookies.remove("user");
    route.push("/auth/sign-up");
  }

  return (
    <div className="nunito-sans min-h-screen bg-[#130f1d] text-white">
      <main className="flex-grow container mx-auto px-[20px] sm:px-[28px] lg:px-[36px] py-[42px]">
        <div className="max-w-[1020px] mx-auto space-y-[32px]">
          
          <header className="mb-[24px] flex justify-between items-center">
            <h1 className="text-[2.3rem] font-extrabold text-[#fffefe]">
              {isAuthenticated
                ? `Hey ${username}, welcome back 👋`
                : "Welcome to Habit Battles"}
            </h1>
            {isAuthenticated && user?.email && (
              <p className="mt-[5px] text-[#b3a8e7cc] text-[14px]">
                {user.email}
              </p>
            )}
            <Button onClick={logout} className="mt-[12px] bg-[#7a5af8] hover:bg-[#6a4ee3] text-white text-[14.5px] font-semibold shadow-[0_0_10px_#7a5af840] transition-transform hover:scale-[1.04]">
              Log out
            </Button>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] mb-[36px]">
            <StatCard
              label="Coins"
              icon="💰"
              value={coinCount.toLocaleString()}
            />
            <StatCard label="Streak" icon="🔥" value="0 Days" />
          </section>

          <section className="space-y-[16px]">
            <h2 className="text-[1.5rem] font-bold text-[#fff]">
              Active Battles
            </h2>

            {currentBattles.length === 0 ? (
              <EmptyBattleStatee />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
                {currentBattles.map((battle) => (
                  <BattleCard key={battle.battleId} data={battle} />
                ))}

                <EmptyBattleStatee small />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;