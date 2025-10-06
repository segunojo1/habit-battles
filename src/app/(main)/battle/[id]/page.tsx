'use client';

import appService from '@/services/app.service';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Cookies from "js-cookie";
import { useMemo} from 'react';

type Player = { userId: number; username: string; streak: number; coins: number };
type BattleValue = {
  id: number;
  habit: string;
  startDate: string;
  endDate: string;
  monsterType: string;
  durationDays: number;
  creatorHealth: number;
  opponentHealth: number;
  status: string;
  players: { $values: Player[] };
};

const Battle = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [battle, setBattle] = useState<BattleValue | null>(null);
  const [strikeLoading, setStrikeLoading] = useState(false);

  const fetchBattleStatus = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await appService.getBattleStatus(id);
      setBattle(response?.value ?? null);
      setError(null);
    } catch (err: any) {
      setError('Failed to fetch battle status');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBattleStatus();
  }, [fetchBattleStatus]);

  const handleStrike = async () => {
    if (!id) return;
    try {
      setStrikeLoading(true);
      await appService.habitStrike(id);
      toast.success('Strike logged!');
      

      await fetchBattleStatus();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setStrikeLoading(false);
    }
  };


  const formatDate = (iso?: string) => {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const raw = Cookies.get("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        setProfile(parsed);
      }
    } catch (e) {
    }
  }, []);

  const coinBalance = useMemo(() => profile?.coinBalance ?? 0, [profile]);

  return (
    <div className="bg-[#151022] min-h-[calc(100vh-64px)]">
      <main className="max-w-4xl mx-auto px-6 py-10">
        {loading && (
          <div className="text-center text-violet-200/80">Loading battle...</div>
        )}
        {error && (
          <div className="text-center text-red-300">{error}</div>
        )}

        {battle && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h1 className="text-3xl font-extrabold text-white capitalize">
                  {battle.habit} Battle
                </h1>
                <p className="text-sm text-violet-200/70">
                  {formatDate(battle.startDate)} – {formatDate(battle.endDate)} · {battle.durationDays} days
                </p>
              </div>
              <div className="self-start sm:self-auto flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-700/30 border border-violet-500/40 text-violet-100">
                  {battle.status}
                </span>
                <p className="text-sm text-violet-200/70">💸 {coinBalance} Coins</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-black/20 border border-white/10">
              <div className="aspect-[4/2] bg-gradient-to-br from-violet-700/40 via-fuchsia-600/30 to-indigo-700/30" />
              <div className="p-4 flex items-center justify-between">
                <div className="text-white">
                  <div className="text-sm opacity-80">Monster</div>
                  <div className="font-semibold capitalize">{battle.monsterType.replaceAll('_', ' ')}</div>
                </div>
                <div className="text-right text-white">
                  <div className="text-sm opacity-80">Battle ID</div>
                  <div className="font-semibold">#{battle.id}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/20 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Creator</span>
                  <span className="text-violet-200/80 text-sm">{battle.creatorHealth}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-green-500 to-emerald-400"
                    style={{ width: `${Math.max(0, Math.min(100, battle.creatorHealth))}%` }}
                  />
                </div>
              </div>

              <div className="bg-black/20 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Opponent</span>
                  <span className="text-violet-200/80 text-sm">{battle.opponentHealth}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-red-500 to-rose-400"
                    style={{ width: `${Math.max(0, Math.min(100, battle.opponentHealth))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Players */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">Players</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(battle.players?.$values ?? []).map((p) => (
                  <div key={`${p.userId}-${p.username}`} className="bg-black/20 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold">{p.username}</div>
                      <div className="text-violet-200/70 text-sm">Streak: {p.streak} days</div>
                      <div className="text-violet-200/70 text-sm">Coins: {p.coins.toLocaleString?.() ?? p.coins}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
            </section>

            {/* Strike Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStrike}
                disabled={strikeLoading}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg tracking-wide transition-colors"
              >
                {strikeLoading ? 'Logging...' : 'Strike!'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Battle;