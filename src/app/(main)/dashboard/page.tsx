"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import useAppStore from "@/store/app.store";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { user, isAuthenticated } = useAppStore();
  const username = user?.username || "Friend";

  // Hydrate richer profile from cookie (set on login/signup)
  type ActiveBattle = {
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

  const [profile, setProfile] = useState<Profile>(null);

  useEffect(() => {
    try {
      const raw = Cookies.get("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        setProfile(parsed);
      }
    } catch (e) {
      // ignore cookie parse errors
    }
  }, []);

  const coinBalance = useMemo(() => profile?.coinBalance ?? 0, [profile]);
  const activeBattles = useMemo(
    () => profile?.activeBattles?.$values ?? [],
    [profile]
  );
  return (
    <div className="nunito-sans min-h-screen bg-[#151022]">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
        <div className="max-w-4xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-white">
              {isAuthenticated
                ? `Welcome back, ${username}`
                : "Welcome to Habit Battles"}
            </h1>
            {isAuthenticated && user?.email && (
              <p className="mt-2 text-violet-200/80">{user.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-base font-medium text-violet-200/80">Coins</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl">💰</span>
                <p className="text-3xl font-bold text-white">
                  {coinBalance.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-base font-medium text-violet-200/80">Streak</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🔥</span>
                <p className="text-3xl font-bold text-white">0 Days</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Active Battles</h2>

            {activeBattles.length === 0 ? (
              <div className="bg-black/20 border border-white/10 rounded-xl p-8 text-center">
                <div className="flex flex-col items-center gap-6">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-bold text-white mb-2">
                      No active battles
                    </h3>
                    <p className="text-base text-violet-200/80">
                      Start a new battle with a friend to track your habits and
                      compete!
                    </p>
                  </div>
                  <Link href="/create-new-habit">
                    <Button className="flex items-center justify-center rounded-lg h-12 px-6 bg-violet-600 hover:bg-violet-700 text-white text-base font-bold shadow-lg shadow-violet-600/30 transition-all transform hover:scale-105">
                      <span className="mr-2">⚔️</span>
                      <span>Start New Battle</span>
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {activeBattles.map((b) => (
                  <Link
                    key={b.battleId}
                    href={`/battle/${b.battleId}`}
                    className="group"
                  >
                    <div className="bg-black/20 border border-white/10 rounded-xl p-6 h-full transition-transform group-hover:scale-[1.01]">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white capitalize">
                            {b.habit}
                          </h3>
                          <p className="text-sm text-violet-200/80">
                            vs {b.opponentName}
                          </p>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-violet-700/30 border border-violet-500/40 text-violet-100">
                          {b.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-violet-200/80">
                          Creator Health
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-2 bg-green-500"
                            style={{
                              width: `${Math.max(
                                0,
                                Math.min(100, b.creatorHealth)
                              )}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-violet-200/80">
                          Opponent Health
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-2 bg-rose-500"
                            style={{
                              width: `${Math.max(
                                0,
                                Math.min(100, b.opponentHealth)
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="bg-black/20 border border-white/10 rounded-xl p-8 text-center">
                  <div className="flex flex-col items-center gap-6">
                    <div className="max-w-md mx-auto">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Create new battle
                      </h3>
                      <p className="text-base text-violet-200/80">
                        Start a new battle with a friend to track your habits
                        and compete!
                      </p>
                    </div>
                    <Link href="/create-new-habit">
                      <Button className="flex items-center justify-center rounded-lg h-12 px-6 bg-violet-600 hover:bg-violet-700 text-white text-base font-bold shadow-lg shadow-violet-600/30 transition-all transform hover:scale-105">
                        <span className="mr-2">⚔️</span>
                        <span>Start New Battle</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
