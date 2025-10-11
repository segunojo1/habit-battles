'use client';

import appService from '@/services/app.service';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Cookies from "js-cookie";
import Header from '@/components/battles/header';
import MonsterBanner from '@/components/battles/monster-banner';
import PlayersHealth from '@/components/battles/player-healths';
import Players from '@/components/battles/players';

type Player = { userId: number; username: string; streak: number; coins: number };
export interface BattleValue {
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
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [battle, setBattle] = useState<BattleValue | null>(null);
  const [strikeLoading, setStrikeLoading] = useState(false);

  const fetchBattleStatus = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await appService.getBattleStatus(id);
      setBattle(response?.value);
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

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const user = Cookies.get("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setProfile(parsedUser);
      }
    } catch (e) {
    }
  }, []);


  return (
    <div className="bg-[#151022] min-h-[calc(100vh-64px)]">
      <main className="max-w-3xl mx-auto px-5 py-[38px] text-center">
        {loading && (
          <div className=" text-[#e5e7eb]">Loading battle...</div>
        )}
        {error && (
          <div className=" text-[#be7676]">{error}</div>
        )}

        {battle && (
          <div className="space-y-8">
            <Header battle={battle} profile={profile} />

            <MonsterBanner battle={battle} />

            <PlayersHealth {...battle} />

            <Players {...battle} />
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStrike}
                disabled={strikeLoading}
                className="w-full bg-[#7f22fe] hover:bg-[#7f22fe] disabled:opacity-60 text-white font-bold py-2 px-5 rounded-md tracking-wide"
              >
                {strikeLoading ? 'Logging...' : 'Strike'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Battle;