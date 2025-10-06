"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import appService from "@/services/app.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateNewHabit = () => {
  const router = useRouter();
  const [selectedHabit, setSelectedHabit] = useState<string>("");
  const [customHabit, setCustomHabit] = useState<string>("");
  const [duration, setDuration] = useState<number>(14);
  const [invite, setInvite] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const habit = customHabit.trim() || selectedHabit.trim();
    if (!habit) {
      toast("Please select or enter a habit.");
      return;
    }

    const opponentId = Number(invite);
    if (!opponentId || Number.isNaN(opponentId)) {
      toast("Please enter a valid opponent ID (number) in the Invite field.");
      return;
    }

    try {
      setLoading(true);
      const res = await appService.createBattle({ habit, duration, opponentId });
      const activ = await appService.activateBattle(res.value.id, opponentId);
    
      toast("Challenge created and activated successfully!");
      if (res?.value?.id) {
        router.push(`/battle/${res.value.id}`);
      }
    } catch (err) {
      toast("Failed to create challenge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#151022] min-h-[calc(100vh-64px)]">
      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Create Challenge ⚔️</h2>
            <p className="text-sm text-violet-200/70 mt-2">Pick a habit, choose a duration, invite an opponent.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-black/20 border border-white/10 p-8 rounded-xl space-y-6">
            <div className="space-y-4">
              <div>
                <Select onValueChange={setSelectedHabit}>
                  <SelectTrigger className="w-full h-12 rounded-lg bg-black/30 border border-white/10 text-white">
                    <SelectValue placeholder="Select a habit" className="text-white" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workout">Workout</SelectItem>
                    <SelectItem value="read-a-book">Read a book</SelectItem>
                    <SelectItem value="meditate">Meditate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-violet-200/70 text-sm">
                  OR
                </span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <div>
                <label className="sr-only" htmlFor="custom-habit">
                  Custom habit
                </label>
                <Input
                  id="custom-habit"
                  name="custom-habit"
                  type="text"
                  placeholder="Enter a custom habit"
                  value={customHabit}
                  onChange={(e) => setCustomHabit(e.target.value)}
                  className="appearance-none relative block w-full px-3 h-12 border border-white/10 bg-black/30 placeholder-violet-200/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/40 text-base"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-violet-200/80">
                Challenge Duration
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="7"
                    className="sr-only peer"
                    checked={duration === 7}
                    onChange={() => setDuration(7)}
                  />
                  <div className="text-center py-2 px-3 rounded-lg border border-white/10 text-violet-200/80 peer-checked:border-violet-500 peer-checked:ring-2 peer-checked:ring-violet-500/40 peer-checked:text-white font-medium">
                    7 Days
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="14"
                    className="sr-only peer"
                    checked={duration === 14}
                    onChange={() => setDuration(14)}
                  />
                  <div className="text-center py-2 px-3 rounded-lg border border-white/10 text-violet-200/80 peer-checked:border-violet-500 peer-checked:ring-2 peer-checked:ring-violet-500/40 peer-checked:text-white font-medium">
                    14 Days
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="30"
                    className="sr-only peer"
                    checked={duration === 30}
                    onChange={() => setDuration(30)}
                  />
                  <div className="text-center py-2 px-3 rounded-lg border border-white/10 text-violet-200/80 peer-checked:border-violet-500 peer-checked:ring-2 peer-checked:ring-violet-500/40 peer-checked:text-white font-medium">
                    30 Days
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-violet-200/80">
                Invite a Friend
              </h3>
              <div>
                <label className="sr-only" htmlFor="invite-friend">
                  Invite a Friend
                </label>
                <input
                  id="invite-friend"
                  name="invite"
                  type="text"
                  required
                  placeholder="Enter opponent ID"
                  value={invite}
                  onChange={(e) => setInvite(e.target.value)}
                  className="appearance-none relative block w-full px-3 h-12 border border-white/10 bg-black/30 placeholder-violet-200/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/40 text-base"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center h-12 px-4 text-base font-bold rounded-lg"
              >
                {loading ? "Creating..." : "Create Challenge"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateNewHabit;
