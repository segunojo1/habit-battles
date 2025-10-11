"use client";

import { useLeaderboard } from "@/lib/use-leaderboard";
import React from "react";

const Leaderboard = () => {
  const { sortedRows, loading, errMsg } = useLeaderboard();

  return (
    <div className="min-h-[calc(100vh-70px)] bg-[#120d1e]">
      <main className="max-w-4xl mx-auto px-5 py-10">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h1 className="text-3xl font-extrabold text-white drop-shadow-sm">
              🏆 Leaderboard
            </h1>
            <p className="text-sm text-[#c6b4ffb3] mt-1">
              Top players ranked by wins (then coins)
            </p>
          </div>
        </div>

        {loading && (
          <div className="text-[#bfaaf5] text-base animate-pulse">
            Loading the champs...
          </div>
        )}
        {errMsg && <div className="text-[#ff6f91] text-sm mt-3">{errMsg}</div>}

        {!loading && !errMsg && (
          <div className="overflow-x-auto rounded-[14px] border border-[#ffffff1a] bg-[#1a122b]/80 backdrop-blur-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#cdbfffcc] text-[0.85rem]">
                  <th className="px-5 py-3 font-semibold tracking-wide">#</th>
                  <th className="px-5 py-3 font-semibold">User</th>
                  <th className="px-5 py-3 font-semibold">Wins</th>
                  <th className="px-5 py-3 font-semibold">Coins</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ffffff14]">
                {sortedRows.map((r, i) => (
                  <tr
                    key={`${r.userName}-${i}`}
                    className="text-white hover:bg-[#27203a] transition-all"
                  >
                    <td className="px-5 py-3 text-[#b8a9f3b3]">{i + 1}</td>
                    <td className="px-5 py-3 font-semibold">{r.userName}</td>
                    <td className="px-5 py-3">{r.wins}</td>
                    <td className="px-5 py-3">{r.coins}</td>
                  </tr>
                ))}

                {sortedRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-8 text-center text-[#b8a9f3b3]"
                    >
                      Nobody’s here yet 👀
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
