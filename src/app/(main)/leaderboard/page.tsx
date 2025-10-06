"use client";

import appService from "@/services/app.service";
import React, { useEffect, useMemo, useState } from "react";

type LeaderRow = { userName: string; wins: number; coins: number };

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<LeaderRow[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await appService.getLeaderboard();
        const values: LeaderRow[] = res?.value?.$values ?? [];
        setRows(values);
        setError(null);
      } catch (err: any) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const sorted = useMemo(
    () => rows.slice().sort((a, b) => b.wins - a.wins || b.coins - a.coins),
    [rows]
  );

  return (
    <div className="bg-[#151022] min-h-[calc(100vh-64px)]">
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Leaderboard</h1>
            <p className="text-sm text-violet-200/70">Top battlers ranked by wins, then coins.</p>
          </div>
        </div>

        {loading && (
          <div className="text-violet-200/80">Loading...</div>
        )}
        {error && (
          <div className="text-red-300">{error}</div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-violet-200/80 text-sm">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Wins</th>
                  <th className="px-4 py-3 font-semibold">Coins</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {sorted.map((r, idx) => (
                  <tr key={`${r.userName}-${idx}`} className="text-white">
                    <td className="px-4 py-3 text-violet-200/80">{idx + 1}</td>
                    <td className="px-4 py-3 font-semibold">{r.userName}</td>
                    <td className="px-4 py-3">{r.wins}</td>
                    <td className="px-4 py-3">{r.coins}</td>
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-violet-200/80" colSpan={4}>
                      No entries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Leaderboard;