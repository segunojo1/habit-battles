import { useEffect, useMemo, useState } from "react";
import appService from "@/services/app.service";

export type LeaderRow = {
  userName: string;
  wins: number;
  coins: number;
};

export const useLeaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [rows, setRows] = useState<LeaderRow[]>([]);

  useEffect(() => {
    const grabScores = async () => {
      try {
        setLoading(true);
        const res = await appService.getLeaderboard();
        const values: LeaderRow[] = res?.value?.$values ?? [];
        setRows(values);
        setErrMsg(null);
      } catch (e) {
        console.log("leaderboard fetch busted:", e);
        setErrMsg("Couldn't load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    grabScores();
  }, []);

  const sortedRows = useMemo(
    () => rows.slice().sort((a, b) => b.wins - a.wins || b.coins - a.coins),
    [rows]
  );

  return { sortedRows, loading, errMsg };
};
